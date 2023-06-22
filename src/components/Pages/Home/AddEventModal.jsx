import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import moment from "moment";
// import "react-datetime/css/react-datetime.css";
import { useDispatch } from 'react-redux';

export default function AddEventModal({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(moment().format('YYYY-MM-DDTHH:mm'));
    const [end, setEnd] = useState(moment().format('YYYY-MM-DDTHH:mm'));
    const dispatch = useDispatch();

    let eventToAdd = { title, start, end };

    // console.log('Event: ', eventToAdd);

    const onSubmit = () => {
        dispatch({
            type: 'ADD_EVENT',
            payload: eventToAdd
        })
        setTitle('');
        setStart(moment().format('YYYY-MM-DDTHH:mm'));
        setEnd(moment().format('YYYY-MM-DDTHH:mm'));
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            {/* <form onSubmit={onSubmit}> */}
            <input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
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
            {/* </form> */}

        </Modal>
    )
}