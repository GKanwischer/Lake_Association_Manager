import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import moment from "moment";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

export default function AddEventModal({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState(moment().format('YYYY-MM-DDTHH:mm'));
    const [end, setEnd] = useState(moment().format('YYYY-MM-DDTHH:mm'));
    const dispatch = useDispatch();

    let eventToAdd = { title, description, start, end };

    const onSubmit = () => {
        dispatch({
            type: 'ADD_EVENT',
            payload: eventToAdd
        })
        setTitle('');
        setDescription('');
        setStart(moment().format('YYYY-MM-DDTHH:mm'));
        setEnd(moment().format('YYYY-MM-DDTHH:mm'));
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
            onClose={onClose}
        >
            <Box sx={style}>
                <div className="modal-header">
                    <h2>Add an Event</h2>
                </div>
                <input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea
                    placeholder='Proposal Description'
                    value={description}
                    rows={4}
                    cols={40}
                    onChange={e => setDescription(e.target.value)} />
                <div>
                    <label>Start Date</label>
                    <input
                        type='datetime-local'
                        value={start}
                        onChange={e => setStart(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <input
                        type='datetime-local'
                        value={end}
                        onChange={e => setEnd(e.target.value)}
                    />
                </div>
                <Button variant="contained" onClick={onSubmit}>Submit</Button>
            </Box>
        </Modal>
    )
}