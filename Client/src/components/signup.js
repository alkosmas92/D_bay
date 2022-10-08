import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/signup.css"


import changeusername from "../actionsCreators/changeusername";
import changePasswordSignUp from "../actionsCreators/changePasswordSignUp";
import changepassword_check from "../actionsCreators/changepassword_check";
import changefirstname from "../actionsCreators/changefirstname";
import changelastname from "../actionsCreators/changelastname";
import changeEmailSignUp from "../actionsCreators/changeEmailSignUp";
import changeaddress from "../actionsCreators/changeaddress";
import changetelephone from "../actionsCreators/changetelephone"
import changeafm from "../actionsCreators/changeafm";
import changepassword_check from "../actionsCreators/changepassword_check"
import password_check from "../reducers/password_check";

const Signup = () => {
  const username = useSelector((state) => state.username);
  const passwordSingUp = useSelector((state) => state.passwordSingUp);
  const password_check = useSelector((state) => state.password_check);
  const firstname = useSelector((state) => state.firstname);
  const lastname = useSelector((state) => state.lastname);
  const emailSignUp = useSelector(({ emailSignUp }) => emailSignUp);
  const address = useSelector((state) => state.address);
  const telephone = useSelector((state) => state.telephone);
  const afm = useSelector((state) => state.afm);
  const [resultok , setResultok] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    requestUser();
  }, []);
  async function requestUser() {
    const new_user = {
      "username":username,
      "email": emailSignUp,
      "password": passwordSingUp,
      "telephone":telephone,
      "address":address,
      "afm":afm,
      "lastname":lastname,
      "firstname":firstname,
      "check_password":password_check,
    };

    const result = await fetch(`http://localhost:3000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(new_user),
    });

    setResultok( result.ok)
  }

  return (

      <form
          onSubmit={(e) => {
            e.preventDefault();
            requestUser();
          }}
      >
        <div className="formStyle">
          <label htmlFor="username">
            Username
            <input
                id="username"
                value={username}
                placeholder="Username"
                onChange={(e) => dispatch(changeusername(e.target.value))}
            />
          </label>
          <label htmlFor="passwordSingUp">
            Password
            <input
                id="passwordSingUp"
                type="password"
                value={passwordSingUp}
                placeholder="password"
                onChange={(e) => dispatch(changePasswordSignUp(e.target.value))}
            />
          </label>
          <label htmlFor="check_password">
            Check_password
            <input
                id="check_password"
                type="password"
                value={password_check}
                placeholder="check_password"
                onChange={(e) => dispatch(changepassword_check(e.target.value))}
            />
          </label>
          <label htmlFor="firstname">
            Firstname
            <input
                id="firstname"
                value={firstname}
                placeholder="firstname"
                onChange={(e) => dispatch(changefirstname(e.target.value))}
            />
          </label>
          <label htmlFor="lastname">
            Lastname
            <input
                id="lastname"
                value={lastname}
                placeholder="lastname"
                onChange={(e) => dispatch(changelastname(e.target.value))}
            />
          </label>
          <label htmlFor="emailSignUp">
            Email
            <input
                id="email"
                value={emailSignUp}
                placeholder="email"
                onChange={(e) => dispatch(changeEmailSignUp(e.target.value))}
            />
          </label>
          <label htmlFor="address">
            Address
            <input
                id="address"
                value={address}
                placeholder="address"
                onChange={(e) => dispatch(changeaddress(e.target.value))}
            />
          </label>
          <label htmlFor="telephone">
            Telephone
            <input
                id="telephone"
                value={telephone}
                placeholder="telephone"
                onChange={(e) => dispatch(changetelephone(e.target.value))}
            />
          </label>
          <label htmlFor="afm">
            Afm
            <input
                id="afm"
                value={afm}
                placeholder="afm"
                onChange={(e) => dispatch(changeafm(e.target.value))}
            />
          </label>
          <button type="submit"> Submit </button>
        </div>
        {
          resultok ? <>You create a user and you will can access in website when admin will authenticate your data </> : <>Try create a user, if you see this message you do not create a user</>
        }
      </form>
  );
};

export default Signup;
