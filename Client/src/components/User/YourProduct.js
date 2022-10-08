import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const YourProduct = () => {
    const { userid } = useParams();
    const location = useLocation();
    const token = location.state;



    return (
        <div>
            <div>Update your active product
                <Link to={`/auth/seller/${userid}/yourProducts/prossesing`} state={token}>
                    <button type="submit">Under prossesing Products</button>
                </Link>
            </div>

            <div>
                Your selled product
                <Link to={`/auth/seller/${userid}/yourProducts/activeProducts`} state={token}>
                    <button type="submit"> Active Products</button>
                </Link>
            </div>

            <div>
                Your selled product
                <Link to={`/auth/seller/${userid}/yourProducts/selled`} state={token}>
                    <button type="submit"> Selled Products</button>
                </Link>
            </div>
            <div>
                Your Buy product
                <Link to={`/auth/seller/${userid}/yourProducts/buy`} state={token}>
                    <button type="submit"> Buy Products</button>
                </Link>
            </div>

        </div>
    );
};



export default YourProduct;