import { useSelector } from "react-redux"
import AdminPropItem from "./AdminPropItem"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

export default function AdminPropsTable() {
    const props = useSelector(store => store.admin.props)

    return (
        <div className="admin-props">
            <h3>All Proposals</h3>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Created By</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Pass Count</TableCell>
                            <TableCell>Veto Count</TableCell>
                            <TableCell>Date Created</TableCell>
                            <TableCell className="user-actions">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.map(prop => <AdminPropItem key={prop.id} prop={prop} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}