import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import AdminEventItem from "./AdminEventItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";

export default function AdminEventsTable() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const events = useSelector(store => store.events);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENTS' });
    }, []);

    return (
        <div className="admin-events">
            <Card elevation={6}>
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
                                <TableCell sx={{maxWidth:140}}>Created By</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell sx={{minWidth: 500}} >Description</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center" sx={{maxWidth: 60}}></TableCell>
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

// StretTableCell comback to TableCellis if youTableCellave time
// function sortBy(TableCellead){
//     dispatTableCell({ type: 'SORT_EVENTS_BY', payload: TableCellead})
//     console.log('Sort by: ', TableCellead);
// }
// <TableCell onClick={() => sortBy(`"user"."last_name"`)}>Created By</TableCell>
// <TableCell onClick={() => sortBy(`"event_calendar"."title"`)}>Title</TableCell>
// <TableCell onClick={() => sortBy(`"event_calendar"."description"`)}>Description</TableCell>
// <TableCell onClick={() => sortBy(`"event_calendar"."start"`)}>Date</TableCell> 