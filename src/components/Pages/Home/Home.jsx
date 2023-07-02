import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from 'react-modal';
import './Home.css';
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";

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
                <div className="welcome-msg">
                    <h2>Welcome to the <strong>Island Lake</strong> Association Manager</h2>
                    <p>This will act as the main hub where members can vote on and make proposals<br />
                        that will help shape and govern the community you've grown to love!</p>
                </div>
                <div className="home-images">
                    <Card
                        className="img-card"
                        sx={{
                            maxWidth: 600,
                            maxHeight: 425,
                            backgroundColor: 'rgb(65, 107, 178)',
                            border: 4,
                            borderRadius: '16px',
                            borderColor: 'rgb(114, 162, 245)'
                        }}
                        elevation={6}>
                        <img src="/images/8EF5DEEC-56AE-494A-B1AD-FDE521321651_1_105_c.jpeg" />
                    </Card>
                    <Card
                        className="img-card"
                        sx={{
                            maxWidth: 600,
                            maxHeight: 425,
                            backgroundColor: 'rgb(65, 107, 178)',
                            border: 4,
                            borderRadius: '16px',
                            borderColor: 'rgb(114, 162, 245)',
                            mr: '1.5em',
                            ml: '1.5em',

                        }}
                        elevation={6}>
                        <img src="/images/Red-Cabin-Shorline.png" />
                    </Card>
                    <Card
                        className="img-card"
                        sx={{
                            maxWidth: 600,
                            maxHeight: 425,
                            backgroundColor: 'rgb(65, 107, 178)',
                            border: 4,
                            borderRadius: '16px',
                            borderColor: 'rgb(114, 162, 245)'
                        }}
                        elevation={6}>
                        <img src="/images/On_a_dock.JPG" />
                    </Card>
                </div>
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