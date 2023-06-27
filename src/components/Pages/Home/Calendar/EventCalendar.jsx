import React from "react"; // , { useRef }
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";


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
                        eventDidMount={(info) => {
                            let selectedEvent = (events.filter(event => event.id === Number(info.event.id)))
                            return new bootstrap.Popover(info.el, {
                                title: info.event.title,
                                placement: "auto",
                                trigger: "hover",
                                customClass: "popoverStyle",
                                content:
                                    `<div>
                                        <span>Start: ${moment(info.event.start).format('LLL')}</span>
                                        <p>End: ${moment(info.event.end).format('LLL')}</p>
                                        <p>${selectedEvent[0].description}</p>
                                    </div>`,
                                html: true,
                            })
                        }}
                    />
                </div>
            </section>
        </>
    )
}
