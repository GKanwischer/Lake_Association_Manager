import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// saga file to manage all of the front end request pertaining to the admin page and functionality

// saga to get all of the relevant information about all of the users
function* adminFetchUsersSaga() {
    try {
        const response = yield axios.get('/admin/users');
        // console.log('Successful users GET request for admin', response.data);
        // Set the admin.users reducer
        yield put({ type: 'ADMIN_SET_USERS', payload: response.data });
    } catch (err) {
        // console.log('Successful users GET request for admin', err);
    }
}

// saga to update the admin status of a specified user 
function* adminUserLevelUpdateSage(action){
    try {
        yield axios.put(`/admin/user_level/${action.payload}`);
        // console.log(`Successful UPDATE request to change the user level of user id: ${action.payload}`);
        // get the up-to-date information on all of the users
        yield put({ type: 'ADMIN_FETCH_USERS' })
    } catch (error) {
        // console.log(`Error with UPDATE request to change the user level of user id ${action.payload}`);
        
    }
}

// saga to delete a specified user
function* adminDeleteUserSaga(action){ // expects a user id
    try {
        yield axios.delete(`/admin/user-delete/${action.payload}`);
        // console.log(`Successful DELETE request of user id: ${action.payload}`);
        yield put({ type: 'ADMIN_FETCH_USERS' })
    } catch (error) {
        // console.log(`Error with DELETE request of user id: ${action.payload}`);
    }
}

// saga to get all of the relevant information about all of the proposals
function* adminFetchPropsSaga(){
    try {
        const response = yield axios.get('/admin/props');
        // console.log('Successful proposals GET request for admin', response.data);
        yield put({ type: 'ADMIN_SET_PROPS', payload: response.data });
    } catch (err) {
        // console.log('Error with proposals GET request for admin', err);
    }

}

// saga to delete a specified proposal
function* adminDeletePropSaga(action){ // expects a prop id
    try {
        yield axios.delete(`/admin/prop-delete/${action.payload}`);
        // console.log(`Successful DELETE request of prop id: ${action.payload}`);
        yield put({ type: 'ADMIN_FETCH_PROPS' })
    } catch (error) {
        // console.log(`Error with DELETE request of prop id: ${action.payload}`);
    }
}

// saga to delete a specified event
function* adminDeleteEventSaga(action){ // expects an event id
    try {
        yield axios.delete(`/admin/event-delete/${action.payload}`);
        // console.log(`Successful DELETE request of event id: ${action.payload}`);
        yield put({ type: 'FETCH_EVENTS' })
    } catch (error) {
        // console.log(`Error with DELETE request of event id: ${action.payload}`);
    }
}

// watcher saga for the admin related requests
function* adminSaga(){
    yield takeEvery( 'ADMIN_FETCH_USERS' , adminFetchUsersSaga)
    yield takeEvery( 'ADMIN_USER_LEVEL' , adminUserLevelUpdateSage)
    yield takeEvery( 'ADMIN_DELETE_USER' , adminDeleteUserSaga)
    yield takeEvery( 'ADMIN_FETCH_PROPS' , adminFetchPropsSaga)
    yield takeEvery( 'ADMIN_DELETE_PROP' , adminDeletePropSaga)
    yield takeEvery( 'ADMIN_DELETE_EVENT' , adminDeleteEventSaga)
}

export default adminSaga;