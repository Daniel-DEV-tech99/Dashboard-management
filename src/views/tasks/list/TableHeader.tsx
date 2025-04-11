// ** MUI Imports
import { CardContent, Divider, MenuItem, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface TableHeaderProps {
  value: string
  status: string
  toggle: () => void
  handleFilter: (val: string) => void
  handleStatusChange: (e: SelectChangeEvent<unknown>) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, status, toggle, handleFilter, handleStatusChange } = props

  return (
    <>
    <Box
      sx={{
        p: '16px',
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography sx={{ fontWeight: 900, color:'#1A1A1A', fontSize: '28px !important' }} >
        Tasks
     </Typography>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Add New Task
        </Button>
      </Box>
    </Box>
    <Divider sx={{ m: '0 !important' }} />

    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: '1 1 300px', maxWidth: '390px' }}>
          <CustomTextField
            fullWidth
            value={value}
            placeholder='Search Task'
            onChange={e => handleFilter(e.target.value)}
            InputProps={{
              endAdornment: (
                <Box sx={{ mr: 2, display: 'flex', color: 'text.secondary' }}>
                  <Icon icon='tabler:search' fontSize={20} />
                </Box>
              )
            }}
          />
        </Box>
        <Box sx={{ flex: '0 1 160px' }}>
          <CustomTextField
            select
            fullWidth
            label='Status'
            SelectProps={{
              value: status,
              displayEmpty: true,
              onChange: e => handleStatusChange(e)
            }}
          >
            <MenuItem value=''>All Tasks</MenuItem>
            <MenuItem value='to-do'>To Do</MenuItem>
            <MenuItem value='in-progress'>In Progress</MenuItem>
            <MenuItem value='completed'>Completed</MenuItem>
          </CustomTextField>
          </Box>

      </Box>
    </CardContent>
    </>
  )
}

export default TableHeader
