import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* gallerySaga(){
    yield takeEvery('FETCH_IMAGES', getImagesSaga);
    yield takeEvery('ADD_IMAGE', addImageSaga)

}

function* getImagesSaga(){
    try {
        const response = yield axios.get('/api/gallery');
        yield put({ type: 'SET_IMAGES', payload: response.data})
    } catch (error) {
        console.log('Error with gallery get request');
    }
}

function* addImageSaga(action){
    try {
        yield axios.post('/api/gallery', action.payload)
        yield put ({ type: 'FETCH_IMAGES'})
    } catch (err) {
        console.log('Error with image post request');
    }
}

export default gallerySaga;