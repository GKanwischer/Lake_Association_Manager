
export default function adminUsersReducer(state = [], action){
    switch (action.type){
        case 'ADMIN_SET_USERS':
            return action.payload;
        default:
            return state;
    }
}