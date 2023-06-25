import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import moment from "moment";
// import "react-datetime/css/react-datetime.css";
import { useDispatch } from 'react-redux';

export default function AddEventModal({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState(moment().format('YYYY-MM-DDTHH:mm'));
    const [end, setEnd] = useState(moment().format('YYYY-MM-DDTHH:mm'));
    const dispatch = useDispatch();

    let eventToAdd = { title, description, start, end };

    // console.log('Event: ', eventToAdd);

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
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea 
            placeholder='Proposal Description'
            value={description}
            rows={4}
            cols={40}
            onChange={e => setDescription(e.target.value)}/>
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
            <button onClick={onSubmit}>Add Event</button>
        </Modal>
    )
}