import express from "express";
import ToughtsController from "../controllers/ToughtsController.mjs";
import { checkAuth }  from "../helpers/auth.mjs";

const router = express.Router();

router.get('/add', checkAuth, ToughtsController.createTought);
router.post('/add', checkAuth, ToughtsController.createToughtSave);
router.get('/edit/:id', checkAuth, ToughtsController.updateTought);
router.post('/edit', checkAuth, ToughtsController.updateToughtSave);
router.get('/dashboard', checkAuth, ToughtsController.dashboard);
router.post('/remove', checkAuth, ToughtsController.remove);
router.get('/', ToughtsController.showToughts);

export default router;
