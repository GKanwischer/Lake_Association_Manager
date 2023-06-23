import Modal from 'react-modal';
import './Home.css';

import EventCalendar from "./EventCalendar"

Modal.setAppElement('#react-root');

export default function Home() {

    return (
        <div className="home-container">
            <div id="home-calendar">
                <EventCalendar />
            </div>
            <div id="recently-passed">
                <h2>Recently Passed Proposals</h2>
            </div>
        </div>
    )
}