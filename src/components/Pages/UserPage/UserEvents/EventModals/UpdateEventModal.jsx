import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch } from 'react-redux';

export default function UpdateEventModal({ isOpen, onClose, event }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const dispatch = useDispatch();

    // console.log('Event to update: ', event);

    useEffect(() => {
        setTitle(event.title || '');
        setDescription(event.description || '');
        setStart(moment(event.start).format('YYYY-MM-DDTHH:mm') || moment().format('YYYY-MM-DDTHH:mm'));
        setEnd(moment(event.end).format('YYYY-MM-DDTHH:mm') || moment().format('YYYY-MM-DDTHH:mm'));
    }, [event]);

    const handleStartChange = (e) => {
        const formattedStart = moment(e.target.value).format('YYYY-MM-DDTHH:mm');
        setStart(formattedStart);
    };

    const handleEndChange = (e) => {
        const formattedEnd = moment(e.target.value).format('YYYY-MM-DDTHH:mm');
        setEnd(formattedEnd);
    };

    const onUpdate = () => {
        const eventToUpdate = {
            event_id: event.id,
            title,
            description,
            start,
            end
        };

        dispatch({
            type: 'UPDATE_EVENT',
            payload: eventToUpdate
        })
        setTitle('');
        setDescription('');
        setStart(moment().format('YYYY-MM-DDTHH:mm'));
        setEnd(moment().format('YYYY-MM-DDTHH:mm'));
        onClose();
    }


    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div>
                <input
                    placeholder="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    placeholder='Proposal Description'
                    value={description}
                    rows={4}
                    cols={40}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Start Date</label>
                <input
                    type='datetime-local'
                    value={start}
                    onChange={handleStartChange}
                />
            </div>
            <div>
                <label>End Date</label>
                <input
                    type='datetime-local'
                    value={end}
                    onChange={handleEndChange}
                />
            </div>
            <button onClick={onUpdate}>Update Event</button>
        </Modal>
    )
}