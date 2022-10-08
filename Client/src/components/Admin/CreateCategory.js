import "../../styles/BidderItem.css"
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect, React} from "react";
import {Link, useLocation} from "react-router-dom";
const CreateCategory = () => {
    const [name , setName] = useState("")
    const location = useLocation();
    const token = location.state;


    const dispatch = useDispatch();
    useEffect(() => {
        requestCategory();
    }, []);
    async function requestCategory() {
        const new_category = {
          "name":name,
        };
        const result = await fetch(`http://localhost:3000/admin/categories/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                authorization: "Bearer " + token.token.token,
            },
            body: JSON.stringify(new_category),
        });
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                requestCategory();
            }}
        >
        Προσθεσε Κατηγορια Προϊόντος
        <div>

                <input
                    id="name"
                    value={name}
                    placeholder="category"
                    onChange={(e) => setName(e.target.value)}
                />
            <button type="submit"> Submit </button>
        </div>
        </form>
    );
};




export default CreateCategory;