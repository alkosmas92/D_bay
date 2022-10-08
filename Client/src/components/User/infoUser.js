import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";



const InfoUser = () => {
  const location = useLocation();
  const [userdata, setUserdata] = useState({});
  const { from } = location.state;
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }

  let count = 0;

  useEffect(() => {
    getData();
  }, []);
  let BearerToken = "Bearer " + from.token;


  async function getData() {
    const result = await fetch(`http://localhost:3000/api/user`, {
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
    setUserdata(result);
  }
  return (
    <div>
      {!isEmptyObject(userdata) ? (
        <div>
          {userdata.status ? (
            <div>
              <div>
                Hello i am user with this email:
                {userdata.data.email}
              </div>
              <div>Hello i am user_id :{userdata.data.userid}</div>
            </div>
          ) : (
            <div>waiting authentication from admin</div>
          )}
        </div>
      ) : (
        <div>
          <h1> loading... </h1>
        </div>
      )}
    </div>
  );
};

export default InfoUser;
