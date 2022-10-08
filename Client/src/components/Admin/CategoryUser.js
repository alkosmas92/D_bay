import "../../styles/BidderItem.css"
import {Link, useLocation} from "react-router-dom";
const CategoryUser = () => {
    const location = useLocation();
    const token = location.state;
    return (
        <div>
                <Link to={`/admin/managing/user`} state={token}>
                    <button type="submit">Users and update</button>
                </Link>
                <Link to={`/admin/managing/category`} state={token}>
                    <button type="submit"> Create category for products</button>
                </Link>
        </div>
    );
};




export default CategoryUser;
