export default function password_check( state = " " , action  ){
    switch (action.type){
        case "CHANGE_password_check":
            return action.payload
        default:
            return state;
    }
}