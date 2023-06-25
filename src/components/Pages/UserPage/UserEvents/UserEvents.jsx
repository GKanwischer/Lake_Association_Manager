import { useSelector, useDispatch } from "react-redux"
import UserEventItem from "./UserEventItem";

export default function UserEvents() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const userEvents = useSelector(store => store.events.filter(event => event.user_id === user.id));


    return (
        <div className="user-events">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userEvents.map(event => <UserEventItem key={event.id} event={event} />)}
                </tbody>
            </table>
        </div>
    )
}