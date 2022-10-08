const { Client } = require("pg");
const { newToken } = require("../controllers/auth");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "",
  database: "",
});

client.connect();

const getItemById = async (itemid) => {
  const [searchItem] = await Promise.all([
    client.query('SELECT * FROM "public"."item" WHERE itemid=$1;', [itemid]),
  ]);
  return searchItem.rows;
};

const getAllItems = async (req, res) => {
  const [commentsRes] = await Promise.all([
    client.query(
      'SELECT * FROM "public"."item" WHERE active_start=$1 AND active_end=$1;',
      [true]
    ),
  ]);

  return commentsRes.rows;
  await client.end();
};

const getAllItemsWithoutOrder = async () => {
  const [PreActiveRes, ActiveRes, PostActiveRes] = await Promise.all([
    client.query(
      'SELECT * FROM "public"."item" WHERE active_start=$2 AND active_end=$1;',
      [true, false]
    ),
    client.query(
      'SELECT * FROM "public"."item" WHERE active_start=$1 AND active_end=$1;',
      [true]
    ),
    client.query(
      'SELECT * FROM "public"."item" WHERE active_start=$1 AND active_end=$2;',
      [true, false]
    ),
  ]);
  const items = {
    PreActiveRes: PreActiveRes.rows,
    ActiveRows: ActiveRes.rows,
    PostActiveRes: PostActiveRes.rows,
  };

  return items;
  await client.end();
};

const createNewItem = async (newItem) => {

  const {
    name,
    first_bid,
    sellerid,
    countryid,
    started,
    ends,
    buy_price,
    description,
    currently,
    itemid,
  } = newItem;


  const [commentsRes] = await Promise.all([
    client.query(
      'INSERT INTO "public"."item" (itemid, name, first_bid, sellerid , countryid, started, ends, buy_price ,description, currently    ) VALUES ($1, $2 ,$3 , $4, $5 ,$6,$7, $8 ,$9,$10) RETURNING *',
      [
        itemid,
        name,
        first_bid,
        sellerid,
        countryid,
        started,
        ends,
        buy_price,
        description,
        currently,
      ]
    ),
  ]);

  return commentsRes.rows;
};

const createNewItemCategory = async (newItemCategory) => {
  const { category, item } = newItemCategory;

  const [categoryItemRes] = await Promise.all([
    client.query(
      'INSERT INTO "public"."item_categories" (categoryid, itemid ) VALUES ($1, $2 ) RETURNING *',
      [category, item]
    ),
  ]);
  return categoryItemRes.rows;
};

const createCategory = async (newCategory) => {
  const { name, categoryid } = newCategory;

  const [commentsRes] = await Promise.all([
    client.query(
      'INSERT INTO "public"."category" (categoryid, name ) VALUES ($1, $2 ) RETURNING *',
      [categoryid, name]
    ),
  ]);

  return commentsRes.rows;
};

const createBid = async (newBid) => {
  const { itemid, bidderid, amount, bidid, time } = newBid;
  const [BidRes] = await Promise.all([
    client.query(
      'INSERT INTO "public"."bid"(bidid , itemid , bidderid , time , amount) VALUES ($1 ,$2 ,$3 ,$4 ,$5)  RETURNING *',
      [bidid, itemid, bidderid, time, amount]
    ),
  ]);

  return BidRes.rows;
};

const updateItem = async (newItem) => {

  const {
    name,
    first_bid,
    sellerid,
    countryid,
    started,
    ends,
    buy_price,
    location,
    currently,
    itemid,
  } = newItem;

  const [updateItem] = await Promise.all([
    client.query(
      'UPDATE "public"."item" SET name=$1, first_bid=$2, sellerid=$3, countryid=$4,started=$5,ends=$6,buy_price=$7,currently=$8 WHERE itemid=$9 RETURNING *;',
      [
        name,
        first_bid,
        sellerid,
        countryid,
        started,
        ends,
        buy_price,
        currently,
        itemid,
      ]
    ),
  ]);
  return;
};

const allItemsEnds = async () => {
  const [endsRes] = await Promise.all([
    client.query(
      'SELECT ends,started, itemid FROM "public"."item" WHERE active_end=true ORDER BY ends;'
    ),
  ]);
  return endsRes.rows;
  await client.end();
};

const allItemsStart = async () => {
  const [endsRes] = await Promise.all([
    client.query(
      'SELECT ends,started, itemid FROM "public"."item" WHERE active_start=false ORDER BY started;'
    ),
  ]);
  return endsRes.rows;
  await client.end();
};

const getItemCategory = async (finditemid) => {
  const [categoriesRes]= await Promise.all([
    client.query(
        'SELECT * FROM "public"."category" INNER JOIN  "public"."item_categories" ON category.categoryid = item_categories.categoryid WHERE item_categories.itemid=$1 ;',
        [finditemid]
    ),
  ]);
  return categoriesRes.rows;

};

