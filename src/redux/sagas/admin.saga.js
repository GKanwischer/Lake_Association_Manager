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

function* adminSaga(){
    yield takeEvery( 'FETCH_ADMIN_USERS' , fetchUsersSaga)
}

export default adminSaga;