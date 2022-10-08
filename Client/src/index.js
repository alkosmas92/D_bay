import React from "react";
import ReactDOM, {render} from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

import Singin from "./components/signin";
import Start from "./components/start";
import Signup from "./components/signup";
import InfoAdmin from "./components/Admin/InfoAdmin";
import SellerBidder from "./components/User/sellerBidder";
import SellItems from "./components/User/SellItems";
import BidderItems from "./components/User/BidderItems";
import CreateItem from "./components/User/CreateItem"
import CategoryUser from "./components/Admin/CategoryUser"
import CreateCategory from "./components/Admin/CreateCategory";
import InfoItem from "./components/User/InfoItem";
import YourProduct from "./components/User/YourProduct";
import SelledProduct from "./components/User/SelledProduct";
import ActiveProducts from "./components/User/ActiveProducts";
import UnderProssessng from "./components/User/underProcessing";
import BuyProducts from "./components/User/BuyProducts";
import Tourist from "./components/tourist";



const App = () =>(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <header>
          <Link to="/">E-bay</Link>
        </header>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Singin />} />
          <Route path="/visitor" element={<Tourist />} />

          <Route path="/auth/:userid" element={<SellerBidder />} />
          <Route path="/auth/seller/:userid/yourProducts" element={<YourProduct/>} />
          <Route path="/auth/seller/:userid/yourProducts/selled" element={<SelledProduct/>} />
          <Route path="/auth/seller/:userid/yourProducts/activeProducts" element={<ActiveProducts/>} />
          <Route path="/auth/seller/:userid/yourProducts/prossesing" element={<UnderProssessng/>} />
          <Route path="/auth/seller/:userid/yourProducts/buy" element={<BuyProducts/>} />
          <Route path="/auth/seller/:userid/item" element={<CreateItem/>} />
          <Route path="/auth/seller/:userid/createItem" element={<SellItems/>} />


          <Route path="/auth/bidder/:userid/items" element={<BidderItems/>} />
          <Route path="/auth/bidder/:userid/:countryid/items/:itemid" element={<InfoItem/>} />

          <Route path="/admin/managing" element={<CategoryUser />} />
          <Route path="/admin/managing/user" element={<InfoAdmin />} />
          <Route path="/admin/managing/category" element={<CreateCategory />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

render(<App />, document.getElementById("root"));
