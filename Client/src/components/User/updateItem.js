import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext, React } from "react";
import { useSelector } from "react-redux";
import isEmptyObject from "../../functions/isEmptyObject";
import { useParams } from "react-router-dom";
import Checkbox from "../Checkbox/Checkbox";
import "../../styles/CategoryItem.css";

const UpdateItem = (props) => {
    const location1 = useLocation();
    const token = location1.state;
    const { userid } = useParams();
    const [category, setCategory] = useState({});
    const [SelectCategory, setSelectCategory] = useState({});
    const [Countries, setCountries] = useState({});
    const [SelectCountries, setSelectCountries] = useState("");
    const [isChecked1, setIsChecked1] = useState([]);
    const [name, setName] = useState(props.name);
    const [first_bid, setFirst_bid] = useState();
    const [buy_price, setBuy_price] = useState();
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState(props.description);
    const [day, setDay] = useState("1");
    const [day_end, setDay_end] = useState("1");
    const [month, setMonth] = useState("1");
    const [month_end, setMonth_end] = useState("1");
    const [year, setYear] = useState("2022");
    const [year_end, setYear_end] = useState("2022");
    const [hour, setHour] = useState("0");
    const [hour_end, setHour_end] = useState("0");
    const [minute, setMinute] = useState("0");
    const [minute_end, setMinute_end] = useState("0");

    const myDate = Array.from({ length: 30 }, (_, i) => i + 1);
    const myMonth = Array.from({ length: 12 }, (_, i) => i + 1);
    const myHour = Array.from(Array(23).keys());
    const myMinute = Array.from(Array(59).keys());
    var myYear = [];
    for (var i = 2022; i <= 2030; i++) {
        myYear.push(i);
    }

    useEffect(() => {
        getDataCategory();
        getDataCoutries();
    }, []);

    async function requestItem() {

        var postCategory = [];

        for (let i = 0 ; i < isChecked1.length ; i++){  //push id of category base on checked of checkbox
            if(isChecked1[i]===true){
                postCategory.push(category[i].categoryid)
            }
        }

        const new_item = {
            sellerid: userid,
            name: name,
            first_bid: first_bid,
            buy_price: buy_price,
            location: location,
            description: description,
            countryid: SelectCountries,
            day: day,
            month: month,
            year: year,
            hour: hour,
            minute: minute,
            day_end: day_end,
            monthend: month_end,
            yearend: year_end,
            hourend: hour_end,
            minuteend: minute_end,
            itemid: props.item,
        };


        const result = await fetch(
            `http://localhost:3000/auth/seller/${userid}/updateItem`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: "Bearer " + token.token.token,
                },
                body: JSON.stringify(new_item),
            }
        );
        const resultInJson = await result.json();

        for (let i=0 ; i < postCategory.length ; i++){

            let new_category ={
                categoryid: postCategory[i],
                itemid: props.item,
            }

            const result = await fetch(
                `http://localhost:3000/auth/seller/${userid}/updateCategoryItem`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        authorization: "Bearer " + token.token.token,
                    },
                    body: JSON.stringify(new_category),
                }
            );
        }
    }

    async function getDataCategory() {
        const result = await fetch(
            `http://localhost:3000/auth/seller/${userid}/item`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: "Bearer " + token.token.token,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
        await setCategory(result);
        await setSelectCategory(result[0].name);
        var arrayfalse = [];
        for (var i = 0; i < result.length; i++) {
            arrayfalse.push(false);
        }
        setIsChecked1(arrayfalse);
    }

    async function getDataCoutries() {
        const result = await fetch(`http://localhost:3000/countries`, {
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

        await setCountries(result);
        await setSelectCountries(result[0].name);

    }

    return (
        <div>
            {!(isEmptyObject(category) || isEmptyObject(Countries)) ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        getDataCoutries();
                        getDataCategory();
                        requestItem();
                    }}
                >
                    <div>
                        <h2>Complite for Update</h2>
                        <div>
                            {/*Select Category for your product:*/}
                            {/*{category.map((obj, index) => {*/}
                            {/*    return (*/}
                            {/*        <div>*/}
                            {/*            <Checkbox*/}
                            {/*                key={obj.categoryid}*/}
                            {/*                name={obj.name}*/}
                            {/*                Allcheck={isChecked1}*/}
                            {/*                setChecked={setIsChecked1}*/}
                            {/*                index={index}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            
                            {/*    );*/}
                            {/*})}*/}
                            {/*</select>*/}
                        </div>

                        <div>
                            Select Country for your product:
                            <select
                                value={SelectCountries}
                                onChange={(e) => setSelectCountries(e.target.value)}
                                onBlur={(e) => setSelectCountries(e.target.value)}
                            >
                                {Countries.map((obj) => (
                                    <option key={obj.countryid} value={obj.name}>
                                        {obj.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="formStyle">
                            <label htmlFor="username">
                                Name
                                <input
                                    id="Name"
                                    value={name}
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label htmlFor="First_bid">
                                First Bid
                                <input
                                    id="first_bid"
                                    value={first_bid}
                                    placeholder="first bid"
                                    onChange={(e) => setFirst_bid(e.target.value)}
                                />
                            </label>
                            <label htmlFor="buy_price">
                                Buy Price
                                <input
                                    id="buy_price"
                                    value={buy_price}
                                    placeholder="buy_price"
                                    onChange={(e) => setBuy_price(e.target.value)}
                                />
                            </label>
                            <label htmlFor="location">
                                Location
                                <input
                                    id="location"
                                    value={location}
                                    placeholder="location"
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </label>
                            <label htmlFor="description">
                                Description
                                <input
                                    id="description"
                                    value={description}
                                    placeholder="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                            <div className="dateStart">
                                Start Sell:
                                <div>
                                    Day:
                                    <select
                                        value={day}
                                        onChange={(e) => setDay(e.target.value)}
                                        onBlur={(e) => setDay(e.target.value)}
                                    >
                                        {myDate.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    Month:
                                    <select
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                        onBlur={(e) => setMonth(e.target.value)}
                                    >
                                        {myMonth.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    Year:
                                    <select
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        onBlur={(e) => setYear(e.target.value)}
                                    >
                                        {myYear.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    Hour:
                                    <select
                                        value={hour}
                                        onChange={(e) => setHour(e.target.value)}
                                        onBlur={(e) => setHour(e.target.value)}
                                    >
                                        {myHour.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    Minute:
                                    <select
                                        value={minute}
                                        onChange={(e) => setMinute(e.target.value)}
                                        onBlur={(e) => setMinute(e.target.value)}
                                    >
                                        {myMinute.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="dateEnd">
                                End Sell:
                                <div>
                                    Day:
                                    <select
                                        value={day_end}
                                        onChange={(e) => setDay_end(e.target.value)}
                                        onBlur={(e) => setDay_end(e.target.value)}
                                    >
                                        {myDate.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    Month:
                                    <select
                                        value={month_end}
                                        onChange={(e) => setMonth_end(e.target.value)}
                                        onBlur={(e) => setMonth_end(e.target.value)}
                                    >
                                        {myMonth.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    Year:
                                    <select
                                        value={year_end}
                                        onChange={(e) => setYear_end(e.target.value)}
                                        onBlur={(e) => setYear_end(e.target.value)}
                                    >
                                        {myYear.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    Hour:
                                    <select
                                        value={hour_end}
                                        onChange={(e) => setHour_end(e.target.value)}
                                        onBlur={(e) => setHour_end(e.target.value)}
                                    >
                                        {myHour.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    Minute:
                                    <select
                                        value={minute_end}
                                        onChange={(e) => setMinute_end(e.target.value)}
                                        onBlur={(e) => setMinute_end(e.target.value)}
                                    >
                                        {myMinute.map((obj, index) => (
                                            <option key={obj} value={obj}>
                                                {obj}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit"> Update </button>

                    </div>
                </form>
            ) : (
                <div>
                    <h1> loading... </h1>
                </div>
            )}
        </div>
    );
};

export default UpdateItem;
