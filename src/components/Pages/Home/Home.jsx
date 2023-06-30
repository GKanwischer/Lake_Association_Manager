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
            <div className="home-top">
                <div id="welcome-msg">
                    <h2>Welcome to the <strong>Island Lake</strong> Association Manager</h2>
                    <p>This will act as the main hub where members can vote on and make proposals<br />
                        that will help shape and govern the community you've grown to love!</p>
                </div>
                <img src="/Users/Kandyman/Documents/EDA/Tier_3/Solo_Project/Lake_Association_Manager/public/images/8EF5DEEC-56AE-494A-B1AD-FDE521321651_1_105_c.jpeg"/>

            </div>
            <div className="home-bottom">
                <div className="home-calendar">
                    <EventCalendar />
                </div>
                <div className="home-props">
                    <HomePassedProps />
                    <HomeVetoedProps />
                </div>
            </div>
        </div>
    )
}