require("../models/database");

const Category = require("../models/Category");

// *GET
//*HomePage
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("index", categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};

// async function insertDymayCategoryData() {
//   try {
//     await Category.insertMany([
//       {
//         name: "Thai",
//         image: "thai-food.jpg",
//       },
//       {
//         name: "American",
//         image: "american-food.jpg",
//       },
//       {
//         name: "Chinese",
//         image: "chinese-food.jpg",
//       },
//       {
//         name: "Mexican",
//         image: "mexican-food.jpg",
//       },
//       {
//         name: "Indian",
//         image: "indian-food.jpg",
//       },
//       {
//         name: "Spanish",
//         image: "spanish-food.jpg",
//       },
//     ]);
//   } catch (err) {
//     console.log(err);
//   }
// }
// insertDymayCategoryData();
