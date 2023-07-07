import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import './AdminPage.css';

// component imports
import AdminUsersTable from "./AdminTables/UsersTable/AdminUsersTable";
import AdminEventsTable from "./AdminTables/EventsTable/AdminEventsTable";
import AdminPropsTable from "./AdminTables/PropsTable/AdminPropsTable";

// this component builds and houses everything related to the admin page

export default function AdminPage() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'ADMIN_FETCH_USERS' });
        dispatch({ type: 'ADMIN_FETCH_PROPS' });
    }, []);

    return (
        <div className="admin">
            <div className="admin-header">
                <h2>Welcome Admin {loggedInUser.username}!</h2>
                <p>This page is help you manage the status of memebers, and remove any proposals <br />
                    or events that have been posted</p>
            </div>
            <AdminUsersTable />
            <AdminPropsTable />
            <AdminEventsTable />
        </div>
    )
}