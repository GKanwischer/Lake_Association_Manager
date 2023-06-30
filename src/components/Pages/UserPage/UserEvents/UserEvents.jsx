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
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';


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
        <Card elevation={6} className="user-events">
            <CardHeader
                title="Your Community Events"
                action={
                    <Tooltip title="Add Event">
                        <IconButton aria-label="add" onClick={() => setModalOpen(true)}>
                            <AddBoxIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>} />
            <TableContainer sx={{ height: 300 }}>
                <Table
                    sx={{ height: "max-content" }}
                    stickyHeader
                    aria-label="user events table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userEvents.map(event => <UserEventItem key={event.id} event={event} />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </Card>
    )
}