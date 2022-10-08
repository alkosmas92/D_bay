import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/Admin.css";


const InfoAdmin = () => {
  const location = useLocation();
  const token = location.state;
  const [userdata, setUserdata] = useState({});



  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }

  useEffect(() => {
    getData();
    userAuthentication()
  }, []);
  let BearerToken = "Bearer " + token.token.token;

  async function getData() {
    const result = await fetch(`http://localhost:3000/admin/users`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: BearerToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
   await setUserdata(result);

  }

  async function userAuthentication(user) {
    if (user != undefined) {

      const result = await fetch(`http://localhost:3000/admin/users/${user.userid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: BearerToken,
        },
      });
    }
  }



  return (
    <div className="main">
      {!isEmptyObject(userdata) ? (

          <div>
            {userdata.map((user) => (
              <div key={user.userid} className="infoadmin">
                <div> Firstname: {user.firstname}</div>
                <div> Lastname: {user.lastname}</div>
                <div> Username: {user.username}</div>
                <div> Email:{user.email} </div>
                <div> Userid:{user.userid}</div>
                 <div> Address: {user.address}</div>
                <div> Telephone: {user.telephone}</div>
                <div> Afm: {user.afm}</div>
                <div> Active: {!user.active ? <div>false </div>: <div>true</div>}</div>
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      userAuthentication(user);
                    }}
                >
                  <button type="submit"> Authedicated this User {user.username}</button>
                </form>
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

export default InfoAdmin;
