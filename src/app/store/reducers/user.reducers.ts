import { Action, createReducer, on, State } from "@ngrx/store";
import { AuthService } from "src/app/services/auth.service";
import { logoutUser, setUserData } from "../actions/user.actions";

const auth = new AuthService();
const {username,email, role} = auth.session();
const init = {username, email, role };
const initialState = {user: init};

const reducer = createReducer(
    initialState,
    on(setUserData, (state, action) => {
        console.log('state', state);
        console.log('action', action);
        return {...state, user: action.user}
    }),
    on(logoutUser, (state, action) => {
        auth.unsetToken();
        return {...state, user: {username: null, email: null, role: null}}
    })
    
 );

export function userReducer (state: {user: {username: string, email: string, role: string} } | undefined, action: Action) {
    return reducer(state, action);
}