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
            <h3>Lake Association Members</h3>
            <Card elevation={6}>
                <TableContainer
                    sx={{ height: 450 }}
                >
                    <Table
                        sx={{ height: "max-content" }}
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{maxWidth: 140}}>User Level</TableCell>
                                <TableCell align="center" sx={{maxWidth: 150}}>Username</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center" sx={{maxWidth: 120, padding: 0}}>Phone Number</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell align="center" sx={{maxWidth: 70, padding: 0}}></TableCell>
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