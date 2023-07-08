import React from "react";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';

// simple function that handles the modal pop up on how to key a registration key

export default function RegisterKeyModal({ isOpen, onClose }) {

    const style = {
        position: 'absolute',
        top: '20%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
        width: 475,
        bgcolor: 'background.paper',
        border: 4,
        borderRadius: '16px',
        borderColor: 'rgb(114, 162, 245)',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Box sx={style}>
                <div className="modal-header">
                    <h2>Need a Key?</h2>
                </div>
                <p>Please contact one of our board members to verify you belong to this association.
                    If so you can recieve a key by emailing them at <strong>LakeViewAssociation@gmail.com</strong>
                </p>

            </Box>
        </Modal>
    )
}