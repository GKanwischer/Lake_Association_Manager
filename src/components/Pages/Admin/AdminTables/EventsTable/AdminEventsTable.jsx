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

    function sortBy(thead){
        // dispatch({ type: 'SORT_EVENT_BY', payload: thead})
        console.log('Sort by: ', thead);
    }

    return (
        <div className="admin-events">
                <h3>Community Events</h3>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortBy('last_name')}>Created By</th>
                        <th onClick={() => sortBy('title')}>Title</th>
                        <th onClick={() => sortBy('description')}>Description</th>
                        <th onClick={() => sortBy('start')}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => <AdminEventItem key={event.id} event={event} />)}
                </tbody>
            </table>
        </div>
    )
}