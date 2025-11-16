// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");
// const adminMiddleware = require("../middleware/adminMiddleware");

// const { 
//   createSweet,
//   getAllSweets,
//   updateSweet,
//   deleteSweet,
//   purchaseSweet,
//   restockSweet,
//   searchSweets
// } = require("../controllers/sweetController");

// // Protected Routes
// router.post("/", authMiddleware, createSweet);
// router.get("/", authMiddleware, getAllSweets);
// router.put("/:id", authMiddleware, updateSweet);
// router.delete("/:id", authMiddleware, deleteSweet);
// router.post("/:id/purchase", authMiddleware, purchaseSweet);
// router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);
// router.get("/search", authMiddleware, searchSweets);

// module.exports = router;
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { 
  createSweet,
  getAllSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  searchSweets
} = require("../controllers/sweetController");

// 🔍 Search route should be FIRST (important!)
router.get("/search", authMiddleware, searchSweets);

// 📌 Public: Get all sweets
router.get("/", authMiddleware, getAllSweets);

// 🛒 User purchase sweet
router.post("/:id/purchase", authMiddleware, purchaseSweet);

// 🛠 Admin routes
router.post("/", authMiddleware, adminMiddleware, createSweet);
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

module.exports = router;
