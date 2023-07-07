import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// saga file to manage all of the front end request pertaining to proposals

// saga to get all of the relevant information about all of the proposals
function* fetchAllPropsSaga() {
    try {
        const response = yield axios.get('/proposals/main');
        // console.log('Successful GET request for all proposals', response);
        // set hte props.main reducer
        yield put({ type: 'SET_PROPS', payload: response.data });
    } catch (error) {
        // console.log('Error with GET request for all proposals');
    }
}

// saga to post a new proposal
function* addPropSaga(action) { // expects { description }
    try {
        yield axios.post('/proposals/add', action.payload);
        // console.log('Succesful POST request for adding a proposal');
        // get the up-to-date information on proposals
        yield put({ type: 'FETCH_USER_PROPS' });
    } catch (error) {
        // console.log('Error with POST request for adding proposal');
    }
}

// saga to get all of the proposals for the logged in user
function* fetchUserPropSaga() {
    try {
        const response = yield axios.get('/proposals/user');
        // console.log('Successful GET request for user proposals');
        // set the props.user reducer
        yield put({ type: 'SET_USER_PROPS', payload: response.data })
    } catch (error) {
        // console.log('Error with GET request for user proposals');
    }
}

// saga to delete a specific proposal created by the logged in user
function* deletePropSaga(action) { // expects { proposal_id }
    try {
        yield axios.delete(`proposals/delete/${action.payload}`);
        // console.log('Successful DELETE request for a user proposal');
        // get the up-to-date information on user proposals
        yield put({ type: 'FETCH_USER_PROPS' });
    } catch (error) {
        // console.log('Error with DELETE request for a user proposal');
    }
}

// saga to get all of the votes on proposals made by the logged in user
function* fetchUserVoteSaga() {
    try {
        const response = yield axios.get('/proposals/user-vote');
        // console.log('Successful GET request for user votes', response);
        // set the props.user_votes
        yield put({ type: 'SET_USER_VOTES', payload: response.data });
    } catch (error) {
        // console.log('Error with GET request for user votes');
    }
}

// saga to post a vote on a specified proposal by the logged in user
function* castVoteSaga(action) { // expects { proposal_id and vote(true = pass, false = veto)}
    try {
        yield axios.post('proposals/vote', action.payload);
        // console.log('Success POST request for casting vote');
        // get the up-to-date information on user's votes
        yield put({ type: 'FETCH_USER_VOTES' })
    } catch (error) {
        // console.log('Error with POST request for casting vote');
    }
}

// saga update the logged in user's vote on a specific proposal
function* updateVoteSaga(action) { // expects { payload_id, vote }
    try {
        yield axios.put(`/proposals/update-vote`, action.payload)
        // console.log('Successful PUT request for updating proposal vote');
        // get the up-to-date information on user's votes
        yield put({ type: 'FETCH_USER_VOTES' })
    } catch (error) {
        // console.log('Error with PUT request for updating proposal vote');
    }
}

// watcher saga for the proposal related requests
function* proposalsSaga() {
    yield takeEvery('FETCH_PROPS', fetchAllPropsSaga)
    yield takeEvery('ADD_PROP', addPropSaga)
    yield takeEvery('FETCH_USER_PROPS', fetchUserPropSaga)
    yield takeEvery('CAST_VOTE', castVoteSaga)
    yield takeEvery('DELETE_USER_PROP', deletePropSaga)
    yield takeEvery('FETCH_USER_VOTES', fetchUserVoteSaga)
    yield takeEvery('UPDATE_VOTE', updateVoteSaga)
}

export default proposalsSaga;