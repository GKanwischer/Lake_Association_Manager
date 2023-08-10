import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* gallerySaga(){
    yield takeEvery('FETCH_IMGS', getImagesSaga);
    yield takeEvery('FETCH_USER_IMGS', getUserImagesSaga);
    yield takeEvery('ADD_IMG', addImageSaga);
    yield takeEvery('LIKE_IMG', likeImageSaga);
    yield takeEvery('DELETE_IMG', deleteImageSaga);
}

// helps decided which fetch request needs to be triggered
function* selectImageFetch(userDisp){
    if (userDisp){
        yield put({ type: 'FETCH_USER_IMGS' })
    } else {
        yield put({ type: 'FETCH_IMGS' })
    }
}

// handles the request for getting all images from the backend and setting the reducer with those images
function* getImagesSaga(){
    try {
        const response = yield axios.get('/api/gallery');
        yield put({ type: 'SET_IMGS', payload: response.data})
    } catch (err) {
        console.log('Error with gallery get request', err);
    }
}

// handles the request for getting all user images from the backend and setting the reducer with those images
function* getUserImagesSaga(){
    try {
        const response = yield axios.get('/api/gallery/user');
        yield put({ type: 'SET_USER_IMGS', payload: response.data})
    } catch (err) {
        console.log('Error with user gallery get request', err);
    }
}

// handles the request for adding an image to the database
// function* addImageSaga(action){ // expects url, title, description, userDisp 
//     try {
//         const {userDisp} = action.payload;
//         yield axios.post('/api/gallery/add', action.payload)
//         selectImageFetch(userDisp);
//     } catch (err) {
//         console.log('Error with image post request', err);
//     }
// }

function* addImageSaga(action) {
    try {
      const { title, description, image, userDisp } = action.payload;
  
      let image_url = '';
  
      if (image !== '') {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'scbbuugt');
  
        const response = yield axios.post(
          'https://api.cloudinary.com/v1_1/lake-association-manager/image/upload',
          formData
        );
        image_url = response.data.secure_url;
      }
  
      const dbPayload = {
        title: title,
        description: description,
        url: image_url,
      };
  
      yield axios.post('/api/gallery/add', dbPayload);
      selectImageFetch(userDisp);
    } catch (err) {
      console.log('Error with image add request', err);
    }
  }

// handles the request for updating details about an image in the database
function* editImageDetailsSaga(action){ // expects imageId, url, title, description, userDisp
    try {
        const { imageId, userDisp } = action.payload
        yield axios.put(`/api/gallery/edit_details/${imageId}`, action.payload)
        selectImageFetch(userDisp);
    } catch (err) {
        console.log('Error with image details update request', err);
    }
}

// handles the request for updating the like count of an image in the database
function* likeImageSaga(action){ // expects imageId, userDisp
    try {
        const {imageId, userDisp} = action.payload
        yield axios.put(`/api/gallery/like/${imageId}`)
        selectImageFetch(userDisp);
    } catch (err) {
        console.log('Error with image like update request', err);
    }
}

// handles the request for deleting a specifed image from the database
function* deleteImageSaga(action){ // expects imageId , userDisp
    try {
        const {imageId, userDisp} = action.payload;
        yield axios.delete(`/api/gallery/delete/${imageId}`)
        selectImageFetch(userDisp)
    } catch (err) {
        console.log('Error with image delete request', err);
    }
}

export default gallerySaga;