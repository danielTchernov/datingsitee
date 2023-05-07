import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";
import ISuccesfullLoginData from "../models/ISuccesfullLoginData";

const appStateInitialValue = new AppState();

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState = {userDetails:{id:0 , age:0 , gender:"" , nickName:""}}, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.setUserDetails:
            let successfulLogin:ISuccesfullLoginData = action.payload.successfulLoginResponse;
            newAppState.userDetails = successfulLogin;
            break;
    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}