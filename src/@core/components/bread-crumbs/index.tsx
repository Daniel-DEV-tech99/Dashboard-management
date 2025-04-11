import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { styled } from '@mui/material/styles'

// Custom hooks
import useNavigation, { buildBreadcrumbPath } from 'src/@core/hooks/useNavigation'
import HomeIcon from 'src/iconify-bundle/svg/figma/home'

// Types
interface BreadcrumbItem {
  href: string
  label: string
  icon: React.ReactNode | null
}

// Styled components
const BreadcrumbLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#BFBFBF !important',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.main
  }
}))

const BreadcrumbText = styled(Typography)(({  }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#1A1A1A !important'
}))

const BreadcrumbContainer = styled(Box)(({ }) => ({
 padding: '16px 32px 16px 0px',
  display: 'flex',
  alignItems: 'center',
marginBottom:'16px'

}))

// Helper function to convert path segments to readable titles
const getReadableTitle = (segment: string): string => {
  // Handle special cases
  if (segment === '') return 'Home'

  // Remove hyphens and convert to title case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const DynamicBreadcrumbs = () => {
  const router = useRouter()
  const { navigationItems, isLoading } = useNavigation('vertical')

  // Generate breadcrumb items based on current path and navigation data
  const breadcrumbs = useMemo(() => {
    // Default home item
    const items: BreadcrumbItem[] = [
      {
        href: '/',
        label: 'Dashboard',
        icon: <HomeIcon  />
      }
    ]

    // Get path segments and filter out empty strings
    const pathSegments = router.asPath.split('/').filter(segment => segment !== '')

    // If we have navigation data and it's loaded, try to use it for more accurate breadcrumbs
    if (!isLoading && navigationItems.length > 0) {
      const currentPath = router.asPath.split('?')[0] // Remove query params
      const breadcrumbPath = buildBreadcrumbPath(navigationItems, currentPath)

      if (breadcrumbPath) {
        // Add each item from the breadcrumb path
        breadcrumbPath.forEach(item => {
          items.push({
            href: item.path,
            label: item.title,
            icon: null
          })
        })

        return items
      }
    }

    // Fallback to path-based breadcrumbs if navigation data doesn't match or is loading
    let currentPath = ''

    pathSegments.forEach(segment => {
      // Skip query parameters
      if (segment.includes('?')) {
        segment = segment.split('?')[0]
      }

      currentPath += `/${segment}`

      items.push({
        href: currentPath,
        label: getReadableTitle(segment),
        icon: null
      })
    })

    return items
  }, [router.asPath, navigationItems, isLoading])

  // Don't show breadcrumbs on the home page
  if (router.pathname === '/') {
    return null
  }

  return (
    <BreadcrumbContainer>
      <Breadcrumbs separator={'/'} aria-label="breadcrumb">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return isLast ? (
            <BreadcrumbText key={crumb.href} sx={{fontSizee:'16px',fontWeight:500,color:'#1A1A1A'}}>
              {crumb.icon}
              {crumb.label}
            </BreadcrumbText>
          ) : (
            <BreadcrumbLink key={crumb.href} href={crumb.href}>
              {crumb.icon}
              <Typography sx={{fontSize:'14px',fontWeight:400,ml: crumb.icon ? 2 : 0}}>{crumb.label}</Typography>
            </BreadcrumbLink>
          )
        })}
      </Breadcrumbs>
    </BreadcrumbContainer>
  )
}

export default DynamicBreadcrumbs
