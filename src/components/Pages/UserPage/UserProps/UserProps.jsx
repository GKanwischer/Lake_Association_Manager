import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
// component imports
import UserPropItem from './UserPropItem/UserPropItem';
import AddPropModal from './AddPropModal/AddPropModal';

Modal.setAppElement('#react-root');

// component that constructs the user proposals table on the user page

export default function UserProps() {
  const dispatch = useDispatch();
  const userProps = useSelector((store) => store.props.user);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_PROPS' });
  }, []);

  return (
    <div>
      <Card
        elevation={6}
        className="user-props"
        sx={{
          border: 4,
          borderRadius: '16px',
          borderColor: 'rgb(114, 162, 245)'
        }}
      >
        <CardHeader
          title="Your Proposals"
          action={
            <Tooltip title="Add Proposal">
              <IconButton
                aria-label="add"
                onClick={() => setModalOpen(true)}>
                <AddBoxIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          }
        />
        <AddPropModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)} />
        <TableContainer
          sx={{ height: 450 }}>
          <Table
            sx={{ height: "max-content" }}
            stickyHeader
            aria-label="user proposals table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Date created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userProps.map(prop => <UserPropItem key={prop.id} prop={prop} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}