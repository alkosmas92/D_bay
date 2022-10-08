import "../styles/App.css";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="sign-button">
      <form
        className="sign-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Link to={`/signin`}>
          <button type="submit"> Singin </button>
        </Link>
        <Link to={`/signup`}>
          <button type="submit"> Singup </button>
        </Link>
        <Link to={`/visitor`}>
          <button type="submit"> Visitor </button>
        </Link>
      </form>
    </div>
  );
};

export default Start;
