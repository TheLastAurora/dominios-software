import { Request, Response, Router } from "express";
import UserController from "./controllers/user.controller";

const router = Router();

//Default Route
router.get('/', (req: Request, res: Response)=> res.status(200).json({status: "SAPO API Online"}));

//User Routes
router.post('/user', (req: Request, res: Response)=> UserController.create(req, res));
router.get('/user/:id', (req: Request, res: Response)=> UserController.read(req, res));
router.put('/user/:id', (req: Request, res: Response)=> UserController.update(req, res));
router.delete('/user/:id', (req: Request, res: Response)=> UserController.delete(req, res));

export default router;