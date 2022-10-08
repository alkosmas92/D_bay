import {Link, useLocation, useParams} from "react-router-dom";
import {React, useEffect, useState} from "react";
import isEmptyObject from "../../functions/isEmptyObject";
import isUndefined from "../../functions/undefined";
import UpdateItem from "./updateItem";

const SelledProduct = () => {
    const { userid } = useParams();
    const location = useLocation();
    const token = location.state;

    const [active ,setActive ] = useState()


    useEffect(() => {
        GetActiveItem()
    }, []);



    async function GetActiveItem() {
        const result = await fetch(`http://localhost:3000/auth/seller/${userid}/yourProducts/active`, {
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

        setActive(result.ActiveRows);

    }


    return (
        <div>
            {isUndefined(active) ? (
                <div>
                    <div> {active.map((obj , index) =>
                        <div key={obj.itmeid} className="infoadmin">
                            <div>Name:{active[index].name} </div>
                            <div>First bid:{active[index].first_bid} </div>
                            <div>Currently:{active[index].currently} </div>
                            <div>Will Start:{active[index].started}</div>
                            <div>Will Ends:{active[index].ends}</div>
                            <div>Description:{active[index].description} </div>
                        </div>
                    )}
                    </div>
                </div>
            )  : ( <>You do not have active product</>)
            }

        </div>
    );
};



export default SelledProduct;