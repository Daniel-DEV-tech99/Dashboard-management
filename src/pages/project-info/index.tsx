// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import CodeIcon from '@mui/icons-material/Code'
import DescriptionIcon from '@mui/icons-material/Description'
import BuildIcon from '@mui/icons-material/Build'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import SettingsIcon from '@mui/icons-material/Settings'
import PaletteIcon from '@mui/icons-material/Palette'
import LanguageIcon from '@mui/icons-material/Language'
import SecurityIcon from '@mui/icons-material/Security'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ViewModuleIcon from '@mui/icons-material/ViewModule'

// ** Layout Import

// Styled component for the project info page
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2]
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontWeight: 500
}))

const ProjectInfo = () => {
  // State for tab management
  const [value, setValue] = useState('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // Main packages used in the project
  const mainPackages = [
    { name: 'Next.js', version: '13.3.2', description: 'React framework for production' },
    { name: 'React', version: '18.2.0', description: 'JavaScript library for building user interfaces' },
    { name: 'Material UI', version: '5.12.2', description: 'React UI framework with Material Design' },
    { name: 'Redux Toolkit', version: '1.9.5', description: 'State management library' },
    { name: 'Emotion', version: '11.10.8', description: 'CSS-in-JS library' },
    { name: 'React Hook Form', version: '7.43.9', description: 'Form validation library' },
    { name: 'Yup', version: '1.1.1', description: 'Schema validation library' },
    { name: 'i18next', version: '22.4.15', description: 'Internationalization framework' },
    { name: 'Axios', version: '1.4.0', description: 'Promise based HTTP client' },
    { name: 'CASL', version: '6.5.0', description: 'Isomorphic authorization library' }
  ]

  // Visualization packages
  const visualizationPackages = [
    { name: 'ApexCharts', version: '3.28.5', description: 'Modern charting library' },
    { name: 'Chart.js', version: '4.3.0', description: 'Simple yet flexible JavaScript charting' },
    { name: 'Recharts', version: '2.5.0', description: 'Redefined chart library built with React and D3' },
    { name: 'FullCalendar', version: '6.1.6', description: 'Full-sized drag & drop event calendar' }
  ]

  // UI enhancement packages
  const uiPackages = [
    { name: 'React Dropzone', version: '14.2.3', description: 'File upload component' },
    { name: 'React Datepicker', version: '4.11.0', description: 'Datepicker component' },
    { name: 'React Hot Toast', version: '2.4.1', description: 'Notification library' },
    { name: 'React Draft Wysiwyg', version: '1.15.0', description: 'Rich text editor' },
    { name: 'Keen Slider', version: '6.8.5', description: 'Touch slider component' }
  ]

  // Project structure sections
  const projectStructure = [
    {
      name: 'src/@core',
      icon: <ArchitectureIcon />,
      description: 'Core components, hooks, layouts, and utilities that form the foundation of the application'
    },
    {
      name: 'src/@fake-db',
      icon: <BuildIcon />,
      description: 'Mock data and API endpoints for development and testing purposes'
    },
    {
      name: 'src/configs',
      icon: <SettingsIcon />,
      description: 'Configuration files for authentication, themes, i18n, and access control'
    },
    {
      name: 'src/context',
      icon: <CodeIcon />,
      description: 'React context providers for state management across components'
    },
    {
      name: 'src/hooks',
      icon: <CodeIcon />,
      description: 'Custom React hooks for reusable logic'
    },
    {
      name: 'src/iconify-bundle',
      icon: <PaletteIcon />,
      description: 'Icon bundling and management system'
    },
    {
      name: 'src/layouts',
      icon: <ViewModuleIcon />,
      description: 'Layout components that structure the application pages'
    },
    {
      name: 'src/navigation',
      icon: <LanguageIcon />,
      description: 'Navigation configuration for horizontal and vertical menus'
    },
    {
      name: 'src/pages',
      icon: <DescriptionIcon />,
      description: 'Next.js pages that define routes and views'
    },
    {
      name: 'src/store',
      icon: <SecurityIcon />,
      description: 'Redux store configuration and slices'
    },
    {
      name: 'src/types',
      icon: <CodeIcon />,
      description: 'TypeScript type definitions'
    },
    {
      name: 'src/views',
      icon: <DashboardIcon />,
      description: 'Reusable view components organized by feature'
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StyledPaper elevation={3}>
          <Typography variant='h4' gutterBottom>
             Next.js Admin Dashboard
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' paragraph>
            Version 1.2.0
          </Typography>
          <Typography variant='body1' paragraph>
            A comprehensive admin dashboard template built with Next.js, Material UI, and Redux Toolkit. This project provides a solid foundation for building modern, responsive web applications with advanced features like authentication, internationalization, and access control.
          </Typography>
        </StyledPaper>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Project Structure & Packages' />
          <CardContent>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label='project information tabs'>
                  <Tab label='Project Structure' value='1' />
                  <Tab label='Main Packages' value='2' />
                  <Tab label='Visualization' value='3' />
                  <Tab label='UI Components' value='4' />
                </Tabs>
              </Box>

              <TabPanel value='1'>
                <Typography variant='body1' paragraph>
                  The project follows a modular architecture with clear separation of concerns. Here's a breakdown of the main directories:
                </Typography>
                <List>
                  {projectStructure.map((item, index) => (
                    <ListItem key={index} divider={index !== projectStructure.length - 1}>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        secondary={item.description}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              <TabPanel value='2'>
                <Typography variant='body1' paragraph>
                  The project uses the following core packages:
                </Typography>
                <Grid container spacing={3}>
                  {mainPackages.map((pkg, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, height: '100%' }}>
                        <Typography variant='h6' gutterBottom>
                          {pkg.name}
                          <StyledChip label={`v${pkg.version}`} size='small' color='primary' />
                        </Typography>
                        <Typography variant='body2'>{pkg.description}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value='3'>
                <Typography variant='body1' paragraph>
                  Data visualization packages used in the project:
                </Typography>
                <Grid container spacing={3}>
                  {visualizationPackages.map((pkg, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, height: '100%' }}>
                        <Typography variant='h6' gutterBottom>
                          {pkg.name}
                          <StyledChip label={`v${pkg.version}`} size='small' color='secondary' />
                        </Typography>
                        <Typography variant='body2'>{pkg.description}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              <TabPanel value='4'>
                <Typography variant='body1' paragraph>
                  UI enhancement packages used in the project:
                </Typography>
                <Grid container spacing={3}>
                  {uiPackages.map((pkg, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, height: '100%' }}>
                        <Typography variant='h6' gutterBottom>
                          {pkg.name}
                          <StyledChip label={`v${pkg.version}`} size='small' color='info' />
                        </Typography>
                        <Typography variant='body2'>{pkg.description}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Getting Started' />
          <CardContent>
            <Typography variant='body1' paragraph>
              This project is built with Next.js and uses a modular architecture to organize code. Here are some key points to understand:
            </Typography>

            <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              1. Page Structure
            </Typography>
            <Typography variant='body2' paragraph>
              Pages are defined in the <code>src/pages</code> directory following Next.js conventions. Each page typically imports components from the <code>src/views</code> directory.
            </Typography>

            <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              2. Layout System
            </Typography>
            <Typography variant='body2' paragraph>
              The application uses a layout system defined in <code>src/layouts</code>. The <code>UserLayout</code> component wraps most pages and provides consistent navigation, headers, and footers.
            </Typography>

            <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              3. State Management
            </Typography>
            <Typography variant='body2' paragraph>
              Redux Toolkit is used for global state management. Store configuration and slices are in the <code>src/store</code> directory.
            </Typography>

            <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              4. Theming
            </Typography>
            <Typography variant='body2' paragraph>
              Material UI theming is configured in <code>src/@core/theme</code>. The application supports light and dark modes, as well as custom color schemes.
            </Typography>

            <Typography variant='subtitle1' gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              5. Authentication
            </Typography>
            <Typography variant='body2' paragraph>
              Authentication is handled through the AuthContext in <code>src/context/AuthContext.tsx</code> and the useAuth hook in <code>src/hooks/useAuth.tsx</code>.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}


export default ProjectInfo
