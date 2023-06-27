import { combineReducers } from "redux";

function adminUsersReducer(state = [], action){
    switch (action.type){
        case 'ADMIN_SET_USERS':
            return action.payload;
        default:
            return state;
    }
}

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