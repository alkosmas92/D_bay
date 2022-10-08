export default function firstname( state = "" , action  ){
    switch (action.type){
        case "CHANGE_firstname":
            return action.payload
        default:
            return state;
    }
}