const updateItemActiveStart = async (itemid) => {
  const [UpdateItem] = await Promise.all([
    client.query(
      'UPDATE "public"."item" SET active_start=$1 WHERE itemid=$2 RETURNING *;',
      [true, itemid]
    ),
  ]);
};

const updateItemActiveEnd = async (itemid) => {
  const [UpdateUser] = await Promise.all([
    client.query(
      'UPDATE "public"."item" SET active_end=$1 WHERE itemid=$2 RETURNING *;',
      [false, itemid]
    ),
  ]);
};

const updateAmountItem = async (itemid, newamount) => {
  const [updateAmountRes] = await Promise.all([
    client.query(
      'UPDATE "public"."item" SET currently=$1 WHERE itemid=$2 RETURNING *;',
      [newamount, itemid]
    ),
  ]);

  return updateAmountRes.rows;
};

const findLengthOfBinds = async (finditemid) => {
  const [BidRes] = await Promise.all([
    client.query(
        'SELECT * FROM "public"."bid" INNER JOIN  "public"."item" ON item.itemid=bid.itemid WHERE bidderid=$1;',
        [finditemid]
    ),
  ]);
  return BidRes.rows;
  await client.end();
};

const findCountryId = async (n) => {

  const [BidRes] = await Promise.all([
    client.query('SELECT * FROM "public"."country" WHERE name=$1;', [n]),
  ]);
  return BidRes.rows[0];
};

const findCategoryId = async (name) => {
  const [category_id] = await Promise.all([
    client.query('SELECT categoryid FROM "public"."category" WHERE name=$1;', [
      name,
    ]),
  ]);

  return category_id.rows[0];
};

const getAllCategories = async () => {
  const [commentsRes] = await Promise.all([
    client.query('SELECT * FROM "public"."category";'),
  ]);

  return commentsRes.rows;

  await client.end();
};

const selledItem = async (newSelled) => {
  const { sellerid, bidderid, itemid , amount ,name} = newSelled;

  const [BidRes] = await Promise.all([
    client.query(
        'INSERT INTO "public"."sellproduct"(sellerid , bidderid, itemid , amount , name) VALUES ($1 ,$2 ,$3 ,$4 ,$5 )  RETURNING *',
        [sellerid, bidderid, itemid ,amount , name]
    ),
  ]);
  return BidRes.rows;
};

const updateItemF = async (itemid) => {

  const [updateItem] = await Promise.all([
    client.query(
        'UPDATE "public"."item" SET active_end=$1 WHERE itemid=$2 RETURNING *;',
        [
          false,
          itemid,
        ]
    ),
  ]);

};

const findSelled = async (userid) => {
  const [Selled] = await Promise.all([
    client.query('SELECT * FROM "public"."sellproduct" WHERE sellerid=$1;', [
      userid,
    ]),
  ]);
  return Selled.rows;
}
const findBuy = async (userid) => {

  const [Selled] = await Promise.all([
    client.query('SELECT * FROM "public"."sellproduct" WHERE bidderid=$1;', [
      userid,
    ]),
  ]);
  return Selled.rows;
}

const findActivebyItemid = async (userid) => {

  const [PreActiveRes, ActiveRes] = await Promise.all([
    client.query(
        'SELECT * FROM "public"."item" WHERE active_start=$2 AND active_end=$1 AND sellerid=$3;',
        [true, false , userid]
    ),
    client.query(
        'SELECT * FROM "public"."item" WHERE active_start=$1 AND active_end=$1 AND sellerid=$2;',
        [true , userid]
    ),
  ]);
  const items = {
    PreActiveRes: PreActiveRes.rows,
    ActiveRows: ActiveRes.rows,
  };
  return items;
  await client.end();
}

const updateItemCategory = async (newItemCategory) => {
  const { category, item } = newItemCategory;

  const [categoryItemRes] = await Promise.all([
    client.query(
        'UPDATE "public"."item_categories" SET  categoryid=$1 WHERE itemid=$2 RETURNING *',
        [category, item]
    ),
  ]);
  return categoryItemRes.rows;
};

const deleteItem = async (itemid) =>{
  const [deleteItemRes] = await Promise.all([
    client.query(
        'DELETE  FROM "public"."item" WHERE itemid=$1 RETURNING *',
        [ itemid]
    ),
  ]);

}

module.exports = {
  createNewItem,
  createCategory,
  getAllItems,
  getAllCategories,
  createBid,
  getItemById,
  allItemsEnds,
  allItemsStart,
  updateItemActiveStart,
  updateItemActiveEnd,
  getAllItemsWithoutOrder,
  updateItem,
  updateAmountItem,
  findLengthOfBinds,
  findCountryId,
  findCategoryId,
  createNewItemCategory,
  getItemCategory,
  selledItem,
  updateItemF,
  findSelled,
  findActivebyItemid,
  updateItemCategory,
  deleteItem,
  findBuy,
};
