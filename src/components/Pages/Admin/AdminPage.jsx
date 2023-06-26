import { useEffect } from "react"
import { useDispatch } from "react-redux"

import AdminUsersTable from "./AdminTables/UsersTable/AdminUsersTable";
import AdminEventsTable from "./AdminTables/EventsTable/AdminEventsTable";
import AdminPropsTable from "./AdminTables/PropsTable/AdminPropsTable";

export default function AdminPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'ADMIN_FETCH_USERS' });
      }, []);

    return (
        <>
            <AdminUsersTable />
            <AdminEventsTable />
            <AdminPropsTable />
        </>
    )
}