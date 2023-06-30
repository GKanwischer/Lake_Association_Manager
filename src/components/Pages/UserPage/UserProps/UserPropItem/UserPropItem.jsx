import { useDispatch } from "react-redux"
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";

export default function UserPropItem({ prop }) {
    const dispatch = useDispatch();

    function handleDelete() {
        dispatch({ type: 'DELETE_USER_PROP', payload: prop.id })
    }

    return (
        <TableRow>
            <TableCell>{prop.description}</TableCell>
            <TableCell>{moment(prop.created_date).format('LLL')}</TableCell>
            <TableCell>{prop.status}</TableCell>
            <TableCell align="right">
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                {/* <Button variant="contained" onClick={handleDelete}>Delete</Button> */}
            </TableCell>
        </TableRow>

    )
}