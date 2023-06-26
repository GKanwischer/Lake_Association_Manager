

export default function AdminPropsTable(){

    return(
        <div className="admin-props">
            <h3>All Proposals</h3>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Created By</th>
                        <th>Date Created</th>
                        <th>Status</th>
                        <th>Pass Count</th>
                        <th>Veto Count</th>
                        <th className="user-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adminProps.map(prop => <AdminPropItem key={prop.id} prop={prop} />)}
                </tbody>
            </table>
        </div>
    )
}