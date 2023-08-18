import { LOGGEDIN,LOGGEDOUT } from "../ReduxConstant";

export function loggedInSuccessfully(){
    return {
        type:LOGGEDIN
    }
}

export function loggedOutSuccessfully(){
    return {
        type:LOGGEDOUT
    }
}