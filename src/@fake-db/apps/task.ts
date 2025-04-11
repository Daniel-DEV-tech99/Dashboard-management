// ** Mock
import mock from 'src/@fake-db/mock'

// ** Types
import { TaskType, ProjectListDataType } from 'src/types/apps/userTypes'

const data: { tasks: TaskType[] } = {
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
      status: 'to-do',
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
      status: 'to-do',
      tags: ['documentation'],
      avatar: '/images/avatars/1.png',
      attachments: 5,
      comments: 2
    },
    {
      id: 6,
      title: 'Refactor authentication service',
      description: 'Improve code structure and security of the authentication service',
      assignee: 'Robert Chen',
      dueDate: '2024-01-05',
      priority: 'medium',
      status: 'to-do',
      tags: ['security', 'refactoring'],
      avatar: '/images/avatars/4.png',
      avatarColor: 'error',
      attachments: 1,
      comments: 4
    },
    {
      id: 7,
      title: 'Update dependencies',
      description: 'Update all npm packages to their latest compatible versions',
      assignee: 'Emma Wilson',
      dueDate: '2023-12-10',
      priority: 'low',
      status: 'completed',
      tags: ['maintenance'],
      avatar: '/images/avatars/2.png',
      avatarColor: 'warning',
      attachments: 0,
      comments: 1
    },
    {
      id: 8,
      title: 'Implement file upload feature',
      description: 'Add ability to upload and manage files in the application',
      assignee: 'David Park',
      dueDate: '2024-01-15',
      priority: 'high',
      status: 'in-progress',
      tags: ['feature', 'storage'],
      avatar: '/images/avatars/4.png',
      attachments: 2,
      comments: 7
    },
    {
      id: 9,
      title: 'Fix responsive layout issues',
      description: 'Address layout problems on mobile and tablet devices',
      assignee: 'Lisa Johnson',
      dueDate: '2023-12-20',
      priority: 'medium',
      status: 'to-do',
      tags: ['UI', 'responsive'],
      avatar: '/images/avatars/2.png',
      attachments: 0,
      comments: 3
    },
    {
      id: 10,
      title: 'Implement user roles and permissions',
      description: 'Create a comprehensive role-based access control system',
      assignee: 'Michael Brown',
      dueDate: '2024-02-01',
      priority: 'critical',
      status: 'to-do',
      tags: ['security', 'authorization'],
      avatar: '/images/avatars/5.png',
      attachments: 4,
      comments: 9
    }
  ]
}


// POST: Add new task


const projectListData: ProjectListDataType[] = [
  {
    id: 1,
    hours: '18:42',
    progressValue: 78,
    totalTask: '122/240',
    progressColor: 'success',
    projectType: 'React Project',
    projectTitle: 'BGC eCommerce App',
    img: '/images/icons/project-icons/react.png'
  },
  {
    id: 2,
    hours: '20:42',
    progressValue: 18,
    totalTask: '9/56',
    progressColor: 'error',
    projectType: 'Figma Project',
    projectTitle: 'Falcon Logo Design',
    img: '/images/icons/project-icons/figma.png'
  },
  {
    id: 3,
    hours: '120:87',
    progressValue: 62,
    totalTask: '290/320',
    progressColor: 'primary',
    projectType: 'VueJs Project',
    projectTitle: 'Dashboard Design',
    img: '/images/icons/project-icons/vue.png'
  },
  {
    id: 4,
    hours: '89:19',
    progressValue: 8,
    totalTask: '7/63',
    progressColor: 'error',
    projectType: 'Xamarin Project',
    projectTitle: 'Foodista Mobile App',
    img: '/images/icons/project-icons/xamarin.png'
  },
  {
    id: 5,
    hours: '230:10',
    progressValue: 49,
    totalTask: '120/186',
    progressColor: 'warning',
    projectType: 'Python Project',
    projectTitle: 'Dojo React Project',
    img: '/images/icons/project-icons/python.png'
  },
  {
    id: 6,
    hours: '342:41',
    progressValue: 92,
    totalTask: '99/109',
    progressColor: 'success',
    projectType: 'Sketch Project',
    projectTitle: 'Blockchain Website',
    img: '/images/icons/project-icons/sketch.png'
  },
  {
    id: 7,
    hours: '12:45',
    progressValue: 88,
    totalTask: '98/110',
    progressColor: 'success',
    projectType: 'HTML Project',
    projectTitle: 'Hoffman Website',
    img: '/images/icons/project-icons/html5.png'
  }
]

// POST: Add new task
mock.onPost('/apps/tasks/add-task').reply(config => {
  // Get task from post data
  const task = JSON.parse(config.data).data

  const lastId = Math.max(...data.tasks.map(t => t.id), 0)

  task.id = lastId + 1

  data.tasks.unshift({
    ...task,
    avatar: task.avatar || '',
    avatarColor: task.avatarColor || 'primary',
    status: task.status || 'to-do',
    tags: task.tags || [],
    attachments: task.attachments || 0,
    comments: task.comments || 0
  })

  return [201, { task }]
})

// POST: Update task
mock.onPost('/apps/tasks/update-task').reply(config => {
  // Get task from post data
  const updatedTask = JSON.parse(config.data).data

  // Find task index
  const taskIndex = data.tasks.findIndex(t => t.id === updatedTask.id)

  if (taskIndex >= 0) {
    // Update task
    data.tasks[taskIndex] = {
      ...data.tasks[taskIndex],
      ...updatedTask,
      tags: updatedTask.tags || data.tasks[taskIndex].tags || []
    }

    return [200, { task: data.tasks[taskIndex] }]
  }

  return [404, { message: 'Task not found' }]
})

// GET: DATA
mock.onGet('/apps/tasks/list').reply(config => {
  const { q = '', priority = null, status = null, assignee = null } = config.params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredData = data.tasks.filter(
    task =>
      (task.title.toLowerCase().includes(queryLowered) ||
        task.description.toLowerCase().includes(queryLowered) ||
        task.assignee.toLowerCase().includes(queryLowered) ||
        (task.priority.toLowerCase().includes(queryLowered) &&
          task.status.toLowerCase().includes(queryLowered))) &&
      task.priority === (priority || task.priority) &&
      task.assignee === (assignee || task.assignee) &&
      task.status === (status || task.status)
  )

  return [
    200,
    {
      allData: data.tasks,
      tasks: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})

// DELETE: Deletes Task
mock.onDelete('/apps/tasks/delete').reply(config => {
  // Get task id from URL
  const taskId = config.data

  const taskIndex = data.tasks.findIndex(t => t.id === taskId)
  data.tasks.splice(taskIndex, 1)

  return [200]
})

// GET: DATA
mock.onGet('/apps/tasks/project-list').reply(config => {
  const { q = '' } = config.params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredData = projectListData.filter(
    project =>
      project.projectTitle.toLowerCase().includes(queryLowered) ||
      project.projectType.toLowerCase().includes(queryLowered) ||
      project.totalTask.toLowerCase().includes(queryLowered) ||
      project.hours.toLowerCase().includes(queryLowered) ||
      String(project.progressValue).toLowerCase().includes(queryLowered)
  )

  return [200, filteredData]
})
