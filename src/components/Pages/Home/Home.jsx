import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from 'react-modal';
import './Home.css';

import EventCalendar from "./Calendar/EventCalendar"
import HomePassedProps from "./HomePropTables/HomePassedProps";
import HomeVetoedProps from "./HomePropTables/HomeVetoedProps";

Modal.setAppElement('#react-root');

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PROPS' });
        dispatch({ type: 'FETCH_USER_VOTES' });
      }, []);

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