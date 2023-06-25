import React from "react"; // , { useRef }
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EventCalendar() {
    const dispatch = useDispatch();
    const events = useSelector(store => store.events);

    useEffect(() => {
        console.log('component did mount');
        dispatch({ type: 'FETCH_EVENTS' });
    }, []);

    return (
        <>
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
                    />
                </div>
            </section>
        </>
    )
}
