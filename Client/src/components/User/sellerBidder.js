import {Link, useLocation, useParams} from "react-router-dom";

const SellerBidder = () => {
    const { userid } = useParams();
    const location = useLocation();
    const token = location.state;




    return (
      <div>
          <Link to={`/auth/bidder/${userid}/items`} state={token}>
            <button type="submit">Buy products</button>
          </Link>
          <Link to={`/auth/seller/${userid}/item`} state={token}>
            <button type="submit"> Sell your products</button>
          </Link>
          <Link to={`/auth/seller/${userid}/yourProducts`} state={token}>
            <button type="submit"> Yours products</button>
          </Link>
      </div>
    );
};



export default SellerBidder;
