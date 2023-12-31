import { useSelector } from "react-redux"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";

// component import
import AdminUserItem from "./AdminUserItem";

// this component constructs the users table for the admin page

export default function AdminUsersTable() {
    const users = useSelector(store => store.admin.users);
    const loggedInUser = useSelector(store => store.user)

    // Filter out the loggedInUser from the users array
    const filteredUsers = users.filter(user => user.id !== loggedInUser.id);

    return (
        <div className="admin-users">
            <Card
                elevation={6}
                sx={{
                    border: 4,
                    borderRadius: '16px',
                    borderColor: 'rgb(114, 162, 245)'
                }}
            >
                <CardHeader title="Lake Association Members" />
                <TableContainer
                    sx={{ height: 450 }}
                >
                    <Table
                        sx={{ height: "max-content" }}
                        stickyHeader
                        aria-label="admin user table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ maxWidth: 140 }}>User Level</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 150 }}>Username</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 120, padding: 0 }}>Phone Number</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center" >Address</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 70, padding: 0 }}></TableCell>
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