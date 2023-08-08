import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* gallerySaga(){
    yield takeEvery('FETCH_IMGS', getImagesSaga);
    yield takeEvery('ADD_IMG', addImageSaga);
    yield takeEvery('LIKE_IMG', likeImageSaga);
    yield takeEvery('DELETE_IMG', deleteImageSaga);
}

function* getImagesSaga(){
    try {
        const response = yield axios.get('/api/gallery');
        yield put({ type: 'SET_IMGS', payload: response.data})
    } catch (err) {
        console.log('Error with gallery get request', err);
    }
}

function* addImageSaga(action){ // expects url, title, description 
    try {
        yield axios.post('/api/gallery/add', action.payload)
        yield put ({ type: 'FETCH_IMGS'})
    } catch (err) {
        console.log('Error with image post request', err);
    }
}

function* likeImageSaga(action){ // expects imageId
    try {
        yield axios.put(`/api/gallery/like/${action.payload}`)
        yield put({ type: 'FETCH_IMGS' })
    } catch (err) {
        console.log('Error with image update request', err);
    }
}

function* deleteImageSaga(action){ // expects imageId
    try {
        yield axios.delete(`/api/gallery/delete/${action.payload}`)
        yield put({ type: 'FETCH_IMGS' })
    } catch (err) {
        console.log('Error with image delete request', err);
    }
}

export default gallerySaga;