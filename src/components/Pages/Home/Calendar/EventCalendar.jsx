import React from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

// This component constructs the calendar (FullCalendar.io) for the home page

export default function EventCalendar() {
    const dispatch = useDispatch();
    const events = useSelector(store => store.events);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENTS' });
    }, []);

    return (
        <div 
        className="event-calendar" 
        id="calendar" 
        style={{ position: "relative", zIndex: 0 }}>
            <Card
                elevation={6}
                className="event-card"
                sx={{
                    maxHeight: 900,
                    border: 4,
                    borderRadius: '16px',
                    borderColor: 'rgb(114, 162, 245)'
                }}
            >
                <CardHeader
                    title="Community Events"
                />
                <FullCalendar
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
                        // This single line allows me to get additional information (that the calendar doesn't hold locally) from the database 
                        // about each event for interaction purposes. It finds the id of the selected (locally stored) event and matches it 
                        // with it's corresponding event in the db. Then stores all of the info from the db into the selectedEvent variable.
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
            </Card>
        </div>
    )
}
