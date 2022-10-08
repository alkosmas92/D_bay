export default function afm( state = "" , action  ){
    switch (action.type){
        case "CHANGE_afm":
            return action.payload
        default:
            return state;
    }
}