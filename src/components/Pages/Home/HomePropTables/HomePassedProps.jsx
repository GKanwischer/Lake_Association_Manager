import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
// component import
import HomePropItem from "./HomePropItem";

// This component constructs the recently passed proposals table for the home page

export default function HomePassedProps() {
    // filters out the vetoed proposals from all of the proposals
    const passedProps = useSelector(store => store.props.main.filter(prop => prop.status === 'Passed'));

    return (
        <Card
            className="recently-complete"
            elevation={6}
            sx={{
                border: 4,
                borderRadius: '16px',
                borderColor: 'rgb(114, 162, 245)'
            }}
        >
            <CardHeader
                title="Recently Passed Proposals" />
            <TableContainer
                sx={{ height: 350 }}>
                <Table
                    sx={{ height: "max-content" }}
                    stickyHeader
                    aria-label="recently passed table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 250 }}>Description</TableCell>
                            <TableCell align="center" >Proposed By</TableCell>
                            <TableCell align="center" >Date Passed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {passedProps.map(prop => <HomePropItem key={prop.id} prop={prop} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}