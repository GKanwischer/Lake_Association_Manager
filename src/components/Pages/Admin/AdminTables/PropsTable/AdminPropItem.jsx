import { useDispatch } from "react-redux"
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminPropItem({ prop }) {
    const dispatch = useDispatch();

    function deleteProp() {
        dispatch({ type: 'ADMIN_DELETE_PROP', payload: prop.id })
    }

    return (
        <TableRow>
            <TableCell>{(prop.first_name || prop.last_name) ? prop.first_name + ' ' + prop.last_name : prop.username}</TableCell>
            <TableCell>{prop.description}</TableCell>
            <TableCell align="center" >{prop.status}</TableCell>
            <TableCell align="center" >{prop.true_votes}</TableCell>
            <TableCell align="center" >{prop.false_votes}</TableCell>
            <TableCell align="center" >{moment(prop.created_date).format('LLL')}</TableCell>
            <TableCell align="center" >
                <IconButton aria-label="delete" onClick={deleteProp}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}