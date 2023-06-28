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

export default function AdminEventsTable() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const events = useSelector(store => store.events);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENTS' });
    }, []);

    return (
        <div className="admin-events">
            <h3>Community Events</h3>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Created By</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map(event => <AdminEventItem key={event.id} event={event} />)}
                    </TableBody>
                </Table>
            </TableContainer>
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