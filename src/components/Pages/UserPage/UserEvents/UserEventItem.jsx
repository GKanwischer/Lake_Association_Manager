import { useDispatch } from "react-redux"
import { useState } from "react";
import moment from "moment";
import UpdateEventModal from "./EventModals/UpdateEventModal";

export default function UserEventItem({ event }) {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const dateMatch = () => {
        if (moment(event.start).format('l') === moment(event.end).format('l')) {
            return true;
        } else {
            return false;
        }
    }

    function handleDelete() {
        dispatch({ type: 'DELETE_EVENT', payload: event.id })
    }

    return (
        <>
            <tr>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{dateMatch()
                    ? moment(event.start).format('M/DD/YY')
                    : moment(event.start).format('M/DD') +' - '+ moment(event.end).format('M/DD/YY')}
                </td>
                <td><button onClick={handleDelete}>Delete</button>
                    <button onClick={() => setUpdateModalOpen(true)}>Edit</button>
                </td>
            </tr>
            <UpdateEventModal
                isOpen={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                event={event}
            />
        </>
    )
}