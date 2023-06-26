import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUsersSaga() {
    try {
        const response = yield axios.get('/admin/users');
        console.log('Successful users fetch request', response.data);
        yield put({ type: 'SET_ADMIN_USERS', payload: response.data });
    } catch (err) {
        console.log('Error with GET users request', err);
    }
}

function* adminDeleteUserSaga(action){ // expects a user id
    try {
        yield axios.delete(`/admin/user-delete/${action.payload}`);
        console.log(`Successful DELETE request of user id: ${action.payload}`);
        yield put({ type: 'FETCH_ADMIN_USERS' })
    } catch (error) {
        console.log(`Error with DELETE request of user id: ${action.payload}`);
    }
}

function* adminDeleteEventSaga(action){ // expects an event id
    try {
        yield axios.delete(`/admin/event-delete/${action.payload}`);
        console.log(`Successful DELETE request of event id: ${action.payload}`);
        yield put({ type: 'FETCH_EVENTS' })
    } catch (error) {
        console.log(`Error with DELETE request of event id: ${action.payload}`);
    }
}

function* adminDeletePropSaga(action){ // expects a prop id
    try {
        yield axios.delete(`/prop-delete/${action.payload}`);
        console.log(`Successful DELETE request of prop id: ${action.payload}`);
        yield put({ type: 'FETCH_PROPS' })
    } catch (error) {
        console.log(`Error with DELETE request of prop id: ${action.payload}`);
    }
}

function* adminSaga(){
    yield takeEvery( 'ADMIN_FETCH_USERS' , fetchUsersSaga)
    yield takeEvery( 'ADMIN_DELETE_USER' , adminDeleteUserSaga)
    yield takeEvery( 'ADMIN_DELETE_EVENT' , adminDeleteEventSaga)
    yield takeEvery( 'ADMIN_DELETE_PROP' , adminDeletePropSaga)
}

export default adminSaga;