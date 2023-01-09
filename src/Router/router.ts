import { Router } from "express";
const {
  getAllEngines,
  getAllModels,
  createCompletion,
  createEdit,
  createImage,
} = require("../Controller/controller");

const router = Router();

router.get("/engines", getAllEngines);
router.get("/models", getAllModels);
router.post("/completions", createCompletion);
router.post("/edits", createEdit);
router.post("/images", createImage);

module.exports = router;
