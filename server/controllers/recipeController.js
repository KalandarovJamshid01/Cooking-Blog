require("../models/database");

const Category = require("../models/Category");
const Recipe = require("./../models/Recipe");
// *GET
//*HomePage
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );
    const food = { latest, thai, american, chinese };

    res.render("index", { categories, food });
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

exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    res.render("recipe", { recipe });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};

exports.exploreCategoriesById = async (req, res) => {
  try {
    const limitNumber = 20;
    let categoryId = req.params.id;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );

    res.render("categories", { categoryById });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};

/**
 * POST /search
 * Search
 */
exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "Cooking Blog - Search", recipe });
  } catch (error) {
    res.satus(500).send({ message: error.message });
  }
};

exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render("explore-latest", { recipe });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};

exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render("explore-random", { recipe });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};

exports.submitRecipe = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("submit-recipe", { infoErrorsObj, infoSubmitObj });
};

exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No Files where uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.satus(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: "/uploads/"+newImageName,
    });

    await newRecipe.save();

    req.flash("infoSubmit", "Recipe has been added.");
    res.redirect("/submit-recipe");
  } catch (error) {
    // res.json(error);
    req.flash("infoErrors", error);
    res.redirect("/submit-recipe");
  }
};

// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe From Form' });
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteRecipe();

// Update Recipe
// async function updateRecipe(){
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }
// updateRecipe();

async function insertDymayRecipeData() {
  try {
    await Recipe.insertMany([
      {
        name: "Cauliflower PizzasLDGNJLGMfmOFMFMM Crust (with BBQ Chicken Pizza)",
        description: `Recipe Description Goes Here`,
        email: "recipeemail@raddy.co.uk",
        ingredients: [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        category: "American",
        image:"https://www.themealdb.com/images/media/meals/wwuqvt1487345467.jpg",
      },
//       {
//         name: "Recipe Name Goes Here",
//         description: `Recipe Description Goes Here`,
//         email: "recipeemail@raddy.co.uk",
//         ingredients: [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         category: "American",
//         image: "southern-friend-chicken.jpg",
//       },
    ]);
  } catch (err) {
    console.log(err);
  }
}
// insertDymayRecipeData();
