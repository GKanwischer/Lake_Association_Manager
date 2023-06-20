import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllPropsSaga(){
    try {
        const response = yield axios.get('/proposals/main');
        console.log('GETing all of the proposals', response);
        yield put({ type: 'SET_PROPS', payload: response.data});
    } catch (error) {
        console.log('Error GETing all proposals');
    }
}

function addPropSaga(action){ // 
    try {
        yield axios.post('/proposals/add', action.payload);
        console.log('Succesfully added proposal');
        yield put({ type: 'FETCH_PROPS' });
    } catch (error) {
        console.log('Error adding proposal');
    }
}

function* fetchUserPropSaga(){
    try {
        const response = yield axios.get('/proposals/user');
        console.log('GETing all of the proposals for the logged-in user', response);
        yield put({ type: 'SET_USER_PROPS', payload: response.data })
    } catch (error) {
        console.log('Error GETing all proposals for the logged-in user');
    }
}

function* castVoteSaga(action){ // expects { proposal_id and vote(true = pass, false = veto)}
    try {
        yield axios.post('proposals/vote', action.payload);
        console.log('Success casting vote');
    } catch (error) {
        console.log('Error casting vote');
    }
}

function* deletePropSaga(action){ // expects proposal_id
    try {
        yield axios.delete(`proposals/delete/${action.payload}`);
        console.log('Successful delete request');
        yield put({ type: 'FETCH_USER_PROPS' });
    } catch (error) {
        console.log('Error deleting proposal');
        
    }
}

function* proposalsSaga(){
    yield takeEvery( 'FETCH_PROPS', fetchAllPropsSaga )
    yield takeEvery( 'ADD_PROP', addPropSaga)
    yield takeEvery( 'FETCH_USER_PROPS', fetchUserPropSaga)
    yield takeEvery( 'CAST_VOTE', castVoteSaga)
    yield takeEvery( 'DELETE_USER_PROP', deletePropSaga);
}

export default proposalsSaga;