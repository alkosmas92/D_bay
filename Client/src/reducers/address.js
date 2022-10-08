export default function address( state = "" , action  ){
    switch (action.type){
        case "CHANGE_address":
            return action.payload
        default:
            return state;
    }
}