require("../models/database");

const Category = require("../models/Category");
const Recipe = require("./../models/Recipe");
// *GET
//*HomePage
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("index", { categories });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};

// *GET/categories
//*Categories
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", { categories });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};

async function insertDymayRecipeData() {
  try {
    await Recipe.insertMany([
      {
        name: "Recipe Name Goes Here",
        description: `Recipe Description Goes Here`,
        email: "recipeemail@raddy.co.uk",
        ingredients: [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        category: "American",
        image: "southern-friend-chicken.jpg",
      },
      {
        name: "Recipe Name Goes Here",
        description: `Recipe Description Goes Here`,
        email: "recipeemail@raddy.co.uk",
        ingredients: [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        category: "American",
        image: "southern-friend-chicken.jpg",
      },
    ]);
  } catch (err) {
    console.log(err);
  }
}
// insertDymayRecipeData();
