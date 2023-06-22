import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllPropsSaga() {
    try {
        const response = yield axios.get('/proposals/main');
        console.log('Successful GET request for all proposals', response);
        yield put({ type: 'SET_PROPS', payload: response.data });
    } catch (error) {
        console.log('Error with GET request for all proposals');
    }
}

function* addPropSaga(action) { // 
    try {
        yield axios.post('/proposals/add', action.payload);
        console.log('Succesful POST request for adding a proposal');
        yield put({ type: 'FETCH_USER_PROPS' });
    } catch (error) {
        console.log('Error with POST request for adding proposal');
    }
}

function* fetchUserPropSaga() {
    try {
        const response = yield axios.get('/proposals/user');
        console.log('Successful GET reqyest for user proposals');
        yield put({ type: 'SET_USER_PROPS', payload: response.data })
    } catch (error) {
        console.log('Error with GET request for user proposals');
    }
}

function* castVoteSaga(action) { // expects { proposal_id and vote(true = pass, false = veto)}
    try {
        yield axios.post('proposals/vote', action.payload);
        console.log('Success POST request for casting vote');
    } catch (error) {
        console.log('Error with POST request for casting vote');
    }
}

function* deletePropSaga(action) { // expects proposal_id
    try {
        yield axios.delete(`proposals/delete/${action.payload}`);
        console.log('Successful DELETE request for a user proposal');
        yield put({ type: 'FETCH_USER_PROPS' });
    } catch (error) {
        console.log('Error with DELETE request for a user proposal');
    }
}

function* fetchUserVoteSaga(){
    try {
        const response = yield axios.get('/proposals/user-vote');
        console.log('Successful GET request for user votes', response);
        yield put({ type: 'SET_PROPS', payload: response.data });
    } catch (error) {
        console.log('Error with GET request for user votes');
    }
}

function* updateVoteSaga(){
    try {
        yield axios.put(`/proposals/update-vote`, action.payload)
        console.log('Successful PUT request for updating proposal vote');
        yield put({ type: 'FETCH_PROPS' })
      } catch (error) {
        console.log('Error with PUT request for updating proposal vote');
      }
}


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