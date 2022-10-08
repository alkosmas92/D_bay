const bcrypt = require("bcrypt");
const itemService = require("../services/itemService");
const Itemsout = require("../database/Items");


function EurotoInt(k){

  let length = k.length
  k=k.split("")
  k=k.splice(0,length-2);
  k = k.join("")
  k = k.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
  return k
}

const itemUpdateTime = async (req, res, next) => {
  let item_start = await Itemsout.allItemsStart();
  let dateNow = new Date();

  dateNow = JSON.stringify(dateNow).replace(/\D/g, "");
  for (let i = 0; i < item_start.length; i++) {
    let timeItemStarted = item_start[i].started;
    let strTimeItemStart = JSON.stringify(timeItemStarted).replace(/\D/g, "");
    if (strTimeItemStart < dateNow) {
      await Itemsout.updateItemActiveStart(item_start[i].itemid);
    }
    if (strTimeItemStart > dateNow) {
      break;
    }
  }
  let item_end = await Itemsout.allItemsEnds();
  for (let i = 0; i < item_end.length; i++) {
    let timeItemEnd = item_end[i].ends;
    let strTimeItemEnd = JSON.stringify(timeItemEnd).replace(/\D/g, "");
    if (strTimeItemEnd < dateNow) {
      await Itemsout.updateItemActiveEnd(item_end[i].itemid);
    }
    if (strTimeItemEnd > dateNow) {
      break;
    }
  }
  next();
};

const getAllCategories = async (req, res) => {
  const allCategories = await Itemsout.getAllCategories();
  res.json(allCategories);
};

