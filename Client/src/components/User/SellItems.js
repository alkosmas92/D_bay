import {Link, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
const SellItems = () => {
    const location = useLocation();
    const token = location.state;
    return(
        <div>
            <form
                className="sign-form"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Link to={`/bidder/items`} token={token}>
                    <button type="submit">Buy products</button>
                </Link>
                <Link to={`/bidder/items `} token={token}>
                    <button type="submit"> Sell your products</button>
                </Link>
            </form>
        </div>
    );
};



import { useSelector } from "react-redux";

export default SellItems;
