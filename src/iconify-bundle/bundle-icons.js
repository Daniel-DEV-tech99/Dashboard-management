/**
 * This is a JavaScript version of the icon bundling script to avoid TypeScript errors.
 * It creates a bundle from:
 * - All SVG files in a directory.
 * - Custom JSON files.
 * - Iconify icon sets.
 */
const fs = require('fs').promises;
const path = require('path');

// Iconify tools
const { importDirectory, cleanupSVG, parseColors, isEmptyColor, runSVGO } = require('@iconify/tools');
const { getIcons, stringToIcon, minifyIconSet } = require('@iconify/utils');

// Configuration
const sources = {
  json: [
    // Iconify JSON file
    require.resolve('@iconify/json/json/tabler.json'),

    // Custom file with only few icons
    {
      filename: require.resolve('@iconify/json/json/mdi.json'),
      icons: ['star', 'heart', 'circle', 'github', 'google', 'twitter', 'facebook', 'star-outline', 'heart-outline']
    }
  ],
  svg: [
    {
      dir: 'src/iconify-bundle/svg',
      monotone: false,
      prefix: 'custom'
    }
  ]
};

// Iconify component
const component = '@iconify/react';

// Set to true to use require() instead of import
const commonJS = false;

// File to save bundle to
const target = 'src/iconify-bundle/icons-bundle-react.js';

/**
 * Main function
 */
(async function () {
  let bundle = commonJS
    ? "const { addCollection } = require('" + component + "');\n\n"
    : "import { addCollection } from '" + component + "';\n\n";

  // Create directory for output if missing
  const dir = path.dirname(target);
  try {
    await fs.mkdir(dir, {
      recursive: true
    });
  } catch (err) {
    // Directory already exists
  }

  /**
   * Convert sources.icons to sources.json
   */
  if (sources.icons) {
    const sourcesJSON = sources.json ? sources.json : (sources.json = []);

    // Sort icons by prefix
    const organizedList = organizeIconsList(sources.icons);
    for (const prefix in organizedList) {
      const filename = require.resolve(`@iconify/json/json/${prefix}.json`);
      sourcesJSON.push({
        filename,
        icons: organizedList[prefix]
      });
    }
  }

  /**
   * Bundle JSON files
   */
  if (sources.json) {
    for (let i = 0; i < sources.json.length; i++) {
      const item = sources.json[i];

      // Load icon set
      const filename = typeof item === 'string' ? item : item.filename;
      let content = JSON.parse(await fs.readFile(filename, 'utf8'));

      // Filter icons
      if (typeof item !== 'string' && item.icons?.length) {
        const filteredContent = getIcons(content, item.icons);
        if (!filteredContent) {
          throw new Error(`Cannot find required icons in ${filename}`);
        }
        content = filteredContent;
      }

      // Remove metadata
      removeMetaData(content);

      // Change Tabler icons' stroke-width to 1.5px
      for (const key in content) {
        if (key === 'prefix' && content.prefix === 'tabler') {
          for (const key in content.icons) {
            content.icons[key].body = content.icons[key].body.replace(/stroke-width="2"/g, 'stroke-width="1.5"');
          }
        }
      }

      // Minify data and add to bundle
      minifyIconSet(content);
      bundle += 'addCollection(' + JSON.stringify(content) + ');\n';
      console.log(`Bundled icons from ${filename}`);
    }
  }

  /**
   * Custom SVG
   */
  if (sources.svg) {
    for (let i = 0; i < sources.svg.length; i++) {
      const source = sources.svg[i];

      // Import icons
      const iconSet = await importDirectory(source.dir, {
        prefix: source.prefix
      });

      // Validate, clean up, fix palette and optimise
      await iconSet.forEach(async (name, type) => {
        if (type !== 'icon') {
          return;
        }

        // Get SVG instance for parsing
        const svg = iconSet.toSVG(name);
        if (!svg) {
          // Invalid icon
          iconSet.remove(name);

return;
        }

        // Clean up and optimise icons
        try {
          // Clean up icon code
          await cleanupSVG(svg);

          if (source.monotone) {
            // Replace color with currentColor, add if missing
            await parseColors(svg, {
              defaultColor: 'currentColor',
              callback: (attr, colorStr, color) => {
                return !color || isEmptyColor(color) ? colorStr : 'currentColor';
              }
            });
          }

          // Optimise
          await runSVGO(svg);
        } catch (err) {
          // Invalid icon
          console.error(`Error parsing ${name} from ${source.dir}:`, err);
          iconSet.remove(name);

return;
        }

        // Update icon from SVG instance
        iconSet.fromSVG(name, svg);
      });

      console.log(`Bundled ${iconSet.count()} icons from ${source.dir}`);

      // Export to JSON
      const content = iconSet.export();
      bundle += 'addCollection(' + JSON.stringify(content) + ');\n';
    }
  }

  // Save to file
  await fs.writeFile(target, bundle, 'utf8');
  console.log(`Saved ${target} (${bundle.length} bytes)`);
})().catch(err => {
  console.error(err);
});

/**
 * Remove metadata from icon set
 */
function removeMetaData(iconSet) {
  const props = ['info', 'chars', 'categories', 'themes', 'prefixes', 'suffixes'];
  props.forEach(prop => {
    delete iconSet[prop];
  });
}

/**
 * Sort icon names by prefix
 */
function organizeIconsList(icons) {
  const sorted = Object.create(null);
  icons.forEach(icon => {
    const item = stringToIcon(icon);
    if (!item) {
      return;
    }

    const prefix = item.prefix;
    const prefixList = sorted[prefix] ? sorted[prefix] : (sorted[prefix] = []);

    const name = item.name;
    if (prefixList.indexOf(name) === -1) {
      prefixList.push(name);
    }
  });

  return sorted;
}
