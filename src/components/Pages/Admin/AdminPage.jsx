import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import './AdminPage.css';

import AdminUsersTable from "./AdminTables/UsersTable/AdminUsersTable";
import AdminEventsTable from "./AdminTables/EventsTable/AdminEventsTable";
import AdminPropsTable from "./AdminTables/PropsTable/AdminPropsTable";

export default function AdminPage() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'ADMIN_FETCH_USERS' });
        dispatch({ type: 'ADMIN_FETCH_PROPS' });
    }, []);

    return (
        <div className="admin">
            <h2>Welcome Admin {loggedInUser.username}!</h2>
            <AdminUsersTable />
            <AdminPropsTable />
            <AdminEventsTable />
        </div>
    )
}