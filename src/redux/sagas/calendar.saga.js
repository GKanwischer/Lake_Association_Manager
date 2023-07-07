import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// saga file to manage all of the front end request pertaining to the community events

// saga to get all of the relevant information about all of the events
function* fetchEventsSaga() {
    try {
        const response = yield axios.get(`/calendar/`);
        // console.log('Successful GET events request', response.data);
        // set the events into the calendar reducer
        yield put({ type: 'SET_EVENTS', payload: response.data });
    } catch (err) {
        // console.log('Error with GET events request', err);
    }
}

// saga to post a new event
function* addEventSaga(action) { // expects { description, title, start, end }
    try {
        yield axios.post('/calendar/create-event', action.payload)
        // console.log('Successful event add request');
        // get the up-to-date information on events
        yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
        // console.log('Error adding an event', error);
    }
}

// saga to update information about a specified event
function* updateEventSaga(action) { // expects { event_id, description, title, start, end }
    try {
        yield axios.put(`/calendar/update/${action.payload.event_id}`, action.payload)
        // console.log('Successful event update request');
        // get the up-to-date information on events
        yield put({ type: 'FETCH_EVENTS' })
    } catch (error) {
        // console.log('Error updating an event', error);
    }
}

// saga to delete a specified event
function* deleteEvent(action) { // expects event_id
    try {
        yield axios.delete(`calendar/delete/${action.payload}`);
        // console.log('Successful event delete request');
        // get the up-to-date information on events
        yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
        // console.log('Error deleting an event');
    }
}

// watcher saga for the event related requests
function* calendarSaga() {
    yield takeEvery('FETCH_EVENTS', fetchEventsSaga)
    yield takeEvery('ADD_EVENT', addEventSaga)
    yield takeEvery('UPDATE_EVENT', updateEventSaga)
    yield takeEvery('DELETE_EVENT', deleteEvent)
}

export default calendarSaga;