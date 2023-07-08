import { useDispatch } from "react-redux"
import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";

// this component builds each item in the proposals table of the admin page

export default function AdminPropItem({ prop }) {
    const dispatch = useDispatch();

    // function for deleting a proposal from the db
    function deleteProp() {
        dispatch({ type: 'ADMIN_DELETE_PROP', payload: prop.id })
    }

    return (
        <TableRow>
            <TableCell>
                {(prop.first_name || prop.last_name)
                    ? prop.first_name + ' ' + prop.last_name
                    : prop.username}
            </TableCell>
            <TableCell>{prop.description}</TableCell>
            <TableCell align="center" >{prop.status}</TableCell>
            <TableCell align="center" >{prop.true_votes}</TableCell>
            <TableCell align="center" >{prop.false_votes}</TableCell>
            <TableCell align="center" >{moment(prop.created_date).format('LLL')}</TableCell>
            <TableCell align="right" >
                <Tooltip title="Delete">
                    <IconButton aria-label="delete"
                        onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: 'rgb(191 34 34)',
                                cancelButtonColor: 'rgb(160 158 158)',
                                confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    deleteProp(),
                                        Swal.fire(
                                            'Deleted!',
                                            `The proposal created by ${prop.username}, was succesfully deleted.`,
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