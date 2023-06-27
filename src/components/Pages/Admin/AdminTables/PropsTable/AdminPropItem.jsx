import { useDispatch } from "react-redux"
import moment from "moment";

export default function AdminPropItem({ prop }){
    const dispatch = useDispatch();

    // function userLevelChange(){
    //     dispatch({ type: 'ADMIN_USER_LEVEL', payload: prop.id })
    //     // dispatch({ type: 'ADMIN_FETCH_USERS' })
    // }

    function deleteProp(){
        dispatch({ type: 'ADMIN_DELETE_PROP', payload: prop.id })
    }

    return(
        <tr>
            <td>{(prop.first_name || prop.last_name) ? prop.first_name + ' ' + prop.last_name : prop.username}</td>
            <td>{prop.description}</td>
            <td>{prop.status}</td>
            <td>{prop.true_votes}</td>
            <td>{prop.false_votes}</td>
            <td>{moment(prop.created_date).format('LLL')}</td>
            <td><button onClick={deleteProp}>Delete</button></td>
        </tr>
    )
}