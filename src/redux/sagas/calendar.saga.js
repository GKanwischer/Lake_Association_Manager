import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEventsSaga() {
    try {
        const response = yield axios.get('/calendar');
        console.log('Successful events fetch request', response.data);
        yield put({ type: 'SET_EVENTS', payload: response.data });
    } catch (err) {
        console.log('Error with GET events request', err);
    }
}

function* addEventSaga(action) { // expects { description, title, start, end }
    try {
        // might be unnecessary -- possibly delete later --
        // const { title, start, end } = action.payload;
        // const eventToAdd = { title, start, end };
        // console.log('(saga) event to add:', eventToAdd);
        yield axios.post('/calendar/create-event', action.payload)
        console.log('Successful event add request');
        yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
        console.log('Error adding an event', error);
    }
}

function* updateEventSaga(action) { // expects { event_id, description, title, start, end }
    try {
        yield axios.put(`/calendar/update/${action.payload.event_id}`, action.payload)
        console.log('Successful event update request');
        yield put({ type: 'FETCH_EVENTS' })
    } catch (error) {
        console.log('Error updating an event', error);
    }
}

function* deleteEvent(action) { // expects event_id
    try {
        yield axios.delete(`calendar/delete/${action.payload}`);
        console.log('Successful event delete request');
        yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
        console.log('Error deleting an event');
    }
}

function* calendarSaga() {
    yield takeEvery('FETCH_EVENTS', fetchEventsSaga)
    yield takeEvery('ADD_EVENT', addEventSaga)
    yield takeEvery('UPDATE_EVENT', updateEventSaga)
    yield takeEvery('DELETE_EVENT', deleteEvent)
}

export default calendarSaga;