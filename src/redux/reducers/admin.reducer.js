import { combineReducers } from "redux";

// reducer to hold the front end state for all of the users that the admin sees
function adminUsersReducer(state = [], action){
    switch (action.type){
        case 'ADMIN_SET_USERS':
            return action.payload;
        default:
            return state;
    }
}

// reducer to hold the front end state for all of the proposals that the admin sees
function adminPropsReducer(state = [], action){
    switch (action.type){
        case 'ADMIN_SET_PROPS':
            return action.payload;
        default:
            return state;
    }
}

const adminReducer = combineReducers({ users: adminUsersReducer, props: adminPropsReducer})

export default adminReducer