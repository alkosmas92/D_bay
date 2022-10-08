const { v4: uuid } = require("uuid");
const Itemsout = require("../database/Items");
const Workout = require("../database/Users");


const createItems = async (newItemInsert , newItemCategoriesInsert) => {
    const itemToInsert = {
        ...newItemInsert,
        itemid: uuid(),

    };
    try {
        const createdItem = await Itemsout.createNewItem(itemToInsert , newItemCategoriesInsert);
        return createdItem;
    } catch (error) {
        throw error;
    }
};

const  getAllCategories = () => {
    const  allCategories = Itemsout.getAllCategories();
    return allCategories;
}

const createCategory = async (newCategoryInsert) => {
    const CategoryToInsert = {
        ...newCategoryInsert,
        categoryid: uuid(),
    };
    try {
        const createdCategory = await Itemsout.createCategory(CategoryToInsert);
        // return createdWorkout;
        return createdCategory;
    } catch (error) {
        throw error;
    }
};

const createBid = async (newBid) => {
    const BidInsert = {
        ...newBid,
        bidid: uuid(),
        time: (new Date()).toISOString(),
    };
    try {
        const item =await Itemsout.getItemById(newBid.itemid)
        const createdBid = await Itemsout.createBid(BidInsert );
        return createdBid;
    } catch (error) {
        throw error;
    }
}

const compareBidWithItem = async (newBid) => {
    const item =await Itemsout.getItemById(newBid.itemid)
    // console.log("item is data" , item[0].started , item[0].ends);
    // console.log("WHAT IS MY TIME " ,  parseInt(newBid.time) > parseInt(item[0].started) );
    // console.log("item si " , item);
    return item;
}



module.exports = {
    createItems,
    createCategory,
    getAllCategories,
    createBid,
    compareBidWithItem,

};
