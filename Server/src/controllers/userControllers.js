// In src/controllers/userController.js
const userService = require("../services/userService");
const Workout = require("../database/Users");

const getAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsers();
  // *** ADD ***
  res.json(allUsers);
};

const getCountries = async (req, res) => {
  const allCountries = await Workout.getCountries();
  // *** ADD ***
  res.json(allCountries);
};

const getOneUser = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const user = await userService.getOneUserById(req.params.userid);
    res.status(201).send({ status: "OKkkk", data: user });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const updateOneUser = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const user = await userService.getOneUserById(req.params.userid);
  const updateUser = await userService.updateOneUser(user);
  res.send({ status: "OK", data: { user: updateUser } });
};

const sellerBidder = async (req, res) => {
  const { body } = req;
  if ((!body.userid, !body.flag)) {
    return res.status(400).send({ status: "need userid or flag}" });
  }

  switch (body.flag) {
    case "seller":
      const newSeller = {
        sellerid: body.userid,
        rating: 0.0,
      };
      try {
        const Seller = await Workout.createNewSeller(newSeller);
        res.status(201).send({ status: "OKkkk", data: Seller });
      } catch (error) {
        res
          .status(error.status || 500)
          .send({ status: "FAILED", data: { error: error.message || error } });
      }
      break;
    case "bidder":
      const newBidder = {
        bidderid: body.userid,
        rating: 0.0,
      };
      try {
       const Bidder = await Workout.createNewBidder(newBidder);
        res.status(201).send({ status: "OKkkk", data: Bidder });
      } catch (error) {
        res
          .status(error.status || 500)
          .send({ status: "FAILED", data: { error: error.message || error } });
      }
      break;
    default:
  }
};

const deleteOneUser = (req, res) => {
  res.send("Delete an existing user");
};

const getCountry = async (req,res) =>{

  const getCountry = await Workout.getCountry(req.headers.mycountryid)
  res.json(getCountry);

}



module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  sellerBidder,
  getCountries,
  getCountry,
};
