export default function telephone( state = "" , action  ){
    switch (action.type){
        case "CHANGE_telephone":
            return action.payload
        default:
            return state;
    }
}