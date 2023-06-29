import { useDispatch } from "react-redux"
import { useState } from "react";
import moment from "moment";
import UpdateEventModal from "./EventModals/UpdateEventModal";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';


export default function UserEventItem({ event }) {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const dateMatch = () => {
        if (moment(event.start).format('l') === moment(event.end).format('l')) {
            return true;
        } else {
            return false;
        }
    }

    function handleDelete() {
        dispatch({ type: 'DELETE_EVENT', payload: event.id })
    }

    return (
        <>
            <TableRow sx={{ Height: 300 }}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{dateMatch()
                    ? moment(event.start).format('M/DD/YY')
                    : moment(event.start).format('M/DD') + ' - ' + moment(event.end).format('M/DD/YY')}
                </TableCell>
                <TableCell>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={handleDelete}>
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