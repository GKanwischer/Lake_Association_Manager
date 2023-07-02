import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import './MainProps.css';

import MainPropItem from "./MainPropItem/MainPropItem";

export default function MainProps() {
    const inProgressProps = useSelector(store => store.props.main.filter(prop => prop.status === 'In Progress'));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PROPS' });
        dispatch({ type: 'FETCH_USER_VOTES' });
    }, []);

    return (
        <div className="prop-component">
            <div className="prop-header">
                <h2>Active Proposals</h2>
                <p>Please take a few moments to either cast or <br />
                    update your vote on our current proposals</p>
            </div>
            <Card
                className="main-props"
                elevation={6}
                sx={{
                    maxWidth: 1 / 1,
                    border: 4,
                    borderRadius: '16px',
                    borderColor: 'rgb(114, 162, 245)'
                }}
            >
                <TableContainer
                    sx={{ height: 700 }}
                >
                    <Table
                        sx={{ height: "max-content" }}
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ minWidth: 500 }}>Description</TableCell>
                                <TableCell align="left" >Proposed By</TableCell>
                                <TableCell align="left" >Vote</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inProgressProps.map(prop => <MainPropItem key={prop.id} prop={prop} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )

}