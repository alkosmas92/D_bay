import {useLocation} from "react-router-dom";

const InfoSell = () =>{
    const location = useLocation();
    const token = location.state;

    return(
        <>hello</>
    )
}

export default InfoSell;