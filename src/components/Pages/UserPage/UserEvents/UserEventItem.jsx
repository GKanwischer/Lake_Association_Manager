import { useDispatch } from "react-redux"
import moment from "moment";

export default function UserEventItem({event}){
    const dispatch = useDispatch();

    const dateMatch = () => {
        if( event.start === event.end ){
            return true;
        } else {
            return false;
        }
    }

    // function handleEdit(){
    //     might add this later
    // }

    function handleDelete(){
        dispatch({ type: 'DELETE_EVENT', payload: event.id })
    }

    return(
        <tr>
            <td>{event.title}</td>
            <td>{event.description}</td>
            <td>{ dateMatch ? moment(event.start).format('l') : moment(event.start).format('l') - moment(event.end).format('l') }</td>
            <td><button onClick={handleDelete}>Delete</button><button>Edit</button></td>
        </tr>

    )
}