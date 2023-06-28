import { useDispatch } from "react-redux"
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

export default function UserPropItem({prop}){
    const dispatch = useDispatch();

    // function handleEdit(){
    //     might add this later
    // }

    function handleDelete(){
        dispatch({ type: 'DELETE_USER_PROP', payload: prop.id })
    }

    return(
        <TableRow>
            <TableCell>{prop.description}</TableCell>
            <TableCell>{moment(prop.created_date).format('LLL')}</TableCell>
            <TableCell>{prop.status}</TableCell>
            <TableCell><Button variant="contained" onClick={handleDelete}>Delete</Button></TableCell>
        </TableRow>

    )
}