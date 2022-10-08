import {Link, useLocation, useParams} from "react-router-dom";
import {useState, useEffect, React} from "react";
import "../../styles/Admin.css";
import {useSelector} from "react-redux";
import isEmptyObject from "../../functions/isEmptyObject";
import isUndefined from "../../functions/undefined";

function EurotoInt(k){

    let length = k.length
    k=k.split("")
    k=k.splice(0,length-2);
    k = k.join("")
    k = k.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    return k
}

const InfoItem = () => {
    const location = useLocation();
    const token = location.state;
    const { userid, itemid ,countryid } = useParams();


    const [mydata ,setData ] = useState()
    const [item, setItem] = useState({});
    const [country, setCountry] = useState({});
    const [bid, setBid] = useState(0);
    const [count, setCount] = useState(0);



    useEffect(() => {
        MoreInfo(),
        CreateBid(),
        GetDataItem()
    }, []);



    async function GetDataItem() {
            const result = await fetch(`http://localhost:3000/auth/getitembyid`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        authorization: "Bearer " + token.token.token,
                        itemid: itemid,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    return data;
                });

            setData(result);
        }
    async function MoreInfo() {
        const result = await fetch(`http://localhost:3000/auth/bidder/${itemid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                authorization: "Bearer " + token.token.token,
                itemid: itemid,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            return data;
          });

        const rCountry = await fetch(`http://localhost:3000/auth/bidder/${itemid}/country`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: "Bearer " + token.token.token,
                    mycountryid: countryid,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
        setItem(result);
        setCountry(rCountry)

    }
    async function CreateBid(){
        const new_bid  = {
            "bidderid":userid,
            "itemid":itemid,
            "amount":bid,
        }


        if(bid>0) {
            const result = await fetch(
                `http://localhost:3000/auth/bidder/${itemid}/createbid`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        authorization: "Bearer " + token.token.token,
                    },
                    body: JSON.stringify(new_bid),
                }
            );

        }

        if ((Number(EurotoInt(mydata[0].buy_price)) <= bid)) {
           const new_selled ={
               "sellerid":mydata[0].sellerid,
               "name":mydata[0].name,
               "bidderid":userid,
               "itemid":itemid,
               "amount":bid,
           }

           const result = await fetch(
                `http://localhost:3000/auth/bidder/:itemid/selled`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        authorization: "Bearer " + token.token.token,
                    },
                    body: JSON.stringify(new_selled),
                }
            );

            const result1 = await fetch(`http://localhost:3000/auth/bidder/${itemid}/updatefalse`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: "Bearer " + token.token.token,
                    itemid: itemid
                },
            });
            GetDataItem();
       }
    }

function isTrue(boolean){
        return boolean;
}

    return (
        <>
        {isUndefined(mydata) ?(
        <>
        {mydata[0].active_end ? (
            <div className="main">
                {!isEmptyObject(country) ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            MoreInfo();
                            CreateBid();
                            GetDataItem();
                        }}
                    >
                        <div>
                            <div className="infoadmin">
                                <div>Name:{mydata[0].name} </div>
                                <div> {item.map((obj) =>
                                    <div key={obj.categoryid}>Category:{obj.name}</div>
                                )}</div>

                                <div>First bid:{mydata[0].first_bid} </div>
                                <div>Currently:{mydata[0].currently} </div>
                                <div>Country:{country[0].nicename} </div>
                                <div>Started:{mydata[0].started} </div>
                                <div>Ends: {mydata[0].ends} </div>
                                <div>Description:{mydata[0].description} </div>
                            </div>
                        </div>

                        <label htmlFor="buy_price">
                            Your bid
                            <input
                                id="bid"
                                value={bid}
                                placeholder="Put your bid"
                                onChange={(e) => setBid(e.target.value)}
                            />
                        </label>


                        <button type="submit"> Submit</button>
                        {(Number(EurotoInt(mydata[0].currently)) >= bid
                                ?
                                <div>

                                    <button type="submit"> Refresh</button>
                                </div>
                                :
                                <div>

                                    <button type="submit"> Refresh</button>
                                </div>
                        )}
                    </form>
                ) : (
                    <div>
                        <h1> loading... </h1>
                    </div>
                )}
            </div>
         ) : (
                 <div className="constract">
                        <h1>
                            You buy this product your bid matches with requirment amount
                        </h1>
                     <button type="submit"> Communication with Seller</button>
                 </div>
        ) } </>
        ) : (<>loading</> )}</>
    );
};

export default InfoItem;
