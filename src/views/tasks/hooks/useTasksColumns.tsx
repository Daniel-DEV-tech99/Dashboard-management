import { useMemo, useState } from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

// ** Import Edit Task Drawer
import EditTaskDrawer from 'src/views/tasks/edit/EditTaskDrawer'

const useTasksColumns = () => {
  // ** State for Edit Drawer
  const [editDrawerOpen, setEditDrawerOpen] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)

  // ** Toggle Edit Drawer
  const toggleEditDrawer = () => setEditDrawerOpen(!editDrawerOpen)

  const columns = useMemo<GridColDef[]>(() => [
    {
      flex: 0.25,
      minWidth: 170,
      field: 'title',
      headerName: 'Title'
    },
    {
      flex: 0.15,
      field: 'description',
      minWidth: 315,
      headerName: 'Description'
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'dueDate',
      headerName: 'Due Date'
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'assignee',
      headerName: 'User'
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const status = params.value?.toString().toLowerCase() || '';

        // Define color mapping for different status values
        type StatusColorType = {
          color: string;
          bgColor: string;
        };

        type StatusColorsMapType = {
          [key: string]: StatusColorType;
        };

        const statusColors: StatusColorsMapType = {
          'in-progress': { color: '#F79009', bgColor: '#FEF0C7' }, // Orange
          'open': { color: '#667085', bgColor: '#F2F4F7' }, // Gray
          'to_do': { color: '#F79009', bgColor: '#FEF0C7' }, // Orange
          'completed': { color: '#039855', bgColor: '#D1FADF' }, // Green
          'default': { color: '#667085', bgColor: '#F2F4F7' } // Gray (default)
        };

        const getStatusColor = (status: string): StatusColorType => {
          return statusColors[status] || statusColors['default'];
        };

        // Get display text (capitalize and replace underscores with spaces)
        const getDisplayText = (status: string) => {
          return status
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        };

        const { color, bgColor } = getStatusColor(status);

        return (
          <Chip
            label={getDisplayText(status)}
            size="small"
            sx={{
              color: color,
              backgroundColor: bgColor,
              fontWeight: 500,
              fontSize: '0.75rem',
              height: '24px',
              borderRadius: '16px'
            }}
          />
        );
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', gap:'6px' }}>
            <IconButton
              size="medium"
              aria-label="edit"
              onClick={() => {
                // Set selected task and open drawer
                setSelectedTask(params.row);
                toggleEditDrawer();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M18 5L15.586 2.586C15.211 2.2109 14.7024 2.00011 14.172 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20" stroke="#595959" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.377 12.6261C21.7754 12.2278 21.9991 11.6875 21.9991 11.1241C21.9991 10.5608 21.7754 10.0205 21.377 9.62215C20.9786 9.22379 20.4384 9 19.875 9C19.3116 9 18.7714 9.22379 18.373 9.62215L14.363 13.6341C14.1252 13.8718 13.9512 14.1655 13.857 14.4881L13.02 17.3581C12.9949 17.4442 12.9934 17.5354 13.0156 17.6222C13.0379 17.7091 13.0831 17.7883 13.1464 17.8517C13.2098 17.9151 13.2891 17.9603 13.3759 17.9825C13.4627 18.0048 13.554 18.0032 13.64 17.9781L16.51 17.1411C16.8327 17.0469 17.1264 16.8729 17.364 16.6351L21.377 12.6261Z" stroke="#595959" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 18H9" stroke="#595959" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </IconButton>
            <IconButton
              size="medium"
              aria-label="delete"
              onClick={() => {
                // Handle delete action here
                console.log('Delete task:', params.row);
              alert('its fake data base cant deleted')
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="0 0 20 20" fill="none">
  <path d="M9.99979 1.6665C8.53799 1.6665 7.32079 2.75877 7.11649 4.1665H4.26574C4.23025 4.16043 4.19431 4.15744 4.15832 4.15755C4.12721 4.15822 4.0962 4.16122 4.06554 4.1665H2.70812C2.6253 4.16533 2.54307 4.18063 2.46622 4.21152C2.38936 4.2424 2.31941 4.28825 2.26043 4.3464C2.20145 4.40456 2.15462 4.47385 2.12265 4.55026C2.09068 4.62667 2.07422 4.70868 2.07422 4.7915C2.07422 4.87433 2.09068 4.95633 2.12265 5.03275C2.15462 5.10916 2.20145 5.17845 2.26043 5.2366C2.31941 5.29476 2.38936 5.34061 2.46622 5.37149C2.54307 5.40237 2.6253 5.41768 2.70812 5.4165H3.59923L4.64822 16.262C4.76117 17.4315 5.7547 18.3332 6.92931 18.3332H13.0694C14.2441 18.3332 15.2376 17.4316 15.3505 16.262L16.4003 5.4165H17.2915C17.3743 5.41768 17.4565 5.40237 17.5334 5.37149C17.6102 5.34061 17.6802 5.29476 17.7391 5.2366C17.7981 5.17845 17.845 5.10916 17.8769 5.03275C17.9089 4.95633 17.9254 4.87433 17.9254 4.7915C17.9254 4.70868 17.9089 4.62667 17.8769 4.55026C17.845 4.47385 17.7981 4.40456 17.7391 4.3464C17.6802 4.28825 17.6102 4.2424 17.5334 4.21152C17.4565 4.18063 17.3743 4.16533 17.2915 4.1665H15.9348C15.8685 4.15575 15.8009 4.15575 15.7346 4.1665H12.8831C12.6788 2.75877 11.4616 1.6665 9.99979 1.6665ZM9.99979 2.9165C10.7828 2.9165 11.4251 3.4449 11.6087 4.1665H8.3909C8.57447 3.4449 9.21681 2.9165 9.99979 2.9165ZM4.85412 5.4165H15.1446L14.1062 16.1416C14.0541 16.6812 13.6114 17.0832 13.0694 17.0832H6.92931C6.38809 17.0832 5.94458 16.6805 5.89253 16.1416L4.85412 5.4165ZM8.53169 7.49089C8.36607 7.49347 8.20825 7.56169 8.09289 7.68056C7.97754 7.79942 7.91408 7.95922 7.91645 8.12484V14.3748C7.91528 14.4577 7.93058 14.5399 7.96147 14.6167C7.99235 14.6936 8.0382 14.7635 8.09635 14.8225C8.15451 14.8815 8.2238 14.9283 8.30021 14.9603C8.37662 14.9923 8.45863 15.0087 8.54145 15.0087C8.62428 15.0087 8.70628 14.9923 8.7827 14.9603C8.85911 14.9283 8.9284 14.8815 8.98655 14.8225C9.04471 14.7635 9.09056 14.6936 9.12144 14.6167C9.15232 14.5399 9.16762 14.4577 9.16645 14.3748V8.12484C9.16765 8.04119 9.15205 7.95814 9.12056 7.88063C9.08908 7.80312 9.04235 7.73272 8.98316 7.6736C8.92396 7.61448 8.8535 7.56785 8.77595 7.53646C8.6984 7.50508 8.61534 7.48958 8.53169 7.49089ZM11.4484 7.49089C11.2827 7.49347 11.1249 7.56169 11.0096 7.68056C10.8942 7.79942 10.8307 7.95922 10.8331 8.12484V14.3748C10.8319 14.4577 10.8473 14.5399 10.8781 14.6167C10.909 14.6936 10.9549 14.7635 11.013 14.8225C11.0712 14.8815 11.1405 14.9283 11.2169 14.9603C11.2933 14.9923 11.3753 15.0087 11.4581 15.0087C11.5409 15.0087 11.623 14.9923 11.6994 14.9603C11.7758 14.9283 11.8451 14.8815 11.9032 14.8225C11.9614 14.7635 12.0072 14.6936 12.0381 14.6167C12.069 14.5399 12.0843 14.4577 12.0831 14.3748V8.12484C12.0843 8.04119 12.0687 7.95814 12.0372 7.88063C12.0057 7.80312 11.959 7.73272 11.8998 7.6736C11.8406 7.61448 11.7702 7.56785 11.6926 7.53646C11.6151 7.50508 11.532 7.48958 11.4484 7.49089Z" fill="#475467"/>
</svg>
            </IconButton>
          </Box>
        )
      }
    }
  ], [editDrawerOpen, selectedTask])

  return {
    columns,
    EditTaskDrawerComponent: (
      <EditTaskDrawer
        open={editDrawerOpen}
        toggle={toggleEditDrawer}
        taskData={selectedTask}
      />
    )
  }
}

export default useTasksColumns
