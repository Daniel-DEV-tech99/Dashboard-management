// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import FullScreenIcon from 'src/iconify-bundle/svg/fullScreen'

// Styled component for the IconButton
const FullScreenBtn = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(4),
  padding: '12px 12.123px 11.997px 12.125px',
  borderRadius: '8px',
}))

const FullScreenToggler = () => {
  // ** State
  const [isFullScreen, setIsFullScreen] = useState<boolean>(!!document.fullscreenElement)

  // Function to toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // If not in fullscreen mode, request it
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      // If already in fullscreen mode, exit it
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Update state based on fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    // Add event listeners for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullScreenChange)

    // Initialize state on mount
    handleFullScreenChange()

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [])

  return (
    <FullScreenBtn onClick={toggleFullScreen}>
      {isFullScreen ? <FullScreenIcon /> : <FullScreenIcon />}
    </FullScreenBtn>
  )
}

export default FullScreenToggler
