import { useDispatch } from "react-redux"
import moment from "moment";

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
        <tr>
            <td>{(event.first_name || event.last_name) ? event.first_name + ' ' + event.last_name : event.username}</td>
            <td>{event.title}</td>
            <td>{event.description}</td>
            <td>{dateMatch()
                ? moment(event.start).format('M/DD/YY')
                : moment(event.start).format('M/DD') + ' - ' + moment(event.end).format('M/DD/YY')}
            </td>
            <td><button onClick={deleteEvent}>Delete</button>
            </td>
        </tr>
    )
}