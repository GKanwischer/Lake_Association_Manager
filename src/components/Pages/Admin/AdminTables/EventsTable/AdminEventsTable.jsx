import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import AdminEventItem from "./AdminEventItem";

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
            <table>
                <thead>
                    <tr>
                        <th>Created By</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => <AdminEventItem key={event.id} event={event} />)}
                </tbody>
            </table>
        </div>
    )
}