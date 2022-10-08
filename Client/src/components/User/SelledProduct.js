import {Link, useLocation, useParams} from "react-router-dom";
import {React, useEffect, useState} from "react";
import isEmptyObject from "../../functions/isEmptyObject";
import isUndefined from "../../functions/undefined";

const SelledProduct = () => {
    const { userid } = useParams();
    const location = useLocation();
    const token = location.state;

    const [selled ,setSelled ] = useState()


    useEffect(() => {
        GetDataItem()
    }, []);



    async function GetDataItem() {
        const result = await fetch(`http://localhost:3000/auth/seller/${userid}/yourProducts/selled`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: "Bearer " + token.token.token,
                    userid: userid,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                return data;
            });

        setSelled(result);
    }


    return (
        <div>
            {isUndefined(selled) ? (
                <div>
                    <div>
                        <div >
                            Selled Item:
                            <div> {selled.map((obj) =>
                                <div key={obj.itemid} className="infoadmin">
                                    <div key={obj.itemid}>Name:{obj.name}</div>
                                    <div>Amount:{obj.amount}</div>
                                    <div>Bidderid:{obj.bidderid}</div>
                                </div>
                            )}</div>

                        </div>
                    </div>
                </div>
            )  : ( <>You do not sell product</>)
            }

        </div>
    );
};



export default SelledProduct;