// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import { InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Table Components Imports
import TableHeader from 'src/views/tasks/list/TableHeader'

import useTasksColumns from 'src/views/tasks/hooks/useTasksColumns'
import SidebarAddUser from 'src/views/tasks/add/AddTaskDrawer'
import { fetchTasks } from 'src/store/apps/tasks'

// Define getStaticProps to satisfy TypeScript
export const getStaticProps = () => {
  return {
    props: {}
  }
}

const TasksList = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const { columns, EditTaskDrawerComponent } = useTasksColumns()
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.tasks)
  console.log(store)

  useEffect(() => {
    dispatch(
      fetchTasks({
        status,
        q: value
      })
    )
  }, [dispatch, status, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setStatus(e.target.value as string)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            status={status}
            handleStatusChange={handleStatusChange}
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            checkboxSelection
            rows={store.data}
            sx={{ p: '8px 24px 24px 24px' }}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      <SidebarAddUser open={addUserOpen} toggle={toggleAddUserDrawer} />
      {EditTaskDrawerComponent}
    </Grid>
  )
}

export default TasksList
