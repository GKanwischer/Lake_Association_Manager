import { useDispatch } from "react-redux"
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";

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
                    <IconButton aria-label="delete" 
                        onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleDelete(),
                                        Swal.fire(
                                            'Deleted!',
                                            `Your proposal created on ${moment(prop.created_date).format('LLL')}, was succesfully deleted.`,
                                            'success'
                                        )
                                }
                            })
                        }}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>

    )
}