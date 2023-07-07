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
import AdminPropItem from "./AdminPropItem"

// this component constructs the proposals table for the admin page

export default function AdminPropsTable() {
    const props = useSelector(store => store.admin.props)

    return (
        <div className="admin-props">
            <Card
                elevation={6}
                sx={{
                    border: 4,
                    borderRadius: '16px',
                    borderColor: 'rgb(114, 162, 245)'
                }}
            >
                <CardHeader title="All Proposals" />
                <TableContainer
                    sx={{ height: 525, minWidth: 100 }}
                >
                    <Table
                        sx={{ height: "max-content" }}
                        stickyHeader
                        aria-label="admin proposals table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ maxWidth: 120 }}>Created By</TableCell>
                                <TableCell sx={{ minWidth: 500 }}>Description</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 110 }}>Status</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 60 }}>Pass</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 60 }}>Veto</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 130 }}>Date Created</TableCell>
                                <TableCell align="center" sx={{ maxWidth: 60 }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.map(prop => <AdminPropItem key={prop.id} prop={prop} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}