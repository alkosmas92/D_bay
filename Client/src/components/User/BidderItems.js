import "../../styles/BidderItem.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {Link, useLocation, useParams} from "react-router-dom";
const BidderItems = () => {
  const [item, setItem] = useState({});
  const { userid } = useParams();
  const location = useLocation();
  const token = location.state;


  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }

  useEffect(() => {
     getData();
    MoreInfo()
  }, []);


  async function getData() {
    const result = await fetch(`http://localhost:3000/auth/bidder/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
         authorization: "Bearer " + token.token.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    await setItem(result.ActiveRows);
  }

  async function MoreInfo(user) {

    if (user != undefined) {
      const result = await fetch(`http://localhost:3000/auth/bidder/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: "Bearer " + token.token.token,
          itemid: user.itemid,
        },
      })
          .then((res) => res.json())
          .then((data) => {
            return data;
          });
    }
  }

  return (
    <div className="main">
      {!isEmptyObject(item) ? (
          <div className="infoItems">
            {item.map((user) => (
              <div key={user.itemid}>
                <div className="item">
                  <div>Name Product:{user.name}</div>
                  <form
                      onSubmit={(e) => {
                        e.preventDefault();

                        MoreInfo(user);
                      }}
                 >

                    <Link

                        to={`/auth/bidder/${userid}/${user.countryid}/items/${user.itemid}`}
                        state={token}
                    >

                      <button type="submit"> More Info {user.name}</button>
                    </Link>
                  </form>
                </div>
              </div>
            ))}
          </div>
      ) : (
        <div>
          <h1> loading... </h1>
        </div>
      )}
    </div>
  );
};

export default BidderItems;
