// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: number
  role: string
  email: string
  status: string
  avatar: string
  billing: string
  company: string
  country: string
  contact: string
  fullName: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor
}

export type TaskType = {
  id: number
  title: string
  description: string
  assignee: string
  dueDate: string
  priority: string
  status: string
  tags: string[]
  avatar: string
  avatarColor?: ThemeColor
  attachments?: number
  comments?: number
}

export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
