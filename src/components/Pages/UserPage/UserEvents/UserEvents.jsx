import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import UserEventItem from "./UserEventItem";
import AddEventModal from "./EventModals/AddEventModal";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import Button from "@mui/material/Button";

export default function UserEvents() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const userEvents = useSelector(store => store.events.filter(event => event.user_id === user.id));
    const [modalOpen, setModalOpen] = useState(false);

    console.log('User events', userEvents);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENTS' });
    }, []);

    return (
        <div className="user-events">
            <h3>Your Community Events</h3>
            <Card elevation={6}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell><Button variant="contained" onClick={() => setModalOpen(true)}>Add Event</Button></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userEvents.map(event => <UserEventItem key={event.id} event={event} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    )
}