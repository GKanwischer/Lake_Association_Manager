import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* contactInfoSaga(action) { // expects a user id plus { first_name, last_name, phone_number, email, street_address, state, profile_pic }
  try {
    console.log('action.payload in saga: ', action.payload);
    yield axios.put(`/api/user/contact-info/${action.payload.id}`, action.payload)
    console.log('Successful user update request');
    yield put({ type: 'FETCH_USER' })
  } catch (error) {
    console.log('Error with user update request');
  }
}

function* userSaga() {
  yield takeEvery('FETCH_USER', fetchUser);
  yield takeEvery('USER_CONTACT_INFO', contactInfoSaga)
}

export default userSaga;
