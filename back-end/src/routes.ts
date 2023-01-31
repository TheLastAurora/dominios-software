import { Request, Response, Router } from "express";
import UserController from "./controllers/user.controller";
import CandidatoController from "./controllers/candidato.controller";
import ConcursoController from "./controllers/concurso.controller";

const router = Router();

//Default Route
router.get('/', (req: Request, res: Response)=> res.status(200).json({status: "SAPO API Online"}));

//User Routes
router.post('/user', UserController.create);
router.get('/user/:id', UserController.read);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

//Candidato Routes
router.post('/candidato', CandidatoController.create);
router.get('/candidato/:id', CandidatoController.read);
router.put('/candidato/:id', CandidatoController.update);
router.delete('candidato/:id', CandidatoController.delete);

//Concurso Routes
router.post('/concurso', ConcursoController.create);
router.get('/concurso/:id', ConcursoController.read);
router.put('/concurso/:id', ConcursoController.update);
router.delete('/concurso/:id', ConcursoController.delete);


export default router;