import { useSelector } from "react-redux";
import HomePropItem from "./HomePropItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";

export default function HomeVetoedProps() {
    const vetoedProps = useSelector(store => store.props.main.filter(prop => prop.status === 'Vetoed'));


    return (
        <Card className="recently-complete" elevation={6}>
            <CardHeader
                title="Recently Vetoed Proposals" />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 700 }}>Description</TableCell>
                            <TableCell>Proposed By</TableCell>
                            <TableCell>Date Vetoed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vetoedProps.map(prop => <HomePropItem key={prop.id} prop={prop} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}