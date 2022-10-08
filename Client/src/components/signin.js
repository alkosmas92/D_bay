import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import changeEmailSignIn from "../actionsCreators/changeEmailSignIn";
import changePasswordSignIn from "../actionsCreators/changePasswordSignIn";
import changeToken from "../actionsCreators/changeToken"
import { Link } from "react-router-dom";
import { checkAdmin } from "../functions/checkAdmin";
import isEmptyString from "../functions/isEmptyString";


const Signin = () => {
  // const emailSignIn = useSelector(({ emailSignIn }) => emailSignIn);
  // const passwordSingIn = useSelector((state) => state.passwordSingIn);

  const dispatch = useDispatch();
  const [token, setToken] = useState([]);
  const [IsAdmin, setFlagadmin] = useState(1);
  const [userid ,setUserid] = useState("");
  const [active ,setActive] = useState(false);
  const [emailSignIn , setEmailSignIn] = useState("")
  const [passwordSingIn , setPasswordSingIn] = useState("")


  useEffect(() => {
    requestUser();
  }, []);

  async function requestUser() {
    const us = {
      "username": emailSignIn,
      "password": passwordSingIn,
    };
    setUserid("")
    const result = await fetch(`http://localhost:3000/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(us),
    });
    const resultInJson = await result.json();

    if( resultInJson.token != null) {
      dispatch(changeToken(resultInJson.token));
      setToken(resultInJson.token)
    }
    setActive(resultInJson.active);
    setFlagadmin(checkAdmin(emailSignIn, passwordSingIn));
    setUserid(resultInJson.userid);
  }

  return (

      <div>
        {!isEmptyString(token) ? (
            <div>
              <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    requestUser();
                  }}
              >
                <label htmlFor="emailSignIn">
                  Username
                  <input
                      id="emailSignIn"
                      value={emailSignIn}
                      placeholder="email"
                      onChange={(e) => setEmailSignIn(e.target.value)}
                  />
                </label>{" "}
                <label htmlFor="passwordSingIn">
                  Password
                  <input
                      id="password"
                      type="password"
                      value={passwordSingIn}
                      placeholder="password"
                      onChange={(e) => setPasswordSingIn(e.target.value)}
                  />
                </label>
                <button type="submit"> Submit</button>
              </form>
              <div>
                <div>



                  {(!isEmptyString(userid) && active === true ) ? (<>
                        Your Username and your Password Authenticated
                        {IsAdmin ? (
                            <Link to={`/auth/${userid}`} state={{token: {token}}}>
                              <button type="submit"> Continue</button>
                            </Link>
                        ) : (
                            <Link to={`/admin/managing`} state={{token: {token}}} >
                              <button type="submit"> Continue</button>
                            </Link>
                        )}
                      </>) :
                      (<>Complete your User</>)}
                </div>
              </div>

            </div>

        ) : (
            <div>
              hello
            </div>
        )}
      </div>
  );
};

export default Signin;
