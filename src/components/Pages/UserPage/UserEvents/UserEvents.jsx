import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import UserEventItem from "./UserEventItem";
import AddEventModal from "./EventModals/AddEventModal";

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
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th><button onClick={() => setModalOpen(true)}>Add Event</button></th>
                    </tr>
                </thead>
                <tbody>
                    {userEvents.map(event => <UserEventItem key={event.id} event={event} />)}
                </tbody>
            </table>

            <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    )
}