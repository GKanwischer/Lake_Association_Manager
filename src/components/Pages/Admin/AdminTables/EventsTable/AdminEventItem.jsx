import { useDispatch } from "react-redux"
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";


export default function AdminEventItem({ event }) {
    const dispatch = useDispatch();

    function deleteEvent() {
        dispatch({ type: 'ADMIN_DELETE_EVENT', payload: event.id })
    }

    const dateMatch = () => {
        if (moment(event.start).format('l') === moment(event.end).format('l')) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <TableRow>
            <TableCell>{(event.first_name || event.last_name) ? event.first_name + ' ' + event.last_name : event.username}</TableCell>
            <TableCell>{event.title}</TableCell>
            <TableCell>{event.description}</TableCell>
            <TableCell align="center">{dateMatch()
                ? moment(event.start).format('M/DD/YY')
                : moment(event.start).format('M/DD') + ' - ' + moment(event.end).format('M/DD/YY')}
            </TableCell>
            <TableCell align="right">
                <Tooltip title="Delete">
                    <IconButton aria-label="delete"
                        onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: 'rgb(191 34 34)',
                                cancelButtonColor: 'rgb(160 158 158)',
                                confirmButtonText: 'Yes, Delete it!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    deleteEvent(),
                                        Swal.fire(
                                            'Deleted!',
                                            `Event: ${event.title}, has been deleted.`,
                                            'success'
                                        )
                                }
                            })
                        }}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}


// <Button variant="contained"onClick={deleteEvent}>Delete</Button>