import { useSelector } from "react-redux"
import AdminUserItem from "./AdminUserItem";

export default function AdminUsersTable() {
    const users = useSelector(store => store.admin.users);
    const loggedInUser = useSelector(store => store.user)

    // Filter out the loggedInUser from the users array
    const filteredUsers = users.filter(user => user.id !== loggedInUser.id);

    return (
        <div className="admin-users">
            <h2>Welcome Admin {loggedInUser.username}!</h2>
            <h3>Lake Association Members</h3>
            <table>
                <thead>
                    <tr>
                        <th>User Level</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th className="user-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => <AdminUserItem key={user.id} user={user} />)}
                </tbody>
            </table>
        </div>
    )
}