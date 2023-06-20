
export default function calendarReducer( state = [], action){
    switch (action.type){
        case 'SET_EVENTS':
            return action.payload;
        default:
            return state;
    }
}