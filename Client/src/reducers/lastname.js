export default function lastname( state = "" , action  ){
    switch (action.type){
        case "CHANGE_LASTNAME":
            return action.payload
        default:
            return state;
    }
}