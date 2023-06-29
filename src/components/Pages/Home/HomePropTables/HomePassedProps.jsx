import { useSelector } from "react-redux";
import HomePropItem from "./HomePropItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

export default function HomePassedProps() {
    const passedProps = useSelector(store => store.props.main.filter(prop => prop.status === 'Passed'));

    return (
        <div>
            <h2>Recently Passed Proposals</h2>
            <Card id="recently-complete" elevation={6}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{minWidth: 700}}>Description</TableCell>
                                <TableCell>Proposed By</TableCell>
                                <TableCell>Date Passed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {passedProps.map(prop => <HomePropItem key={prop.id} prop={prop} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}