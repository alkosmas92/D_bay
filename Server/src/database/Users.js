const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "",
  database: "",
});

client.connect();

const getAllUsers = async (req, res) => {
  const [commentsRes] = await Promise.all([
    client.query('SELECT * FROM "public"."users";'),
  ]);
  return commentsRes.rows;

  await client.end();
};



const getOneUserByUsername = async (username) => {
  const [commentsRes] = await Promise.all([
    client.query('SELECT * FROM "public"."users" WHERE username=$1;', [
       username,
    ] ),
  ]);


  return commentsRes.rows;

  await client.end();
};

const getOneUserById = async (userid) => {
  const [commentsRes] = await Promise.all([
    client.query('SELECT * FROM "public"."users" WHERE userid=$1;', [
      userid,
    ] ),
  ]);
  return commentsRes.rows;
  await client.end();
};

const createNewUser = async (newUser) => {
  const {
    username,
    password,
    check_password,
    firstname,
    lastname,
    email,
    address,
    telephone,
    afm,
    userid,
  } = newUser;


  const [commentsRes] = await Promise.all([
    client.query(
      'INSERT INTO "public"."users" (userid, username, password, firstname , lastname, email, address, telephone , afm ) VALUES ($1, $2 ,$3 , $4, $5 ,$6,$7, $8 ,$9) RETURNING *',
      [
        userid,
        username,
        password,
        firstname,
        lastname,
        email,
        address,
        telephone,
        afm,
      ]
    ),
    client.query('UPDATE "public"."users" SET active=$1 WHERE username=$2 RETURNING *;', [
      true,
      "admin",
    ] ),
  ]);


  return commentsRes.rows;
};

const createNewSeller = async (newSeller) => {
  const {
    sellerid,
    rating,
  } = newSeller;

  const [SellerRes] = await Promise.all([
    client.query(
        'INSERT INTO "public"."seller" (userid, rating ) VALUES ($1, $2 ) RETURNING *',
        [
          sellerid,rating,
        ]
    ),
  ]);

  return SellerRes.rows;

};

const createNewBidder = async (newBidder) => {

  const {
    bidderid,
    rating,
  } = newBidder;

  const [BidderRes] = await Promise.all([
    client.query(
        'INSERT INTO "public"."bidder" (userid, rating ) VALUES ($1, $2 ) RETURNING *',
        [
          bidderid,rating,
        ]
    ),
  ]);
  return BidderRes.rows;
};

const updateOneUser = async (user) => {
  const [UpdateUser] = await Promise.all([
    client.query('UPDATE "public"."users" SET active=$1 WHERE userid=$2 RETURNING *;', [
        true,
      user[0].userid,
    ] ),
  ]);

  return UpdateUser.rows;
  return user;
};

const deleteOneUser = () => {
  return;
};

const getCountries = async (req, res) => {
  const [commentsRes] = await Promise.all([
    client.query('SELECT * FROM "public"."country";'),
  ]);
  return commentsRes.rows;

  await client.end();
};

const getCountry = async (cid) => {

  const [countryRes] = await Promise.all([
    client.query('SELECT * FROM "public"."country" WHERE id=$1;', [
      cid,
    ] ),
  ]);
  return countryRes.rows;
  await client.end();
};


module.exports = {
  getAllUsers,
  getOneUserByUsername,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getOneUserById,
  createNewSeller,
  createNewBidder,
  getCountries,
  getCountry,
};
