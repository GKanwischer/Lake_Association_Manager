import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUsersSaga() {
    try {
        const response = yield axios.get('/admin/users');
        console.log('Successful users fetch request', response.data);
        yield put({ type: 'ADMIN_SET_USERS', payload: response.data });
    } catch (err) {
        console.log('Error with GET users request', err);
    }
}

function* adminDeleteUserSaga(action){ // expects a user id
    try {
        yield axios.delete(`/admin/user-delete/${action.payload}`);
        console.log(`Successful DELETE request of user id: ${action.payload}`);
        yield put({ type: 'ADMIN_FETCH_USERS' })
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
        yield axios.delete(`/admin/prop-delete/${action.payload}`);
        console.log(`Successful DELETE request of prop id: ${action.payload}`);
        yield put({ type: 'FETCH_PROPS' })
    } catch (error) {
        console.log(`Error with DELETE request of prop id: ${action.payload}`);
    }
}

function* adminUserLevelUpdateSage(action){
    try {
        yield axios.put(`/admin/user_level/${action.payload}`);
        console.log(`Successful UPDATE request to change the user level of user id: ${action.payload}`);
        yield put({ type: 'ADMIN_FETCH_USERS' })
    } catch (error) {
        console.log(`Error with UPDATE request to change the user level of user id ${action.payload}`);
        
    }
}

function* adminSaga(){
    yield takeEvery( 'ADMIN_FETCH_USERS' , fetchUsersSaga)
    yield takeEvery( 'ADMIN_DELETE_USER' , adminDeleteUserSaga)
    yield takeEvery( 'ADMIN_DELETE_EVENT' , adminDeleteEventSaga)
    yield takeEvery( 'ADMIN_DELETE_PROP' , adminDeletePropSaga)
    yield takeEvery( 'ADMIN_USER_LEVEL' , adminUserLevelUpdateSage)
}

export default adminSaga;