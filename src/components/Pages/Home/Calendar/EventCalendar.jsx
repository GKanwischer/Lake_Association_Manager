import React from "react"; // , { useRef }
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEventModal from "./AddEventModal";

export default function EventCalendar() {
    const [modalOpen, setModalOpen] = useState(false);
    // const calendarRef = useRef(null);
    const dispatch = useDispatch();
    const events = useSelector(store => store.events);

    useEffect(() => {
        console.log('component did mount');
        dispatch({ type: 'FETCH_EVENTS' });
    }, []);

    function handleDeleteEvent(clickedInfo) {
        console.log('clicked event', clickedInfo.event);
    }

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Add Event</button>
            <section id="calendar">
                <div className="event-calendar" style={{ position: "relative", zIndex: 0 }}>
                    <FullCalendar
                        // ref = {calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'dayGridMonth,timeGridWeek,timeGridDay',
                            center: 'title',
                            right: 'prev,next today'
                        }}
                        initialView="dayGridMonth"
                        selectable={true}
                        events={events}
                        eventClick={handleDeleteEvent}
                    />
                </div>

                <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </section>
        </>
    )
}


// const onEventAdded = (event) => {
//     let calendarApi = calendarRef.current.getApi()
//     calendarApi.addEvent(event);
//     console.log('event in onEventAdded fucntion:', event);
//     dispatch({ type: 'ADD_EVENT', payload: event})
// }