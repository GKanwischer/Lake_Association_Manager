import { useDispatch, useSelector } from "react-redux"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";

export default function AdminUserItem({ user }) {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(store => store.user)

    function userLevelChange() {
        dispatch({ type: 'ADMIN_USER_LEVEL', payload: user.id })
        // dispatch({ type: 'ADMIN_FETCH_USERS' })
    }

    function deleteUser() {
        dispatch({ type: 'ADMIN_DELETE_USER', payload: user.id })
        // dispatch({ type: 'ADMIN_FETCH_USERS' })
    }

    return (
        <TableRow>
            <TableCell>
                {user.is_admin
                    ? 'Admin'
                    : 'User'}
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{(user.first_name || user.last_name)
                ? user.first_name + ' ' + user.last_name
                : 'N/A'}
            </TableCell>
            <TableCell>{(!user.phone_number || user.phone_number === '0')
                ? 'N/A'
                : user.phone_number}
            </TableCell>
            <TableCell>{user.email
                ? user.email
                : 'N/A'}
            </TableCell>
            <TableCell>{(user.street_address || user.city || user.state)
                ? (`${user.street_address} ${user.city}, ${user.state}`)
                : 'N/A'}
            </TableCell>
            <TableCell className="user-actions">
                <Button variant="contained" onClick={userLevelChange}>{user.is_admin ? 'Remove Admin' : 'Make Admin'}</Button>
                <Button variant="contained" onClick={deleteUser}>Delete</Button>
            </TableCell>
        </TableRow>
    )
}