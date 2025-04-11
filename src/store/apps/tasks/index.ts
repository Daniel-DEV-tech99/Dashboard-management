// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

interface DataParams {
  q: string
  status: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Tasks
export const fetchTasks = createAsyncThunk('appTasks/fetchTasks', async (params: DataParams) => {
  try {
    const response = await axios.get('/apps/tasks/list', {
      params
    })

return response.data
  } catch (error) {
    // If API call fails, use mock data directly
    console.log('Using mock data as API call failed:', error)

    // Import mock data
    const mockData = {
      tasks: [
        {
          id: 1,
          title: 'Update dashboard UI',
          description: 'Improve the dashboard UI with new charts and widgets',
          assignee: 'John Doe',
          dueDate: '2023-12-25',
          priority: 'high',
          status: 'in-progress',
          tags: ['UI', 'dashboard'],
          avatar: '/images/avatars/1.png',
          avatarColor: 'primary',
          attachments: 3,
          comments: 5
        },
        {
          id: 2,
          title: 'Fix login authentication',
          description: 'Resolve issues with user login and authentication flow',
          assignee: 'Jane Smith',
          dueDate: '2023-12-15',
          priority: 'critical',
          status: 'open',
          tags: ['security', 'authentication'],
          avatar: '/images/avatars/3.png',
          attachments: 1,
          comments: 8
        },
        {
          id: 3,
          title: 'Implement dark mode',
          description: 'Add dark mode support to the application',
          assignee: 'Mike Johnson',
          dueDate: '2024-01-10',
          priority: 'medium',
          status: 'completed',
          tags: ['UI', 'theme'],
          avatar: '/images/avatars/1.png',
          attachments: 0,
          comments: 3
        },
        {
          id: 4,
          title: 'Optimize API performance',
          description: 'Improve API response time and reduce server load',
          assignee: 'Sarah Williams',
          dueDate: '2023-12-30',
          priority: 'high',
          status: 'in-progress',
          tags: ['backend', 'performance'],
          avatar: '/images/avatars/3.png',
          attachments: 2,
          comments: 0
        },
        {
          id: 5,
          title: 'Create user documentation',
          description: 'Write comprehensive user documentation for the application',
          assignee: 'Alex Brown',
          dueDate: '2024-01-20',
          priority: 'low',
          status: 'open',
          tags: ['documentation'],
          avatar: '/images/avatars/1.png',
          attachments: 5,
          comments: 2
        }
      ]
    }

    // Filter the mock data based on params if needed
    const { q = '', status = '' } = params
    const queryLowered = q.toLowerCase()

    const filteredData = mockData.tasks.filter(
      task =>
        (task.title.toLowerCase().includes(queryLowered) ||
          task.description.toLowerCase().includes(queryLowered) ||
          task.assignee.toLowerCase().includes(queryLowered)) &&
        (status === '' || task.status === status)
    )

    return {
      allData: mockData.tasks,
      tasks: filteredData,
      params,
      total: filteredData.length
    }
  }
})

// ** Add Task
export const addTask = createAsyncThunk(
  'appTasks/addTask',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    try {
      const response = await axios.post('/apps/tasks/add-task', {
        data
      })
      dispatch(fetchTasks(getState().task.params))

      return response.data
    } catch (error) {
      console.log('Using mock data as API call failed:', error)

      // Create a mock response for adding a task
      const mockResponse = {
        task: {
          id: Math.floor(Math.random() * 1000) + 100, // Generate a random ID
          ...data,
          avatar: data.avatar || '',
          avatarColor: data.avatarColor || 'primary',
          status: data.status || 'open',
          tags: data.tags || [],
          attachments: data.attachments || 0,
          comments: data.comments || 0
        }
      }

      // Refresh the task list
      dispatch(fetchTasks(getState().task.params))

      return mockResponse
    }
  }
)

// ** Update Task
export const updateTask = createAsyncThunk(
  'appTasks/updateTask',
  async (data: { id: number | string; [key: string]: any }, { getState, dispatch }: Redux) => {
    try {
      const response = await axios.post('/apps/tasks/update-task', {
        data
      })
      dispatch(fetchTasks(getState().task.params))

      return response.data
    } catch (error) {
      console.log('Using mock data as API call failed:', error)

      // Create a mock response for updating a task
      const mockResponse = {
        task: {
          ...data,
          avatar: data.avatar || '',
          avatarColor: data.avatarColor || 'primary',
          tags: data.tags || [],
          attachments: data.attachments || 0,
          comments: data.comments || 0
        }
      }

      // Refresh the task list
      dispatch(fetchTasks(getState().task.params))

      return mockResponse
    }
  }
)

// ** Delete Task
export const deleteTask = createAsyncThunk(
  'appTasks/deleteTask',
  async (id: number | string, { getState, dispatch }: Redux) => {
    try {
      const response = await axios.delete('/apps/tasks/delete', {
        data: id
      })
      dispatch(fetchTasks(getState().task.params))

      return response.data
    } catch (error) {
      console.log('Using mock data as API call failed:', error)

      // No need to return specific data for delete operation
      // Just refresh the task list
      dispatch(fetchTasks(getState().task.params))

      return { success: true }
    }
  }
)

export const appTasksSlice = createSlice({
  name: 'appTasks',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data = action.payload.tasks
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appTasksSlice.reducer
