import { Action, createReducer, on, State } from "@ngrx/store";
import { AuthService } from "src/app/services/auth.service";
import { logoutUser, setUsername } from "../actions/user.actions";


const auth = new AuthService();
const init = auth.session().username;
const initialState = {username: init};

const reducer = createReducer(
    initialState,
    on(setUsername, (state, action) => {
        console.log('state', state);
        console.log('action', action);
        return {...state, username: action.username}
    }),
    on(logoutUser, (state, action) => {
        auth.unsetToken();
        return {...state, username: null}
    })
    
 );

export function userReducer (state: {username: string } | undefined, action: Action) {
    return reducer(state, action);
}