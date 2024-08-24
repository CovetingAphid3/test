import express from "express";
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, deleteAllProducts } from "../controllers/productController.js";
import { requireAuth, checkUser, requireRole } from "../middleware/authMiddleware.js";
import { ROLES } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-products", getAllProducts);
router.get("/get-product/:id", getProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.delete("/delete-all-products", deleteAllProducts);

export default router
