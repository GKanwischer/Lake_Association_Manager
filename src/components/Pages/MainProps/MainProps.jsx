import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

import MainPropItem from "./MainPropItem/MainPropItem";

export default function MainProps() {
    const inProgressProps = useSelector(store => store.props.main.filter(prop => prop.status === 'In Progress'));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PROPS' });
        dispatch({ type: 'FETCH_USER_VOTES' });
    }, []);

    return (
        <div className="main-props">
            <h2>In Progress Proposals</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Proposed By</TableCell>
                            <TableCell>Vote</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inProgressProps.map(prop => <MainPropItem key={prop.id} prop={prop} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}