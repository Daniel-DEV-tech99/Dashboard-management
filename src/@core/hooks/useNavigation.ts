import { useState, useEffect } from 'react'

// Types
export interface NavItem {
  title: string
  path?: string
  children?: NavItem[]
  icon?: string
  [key: string]: any
}

/**
 * Custom hook to fetch and provide navigation data
 * @param type - The type of navigation to fetch ('vertical' or 'horizontal')
 * @returns Navigation items and loading state
 */
export const useNavigation = (type: 'vertical' | 'horizontal' = 'vertical') => {
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchNavigation = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const endpoint = type === 'vertical' ? '/api/vertical-nav/data' : '/api/horizontal-nav/data'
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Failed to fetch navigation data: ${response.status}`)
        }

        const data = await response.json()
        setNavigationItems(data)
      } catch (err) {
        console.error('Error fetching navigation data:', err)
        setError(err instanceof Error ? err : new Error('Unknown error occurred'))

        // Fallback to empty array if fetch fails
        setNavigationItems([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchNavigation()
  }, [type])

  return { navigationItems, isLoading, error }
}

/**
 * Find a navigation item by its path
 * @param items - Navigation items to search through
 * @param path - Path to find
 * @returns The found navigation item or null
 */
export const findNavItemByPath = (items: NavItem[], path: string): NavItem | null => {
  for (const item of items) {
    if (item.path === path) {
      return item
    }

    if (item.children) {
      const found = findNavItemByPath(item.children, path)
      if (found) return found
    }
  }

  return null
}

/**
 * Build a breadcrumb path from navigation items
 * @param items - Navigation items to search through
 * @param targetPath - Target path to build breadcrumbs for
 * @param currentPath - Current path (used for recursion)
 * @param result - Current result (used for recursion)
 * @returns Array of breadcrumb items or null if path not found
 */
export const buildBreadcrumbPath = (
  items: NavItem[],
  targetPath: string,
  currentPath?: string,
  result: { path: string; title: string }[] = []
): { path: string; title: string }[] | null => {
  for (const item of items) {
    const itemPath = item.path ? item.path : null

    if (itemPath === targetPath) {
      return [...result, { path: itemPath, title: item.title }]
    }

    if (item.children && itemPath && targetPath.startsWith(itemPath)) {
      const newResult = [...result]
      if (itemPath) {
        newResult.push({ path: itemPath, title: item.title })
      }

      const found = buildBreadcrumbPath(item.children, targetPath, itemPath, newResult)
      if (found) return found
    }
  }

  return null
}

export default useNavigation
