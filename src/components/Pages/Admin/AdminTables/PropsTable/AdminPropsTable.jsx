import { useSelector } from "react-redux"
import AdminPropItem from "./AdminPropItem"

export default function AdminPropsTable(){
    const props = useSelector(store => store.admin.props)

    return(
        <div className="admin-props">
            <h3>All Proposals</h3>
            <table>
                <thead>
                    <tr>
                        <th>Created By</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Pass Count</th>
                        <th>Veto Count</th>
                        <th>Date Created</th>
                        <th className="user-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.map(prop => <AdminPropItem key={prop.id} prop={prop} />)}
                </tbody>
            </table>
        </div>
    )
}