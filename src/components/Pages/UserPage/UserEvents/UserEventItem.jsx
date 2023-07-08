import { useDispatch } from "react-redux"
import { useState } from "react";
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
// component import
import UpdateEventModal from "./EventModals/UpdateEventModal";

// component that constructs each row of the events table on the user page

export default function UserEventItem({ event }) {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    // This is just to compare the start and end date of an event. 
    // That way it only shows one of them if they're matching, which allows for a cleaner display.
    const dateMatch = () => {
        if (moment(event.start).format('l') === moment(event.end).format('l')) {
            return true;
        } else {
            return false;
        }
    }

    // function to handle the deletion of an event
    function handleDelete() {
        dispatch({ type: 'DELETE_EVENT', payload: event.id })
    }

    return (
        <>
            <TableRow>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{dateMatch()
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
                                    confirmButtonText: 'Yes, delete it!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleDelete(),
                                            Swal.fire(
                                                'Deleted!',
                                                `Event: ${event.title}, was succesfully deleted.`,
                                                'success'
                                            )
                                    }
                                })
                            }}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" onClick={() => setUpdateModalOpen(true)}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <UpdateEventModal
                isOpen={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                event={event}
            />
        </>
    )
}