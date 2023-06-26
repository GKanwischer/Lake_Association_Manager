import { useSelector } from "react-redux"
import AdminUserItem from "./AdminUserItem";

export default function AdminUsersTable() {
    const users = useSelector(store => store.admin_users);

    return (
        <div className="admin-users">
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
                    {users.map(user => <AdminUserItem key={user.id} user={user} />)}
                </tbody>
            </table>
        </div>
    )
}