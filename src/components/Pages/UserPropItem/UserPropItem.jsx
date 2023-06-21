import { useDispatch } from "react-redux"

export default function UserPropItem({prop}){
    const dispatch = useDispatch();

    // function handleEdit(){
    //     might add this later
    // }

    function handleDelete(){
        dispatch({ type: 'DELETE_USER_PROP', payload: prop.id })
    }

    return(
        <tr>
            <td>{prop.description}</td>
            <td>{prop.created_date}</td>
            <td>{prop.status}</td>
            <td><button onClick={handleDelete}>Delete</button></td>
        </tr>

    )
}