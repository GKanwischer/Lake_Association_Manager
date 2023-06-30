import { useDispatch, useSelector } from "react-redux"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";

export default function AdminUserItem({ user }) {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(store => store.user)

    function userLevelChange() {
        dispatch({ type: 'ADMIN_USER_LEVEL', payload: user.id })
    }

    function deleteUser() {
        dispatch({ type: 'ADMIN_DELETE_USER', payload: user.id })
    }

    return (
        <TableRow>
            <TableCell align="left">
                <Tooltip title={user.is_admin ? 'Remove admin' : 'Make admin'}>
                    <Checkbox
                        checked={user.is_admin}
                        onChange={userLevelChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Tooltip>
                {user.is_admin
                    ? 'Admin'
                    : 'User'}
            </TableCell>
            <TableCell align="center" >
                {user.username}
            </TableCell>
            <TableCell align="center" >
                {(user.first_name || user.last_name)
                    ? user.first_name + ' ' + user.last_name
                    : 'N/A'}
            </TableCell>
            <TableCell align="center" >
                {(!user.phone_number || user.phone_number === '0')
                    ? 'N/A'
                    : user.phone_number}
            </TableCell>
            <TableCell>{user.email
                ? user.email
                : 'N/A'}
            </TableCell>
            <TableCell sx={{ minWidth: 250 }}>
                {(user.street_address || user.city || user.state)
                    ? (`${user.street_address} ${user.city}, ${user.state}`)
                    : 'N/A'}
            </TableCell>
            <TableCell align="right" className="user-actions">
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={() => {
                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, remove them!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                deleteUser(),
                                Swal.fire(
                                    'Deleted!',
                                    `User: ${user.username}, has been removed from the community.`,
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