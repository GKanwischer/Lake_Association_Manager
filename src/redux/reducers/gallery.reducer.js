
export default function galleryReducer(state=[], action){
    switch (action.type) {
        case 'SET_IMGS':
            return action.payload;
        default:
            return state;
    }
}