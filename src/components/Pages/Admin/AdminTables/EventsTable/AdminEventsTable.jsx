import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
// import components
import AdminEventItem from "./AdminEventItem";

// this component constructs the events table for the admin page

export default function AdminEventsTable() {
    const dispatch = useDispatch();
    const events = useSelector(store => store.events);
    // const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENTS' });
    }, []);

    return (
        <div className="admin-events">
            <Card
                elevation={6}
                sx={{
                    border: 4,
                    borderRadius: '16px',
                    borderColor: 'rgb(114, 162, 245)'
                }}
            >
                <CardHeader title="Community Events" />
                <TableContainer
                    sx={{ height: 525 }}
                >
                    <Table
                        sx={{ height: "max-content" }}
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow hover>
                                <TableCell sx={{ maxWidth: 140 }}>Created By</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell sx={{ minWidth: 500 }} >Description</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 60 }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map(event => <AdminEventItem key={event.id} event={event} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}