const createItems = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  if (
      (!body.sellerid,
          !body.name,
          !body.first_bid,
          !body.buy_price,
          !body.location,
          !body.countryid,
          !body.description,
          !body.day,
          !body.month,
          !body.year,
          !body.hour,
          !body.minute,
          !body.day_end,
          !body.monthend,
          !body.yearend,
          !body.hourend,
          !body.minuteend)
  ) {
    return res
        .status(400)
        .send({ message: "need userid or name or first_bid" });
  }

  const dateStart = new Date(
      `${body.month}  ${body.day}  ${body.year}  ${body.hour}:${body.minute} UTC`
  );

  const dateEnd = new Date(
      `${body.monthend}  ${body.day_end}  ${body.yearend}  ${body.hourend}:${body.minuteend} UTC`
  );




  if (JSON.stringify(dateStart).replace(/\D/g,'') > JSON.stringify(dateEnd).replace(/\D/g,'')) {
    return res.status(400).send({ message: "need started smaller ends" });
  }
  let k;
  let d;

  const newItem = {
    name: String(body.name),
    first_bid: Number(body.first_bid),
    sellerid: req.params.userid,
    countryid: await findCountryId(body.countryid),
    started: dateStart,
    ends: dateEnd,
    buy_price: Number(body.buy_price),
    location: body.location,
    description: body.description,
    currently: Number(body.first_bid),
  };



  try {
    const createdItem = await itemService.createItems(newItem);
    return res
      .status(201)
      .send({ status: "create a item", itemid: createdItem[0].itemid });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const getAllItems = async (req, res) => {
  const allItems = await Itemsout.getAllItems();

  res.json(allItems);
};

const createCategoryItem = async (req, res) => {
  const { body } = req;
  if ((!body.categoryid, !body.itemid)) {
    return res
      .status(400)
      .send({ message: "it should be completed the field" });
  }

  const newCategoryItem = {
    category: body.categoryid,
    item: body.itemid,
  };

  try {
    const createdCategory = await Itemsout.createNewItemCategory(
      newCategoryItem
    );
    return res.status(201).send({ status: "create a category" });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }


  return 1;
};

const createCategory = async (req, res) => {
  const { body } = req;
  if (!body.name) {
    return res
      .status(400)
      .send({ message: "it should be completed the field of name" });
  }
  const newCategory = {
    name: body.name,
  };
  try {
    const createdCategory = await itemService.createCategory(newCategory);
    return res.status(201).send({ status: "create a category" });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const createBid = async (req, res) => {
  const { body } = req;
  if ((!body.itemid, !body.bidderid, !body.amount)) {
    return res.status(401).send({
      message: "it should be completed the field of time, amount , ids",
    });
  }
  const Item = await Itemsout.getItemById(body.itemid);
  if (Item.first_bid > body.amount) {
    return res.status(401).send({
      status: false,
      message: "you need amount greater than first amount",
    });
  }


  const newBid = {
    itemid: body.itemid,
    bidderid: body.bidderid,
    amount: Number(body.amount),
  };



  try {
    const Bid = await itemService.createBid(newBid);
    if ( Number(EurotoInt(Item[0].currently))  <Number(EurotoInt(Bid[0].amount)) ) {


      const updateItem = await Itemsout.updateAmountItem(
        Item[0].itemid,
        Bid[0].amount
      );
      return res.status(201).send({ message: "create new bid" });
      // return res.status(201).send({ message: "create new bid", bid: {$Bid} , Item:{$updateItem} });
    } else {
      return res.status(201).send({ message: "create new bid" });
      // return res.status(201).send({ message: "create new bid", bid: {$Bid} , Item:{$Item} });
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const updateItem = async (req, res) => {
  const { body } =req;


  const dateStart = new Date(
    `${body.month}  ${body.day}  ${body.year}  ${body.hour}:${body.minute} UTC`
  );

  const dateEnd = new Date(
    `${body.monthend}  ${body.day_end}  ${body.yearend}  ${body.hourend}:${body.minuteend} UTC`
  );
  //
  // if (
  //   JSON.stringify(dateStart).replace(/\D/g, "") >
  //   JSON.stringify(dateEnd).replace(/\D/g, "")
  // ) {
  //   return res.status(400).send({ message: "need started smaller ends" });
  // }

  const newItem = {
    itemid: body.itemid,
    name: body.name,
    first_bid: Number(body.first_bid),
    sellerid: body.sellerid,
     countryid: await findCountryId(body.countryid),
    // countryid: body.countryid,
    started: dateStart,
    ends: dateEnd,
    buy_price: Number(body.first_bid),
    location: body.location,
    description: body.description,
    currently: body.first_bid,
    categoryid: body.categoryid,
  };


  try {
    const createdItem = await Itemsout.updateItem(newItem);
    return res.status(201).send({ status: "update a item  " });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const getAllItemsWithoutOrder = async (req, res) => {
  const allItems = await Itemsout.getAllItemsWithoutOrder();
  res.json(allItems);
};

const findLengthOfBinds = async (req, res) => {
  const allItems = await Itemsout.findLengthOfBinds(req.params.itemid);
  res.json({ bids: allItems.length });
};

async function findCountryId(name) {
  const country = await Itemsout.findCountryId(name);

  return country.id;
}

async function findCategoryId(name) {
  const id = await Itemsout.findCategoryId(name);
  return id.categoryid;
}

const getItemCategory = async ( req, res) =>{
  const allCategories = await Itemsout.getItemCategory(req.headers.itemid);
  res.json(allCategories);
}

const getItemById = async (req,res) => {
  const {body} = req.headers
  const Item = await Itemsout.getItemById(req.headers.itemid);
  res.json(Item);
}

const selledItem = async (req,res) => {
  const {body} = req;
  const new_sell = {
    "sellerid": body.sellerid,
    "bidderid": body.bidderid,
    "itemid": body.itemid,
    "amount": body.amount,
  }

  try {
    const r_seller = Itemsout.selledItem(new_sell);
    return res.status(201).send({message: "create new selleditem"});
    // return res.status(201).send({ message: "create new bid", bid: {$Bid} , Item:{$Item} });
  } catch (error) {
    res
        .status(error.status || 500)
        .send({status: "FAILED", data: {error: error.message || error}});
  }
}

const updateItemF = async (req,res) => {

      try{
        const falseUpdate = Itemsout.updateItemF(req.headers.itemid);
        return res.status(201).send({ message: "update false" });
        // return res.status(201).send({ message: "create new bid", bid: {$Bid} , Item:{$Item} });
      } catch (error) {
        res
            .status(error.status || 500)
            .send({ status: "FAILED", data: { error: error.message || error } });
        }
  }

const findSelled = async (req,res) => {
  const Item = await Itemsout.findSelled(req.headers.userid);
  res.json(Item);
}

const findBuy = async (req,res) => {
  const Item = await Itemsout.findBuy(req.headers.userid);
  res.json(Item);

}

const findActivebyItemid = async (req, res) => {
  const allItems = await Itemsout.findActivebyItemid(req.headers.userid);
  res.json(allItems);
};

const updateItemCategory = async (req, res ) =>{
  const { body } = req;
  if ((!body.categoryid, !body.itemid)) {
    return res
        .status(400)
        .send({ message: "it should be completed the field" });
  }

  const updateCategoryItem = {
    category: body.categoryid,
    item: body.itemid,
  };

  try {
    const createdCategory = await Itemsout.updateItemCategory(
        updateCategoryItem
    );
    return res.status(201).send({ status: "update a category" });
  } catch (error) {
    res
        .status(error.status || 500)
        .send({ status: "FAILED", data: { error: error.message || error } });
  }
}

const deleteItem  = async (req,res) =>{
  const { body } = req
  try {
    await Itemsout.deleteItem(
        body.itemid
    );
    return res.status(201).send({ status: "delete a item" });
  } catch (error) {
    res
        .status(error.status || 500)
        .send({ status: "FAILED", data: { error: error.message || error } });
  }

}


module.exports = {
  createItems,
  createCategory,
  getAllCategories,
  getAllItems,
  createBid,
  itemUpdateTime,
  updateItem,
  getAllItemsWithoutOrder,
  findLengthOfBinds,
  createCategoryItem,
  getItemCategory,
  getItemById,
  selledItem,
  updateItemF,
  findBuy,
  findActivebyItemid,
  updateItemCategory,
  deleteItem,
  findSelled,
};
