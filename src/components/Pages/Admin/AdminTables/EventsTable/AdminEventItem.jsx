import { useDispatch } from "react-redux"
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

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
            <TableCell>{dateMatch()
                ? moment(event.start).format('M/DD/YY')
                : moment(event.start).format('M/DD') + ' - ' + moment(event.end).format('M/DD/YY')}
            </TableCell>
            <TableCell><Button variant="contained"onClick={deleteEvent}>Delete</Button>
            </TableCell>
        </TableRow>
    )
}