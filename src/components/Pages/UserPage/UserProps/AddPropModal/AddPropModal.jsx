import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

export default function AddPropModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const [descriptInput, setDescriptInput] = useState('');

    function submitProposal() {
        dispatch({ type: 'ADD_PROP', payload: { description: descriptInput } })
        setDescriptInput('');
        onClose();
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <Modal
            open={isOpen}
            // shouldCloseOnOverlayClick={true}
            onClose={onClose}
        >
            <Box sx={style}>
                <div className="modal-header">
                    <h2>Add a Proposal</h2>
                </div>
                <div className="modal-body">
                    <textarea
                        placeholder='Proposal Description'
                        value={descriptInput}
                        rows={4}
                        cols={40}
                        onChange={e => setDescriptInput(e.target.value)} />
                    <Button variant="contained" onClick={submitProposal}>Submit</Button>
                </div>
            </Box>
        </Modal>
    )
}