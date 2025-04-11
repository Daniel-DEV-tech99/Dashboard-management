import { useState, useEffect, Fragment } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import {  EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addTask } from 'src/store/apps/tasks'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'
import toast from 'react-hot-toast'

// ** Schema Import
import { TaskSchema as schema } from './validation'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface TaskData {
  title: string
  description: string
  status: string
  assignee: string
  dueDate?: string
  priority?: string
}

interface FormData extends Omit<TaskData, 'description'> {
  description: EditorState
}

// Export the showErrors function so it can be used in validation
export const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))



const defaultValues = {
  title: '',
  description: EditorState.createEmpty(),
  status: 'to-do',
  assignee: '',
  dueDate: '',
  priority: 'medium'
}

const statusOptions = [
  { value: 'to-do', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
]

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' }
]

const AddTaskDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [users, setUsers] = useState<UsersType[]>([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const userStore = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (userStore.allData && userStore.allData.length > 0) {
      setUsers(userStore.allData)
    }
  }, [userStore.allData])

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    // Convert EditorState to HTML string
    const descriptionHtml = draftToHtml(convertToRaw(data.description.getCurrentContent()))

    // Create task data with HTML description
    const taskData: TaskData = {
      ...data,
      description: descriptionHtml
    }

    try {
 dispatch(addTask(taskData as any))
    toggle()
    reset()
    }
    catch (error) {
      toast(error as string)
    }

  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <Header>
        <Typography variant='h5'>Add Task</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='title'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Title'
                onChange={onChange}
                placeholder='Task title'
                error={Boolean(errors.title)}
                {...(errors.title && { helperText: errors.title.message })}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (

              <Box sx={{ mb: 4 }}>
                <Typography variant='body2' sx={{ mb: 2, fontWeight: 500, color: 'text.primary' }}>
                  Description
                </Typography>
                <EditorWrapper
                  sx={{
                    border: theme => `1px solid ${errors.description ? theme.palette.error.main : theme.palette.divider}`,
                    borderRadius: 1,
                    m: 0,
                    '& .rdw-editor-wrapper': {
                      px: 4,
                      py: 2,
                      border: 'none'
                    },

                    '& .rdw-option-wrapper': {
                      border: 'none !important',
                      boxShadow: 'none !important'
                    }
                  }}
                >
                  <ReactDraftWysiwyg
                    editorState={value}
                    onEditorStateChange={data => onChange(data)}
                    toolbar={{
                      options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                      inline: { inDropdown: false, options: ['bold', 'italic', 'underline'] },
                      blockType: { inDropdown: true },
                      fontSize: { inDropdown: true },
                      list: { inDropdown: false, options: ['unordered', 'ordered'] },
                      textAlign: { inDropdown: false },
                      history: { inDropdown: false }
                    }}
                    placeholder='Task description'
                    editorStyle={{
                      lineHeight: 1.6
                    }}
                  />
                </EditorWrapper>
                {errors.description && (
                  <Typography variant='caption' color='error' sx={{ display: 'block', mt: 1 }}>
                    {errors.description.message}
                  </Typography>
                )}
              </Box>
            )}
          />
          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label='Status'
                id='validation-status-select'
                error={Boolean(errors.status)}
                aria-describedby='validation-status-select'
                {...(errors.status && { helperText: errors.status.message })}
                SelectProps={{ value: value, onChange: e => onChange(e) }}
              >
                {statusOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <Controller
            name='assignee'
            control={control}
            rules={{ required: true }}
            render={({ field: {  onChange } }) => (
              <CustomAutocomplete
                fullWidth
                sx={{ mb: 4 }}
                options={users}
                id='autocomplete-user-select'
                getOptionLabel={(option: UsersType | string) => {
                  if (typeof option === 'string') {
                    return option
                  }

return option.fullName || ''
                }}
                renderOption={(props, option: UsersType) => (
                  <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Avatar
                      src={option.avatar}
                      alt={option.fullName}
                      sx={{ width: 30, height: 30, mr: 2 }}
                    />
                    {option.fullName}
                  </Box>
                )}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label='Assignee'
                    error={Boolean(errors.assignee)}
                    {...(errors.assignee && { helperText: errors.assignee.message })}
                  />
                )}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    onChange(newValue)
                  } else if (newValue && newValue.fullName) {
                    onChange(newValue.fullName)
                  } else {
                    onChange('')
                  }
                }}
              />
            )}
          />
          <Controller
            name='priority'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label='Priority'
                SelectProps={{ value: value, onChange: e => onChange(e) }}
              >
                {priorityOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <Controller
            name='dueDate'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='date'
                label='Due Date'
                value={value}
                sx={{ mb: 6 }}
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddTaskDrawer
