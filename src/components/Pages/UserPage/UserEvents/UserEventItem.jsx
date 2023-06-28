import { useDispatch } from "react-redux"
import { useState } from "react";
import moment from "moment";
import UpdateEventModal from "./EventModals/UpdateEventModal";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

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
            <TableRow>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{dateMatch()
                    ? moment(event.start).format('M/DD/YY')
                    : moment(event.start).format('M/DD') +' - '+ moment(event.end).format('M/DD/YY')}
                </TableCell>
                <TableCell><Button variant="contained" onClick={handleDelete}>Delete</Button>
                    <Button variant="contained" onClick={() => setUpdateModalOpen(true)}>Edit</Button>
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