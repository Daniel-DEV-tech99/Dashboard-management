import * as yup from 'yup'
import { EditorState } from 'draft-js'

// Import the showErrors function from the AddTaskDrawer component
import { showErrors } from '../AddTaskDrawer'

export const TaskSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, obj => showErrors('Title', obj.value.length, obj.min))
    .required(),
  description: yup
    .mixed()
    .test('is-editor-state', 'Description is required', (value: unknown) => {
      if (!value || typeof (value as EditorState).getCurrentContent !== 'function') return false
      const contentState = (value as EditorState).getCurrentContent()

      return !contentState.getPlainText().trim() ? false : true
    })
    .required('Description is required'),
  status: yup.string().required('Status is required'),
  assignee: yup.string().required('Assignee is required')
})
