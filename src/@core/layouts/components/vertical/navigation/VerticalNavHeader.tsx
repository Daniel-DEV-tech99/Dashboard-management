// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { styled} from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Custom Icon Import


// ** Configs
import themeConfig from 'src/configs/themeConfig'

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding:'32px' ,
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)<TypographyProps>({
  fontWeight: 600,
  lineHeight: '24px',
  color: '#2A2A2A',
  fontSize: '18px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    navHover,
    settings,
    collapsedNavWidth,

    navigationBorderWidth,

    navMenuBranding: userNavMenuBranding,

  } = props

  // ** Hooks & Vars

  const { navCollapsed } = settings

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8
      }
    } else {
      return 6
    }
  }


  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href='/'>
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5233 0.987686C15.179 0.916865 14.8238 0.916865 14.4795 0.987686C14.0815 1.06955 13.7257 1.26882 13.4428 1.42724L13.3657 1.47031L3.77974 6.79587C3.75323 6.81059 3.72593 6.82564 3.69794 6.84105C3.39853 7.00596 3.02207 7.21332 2.73297 7.52704C2.48302 7.79827 2.29386 8.11974 2.17815 8.46996C2.04431 8.87503 2.04588 9.30482 2.04712 9.64664C2.04724 9.67859 2.04735 9.70976 2.04735 9.74008V20.255C2.04735 20.2854 2.04724 20.3165 2.04712 20.3485C2.04588 20.6903 2.04431 21.1201 2.17815 21.5252C2.29386 21.8754 2.48302 22.1969 2.73297 22.4681C3.02207 22.7818 3.39854 22.9892 3.69794 23.1541C3.72593 23.1695 3.75324 23.1845 3.77974 23.1992L13.3657 28.5248L13.4429 28.5679C13.7257 28.7263 14.0815 28.9256 14.4795 29.0074C14.8238 29.0782 15.179 29.0782 15.5233 29.0074C15.9214 28.9256 16.2772 28.7263 16.56 28.5679L16.6371 28.5248L26.2231 23.1992C26.2348 23.1927 26.2467 23.1862 26.2587 23.1795C26.2739 23.1712 26.2893 23.1627 26.3049 23.1541C26.6043 22.9892 26.9808 22.7818 27.2699 22.4681C27.5198 22.1969 27.709 21.8754 27.8247 21.5252C27.9585 21.1201 27.957 20.6903 27.9557 20.3485C27.9556 20.3165 27.9555 20.2854 27.9555 20.255V9.74008C27.9555 9.70977 27.9556 9.67859 27.9557 9.64665C27.957 9.30482 27.9585 8.87503 27.8247 8.46995C27.709 8.11974 27.5198 7.79827 27.2699 7.52703C26.9808 7.21331 26.6043 7.00595 26.3049 6.84104L26.3038 6.84046C26.2762 6.82525 26.2493 6.8104 26.2231 6.79587L16.6371 1.47031L16.56 1.42724C16.2772 1.26882 15.9214 1.06955 15.5233 0.987686ZM14.624 3.73509C14.8203 3.62603 14.9205 3.57092 14.9952 3.53487L15.0014 3.5319L15.0076 3.53486C15.0824 3.57092 15.1826 3.62602 15.3789 3.73509L23.9926 8.52049L15.0014 13.5156L6.01018 8.52052L14.624 3.73509ZM4.63817 10.7221L13.706 15.7597L13.706 25.7501L5.03795 20.9345C4.83074 20.8194 4.72495 20.76 4.65073 20.7127L4.64447 20.7087L4.644 20.7012C4.63871 20.6134 4.63817 20.4921 4.63817 20.255V10.7221Z" fill="#2A2A2A"/>
</svg>
          <HeaderTitle variant='h4' sx={{ ...menuCollapsedStyles, ...(navCollapsed && !navHover ? {} : { ml: 2.5 }) }}>
            {themeConfig.templateName}
          </HeaderTitle>
        </LinkStyled>
      )}

      {/* {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, color: 'text.secondary', backgroundColor: 'transparent !important' }}
        >
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{
            p: 0,
            color: 'text.primary',
            backgroundColor: 'transparent !important',
            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )} */}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
