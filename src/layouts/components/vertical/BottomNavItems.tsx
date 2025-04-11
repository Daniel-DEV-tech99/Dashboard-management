// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Type Import
import { NavLink } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Custom Components Import
import VerticalNavLink from 'src/@core/layouts/components/vertical/navigation/VerticalNavLink'
import ChevronIcon from 'src/iconify-bundle/svg/figma/chevron'

interface Props {
  navHover: boolean
  settings: Settings
  navVisible?: boolean
  collapsedNavWidth: number
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  bottomNavItems: NavLink[]
}

const BottomNavWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  zIndex: 10,
}))

const BottomNavItems = (props: Props) => {
  // ** Props
  const {
    settings,
    navHover,
    navVisible,
    bottomNavItems,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth
  } = props

  // ** Hooks
  const auth = useAuth()

  return (
    <BottomNavWrapper>
      <List className='nav-items' sx={{ py: 1, mb: 0 }}>
        {bottomNavItems.map((item: NavLink, index: number) => (
          <VerticalNavLink
            key={index}
            item={item}
            navHover={navHover}
            settings={settings}
            navVisible={navVisible}
            collapsedNavWidth={collapsedNavWidth}
            toggleNavVisibility={toggleNavVisibility}
            navigationBorderWidth={navigationBorderWidth}
          />
        ))}
        <Box sx={{ p:'18px 16px' ,m:'24px 16px', border:'1px solid #E6E6E6', mt:2, borderRadius:'12px', display:'flex', alignItems:'center' }} >

          <Avatar
            src={auth.user?.avatar || '/images/avatars/1.png'}
            alt={auth.user?.fullName || 'User Avatar'}
            sx={{ width: 37, height: 37, mr: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Typography variant='body2' sx={{ fontWeight: 500,fontSize:'14px',color:'#1A1A1A', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {auth.user?.fullName || 'User'}
            </Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {auth.user?.email || 'user@example.com'}
            </Typography>

          </Box>
         <Box sx={{marginLeft:'16px'}}>
<ChevronIcon/>
          </Box>
        </Box>



      </List>
    </BottomNavWrapper>
  )
}

export default BottomNavItems
