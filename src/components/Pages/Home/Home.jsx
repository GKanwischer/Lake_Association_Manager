import { useEffect } from "react";
import Modal from 'react-modal';
import './Home.css';

import EventCalendar from "./Calendar/EventCalendar"
import HomePassedProps from "./HomePropTables/HomePassedProps";
import HomeVetoedProps from "./HomePropTables/HomeVetoedProps";

Modal.setAppElement('#react-root');

export default function Home() {

    return (
        <div className="home-container">
            <div id="home-calendar">
                <EventCalendar />
            </div>
            <div>
                <HomePassedProps />
            </div>
            <div>
                <HomeVetoedProps />
            </div>
        </div>
    )
}