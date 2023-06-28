import { useDispatch } from "react-redux"
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

export default function AdminPropItem({ prop }){
    const dispatch = useDispatch();

    function deleteProp(){
        dispatch({ type: 'ADMIN_DELETE_PROP', payload: prop.id })
    }

    return(
        <TableRow>
            <TableCell>{(prop.first_name || prop.last_name) ? prop.first_name + ' ' + prop.last_name : prop.username}</TableCell>
            <TableCell>{prop.description}</TableCell>
            <TableCell>{prop.status}</TableCell>
            <TableCell>{prop.true_votes}</TableCell>
            <TableCell>{prop.false_votes}</TableCell>
            <TableCell>{moment(prop.created_date).format('LLL')}</TableCell>
            <TableCell><Button variant="contained" onClick={deleteProp}>Delete</Button></TableCell>
        </TableRow>
    )
}