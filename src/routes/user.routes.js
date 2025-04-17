import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
const router = Router();

// Get User List
router.get("/list", async (req, res, next) => {
  res.return(
    await getUsers({
      payload: {
        ...req.params,
        ...req.query,
        ...req.body,
        type: "BACK_OFFICE",
      },
      headers: req.headers,
    })
  );
});

export default router;
