import { useSelector } from "react-redux"
import AdminUserItem from "./AdminUserItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

export default function AdminUsersTable() {
    const users = useSelector(store => store.admin.users);
    const loggedInUser = useSelector(store => store.user)

    // Filter out the loggedInUser from the users array
    const filteredUsers = users.filter(user => user.id !== loggedInUser.id);

    return (
        <div className="admin-users">
            <h2>Welcome Admin {loggedInUser.username}!</h2>
            <h3>Lake Association Members</h3>
            <Card elevation={6}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User Level</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell className="user-actions">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map(user => <AdminUserItem key={user.id} user={user} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}