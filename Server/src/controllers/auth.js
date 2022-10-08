// import  config   from '../config/index.cjs'

const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
function checkPassword(password, passwordHash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
}

const newToken = (user) => {
  return jwt.sign({ id: user }, process.env.JWT_SECRET, {
    //replace with .env
    expiresIn: "100d",
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      //replace with .env
      if (err) return reject(err);
      resolve(payload);
    });
  });

const signup = async (req, res) => {
  const { body } = req;
  // *** ADD ***
  if (
    (!body.username,
    !body.password,
    !body.check_password,
    !body.firstname,
    !body.lastname,
    !body.email,
    !body.telephone,
    !body.address,
    !body.afm)
  ) {
    return res
      .status(400)
      .send({
        message:
          "need email and password check_password" +
          "firstname" +
          "lastname" +
          "email" +
          "telephone" +
          "address" +
          "afm",
      });
  }

  if ( body.password !== body.check_password ){
    return res
        .status(400)
        .send({
            message:"Password and Check password does not match",
        });
  }

  let hashPassword = bcrypt.hashSync(body.password, 3);
  const newUser = {
    username: body.username,
    password: hashPassword,
    check_password: body.check_password,
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    address: body.address,
    telephone: body.telephone,
    afm: body.afm,
  };
  try {
    const createdUser = await userService.createNewUser(newUser);

    return res.status(201).send({ status: "create a user  " });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const createAdmin = async (req, res, next) => {
  const admin = await userService.getOneUserByUsername(
    process.env.USERNAME_ADMIN
  );

  if (typeof admin[0] === "undefined") {
    let hashPassword = bcrypt.hashSync(process.env.PASSWORD_ADMIN, 3);
    const newUser = {
      username: process.env.USERNAME_ADMIN,
      password: hashPassword,
      check_password: process.env.PASSWORD_CHECK_ADMIN,
      firstname: process.env.FIRSTNAME_ADMIN,
      lastname: process.env.LASTNAME_ADMIN,
      email: process.env.EMAIL_ADMIN,
      address: process.env.ADDRESS_ADMIN,
      telephone: 111,
      afm: 111,
    };

    try {
      const createdUser = await userService.createNewUser(newUser);

      const token = newToken(createdUser[0].userid);

      next();
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ status: "FAILED", data: { error: error.message || error } });
    }
  }

  next();
};
const signin = async (req, res) => {
  const { body } = req;
  if ((!body.username, !body.password)) {
    return res.status(400).send({ message: "need email and password" });
  }

  try {
    const user = await userService.getOneUserByUsername(body.username);
    if (!user) {
      return res.status(401).send({message: "user does not exit"});
    }

    const match = await checkPassword(body.password, user[0].password);

    if (!match) {
      return res.status(401).send(invalid);
    }
    const token = newToken(user[0].userid);
    return res.status(201).send({ "token": token , "userid": user[0].userid , "active":user[0].active } );
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
//
const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }
  const user = await userService.getOneUserById(payload.id);


  if (!user) {
    return res.status(401).end();
  }
  req.user = user;
  next();
};
//
const protectAdmin = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();

  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await userService.getOneUserById(payload.id);

  if (!user) {
    return res.status(401).end();
  }

  if (user[0].username !== process.env.USERNAME_ADMIN) {
    return res.status(401).send("only for andmin").end();
  }
  req.user = user;
  next();
};
module.exports = {
  newToken,
  verifyToken,
  signup,
  signin,
  protect,
  createAdmin,
  protectAdmin,
};
