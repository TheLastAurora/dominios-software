import { Request, Response, Router } from "express";
import UserController from "./controllers/user.controller";
import CandidatoController from "./controllers/candidato.controller";
import ConcursoController from "./controllers/concurso.controller";
import Auth from "./middlewares/auth";

const router = Router();

//Default Route
router.get('/', (req: Request, res: Response)=> res.status(200).json({status: "SAPO API Online"}));

//User Routes
router.post('/user', UserController.create);
router.get('/user/:id', Auth.auth, UserController.read);
router.put('/user/:id', Auth.auth, UserController.update);
router.delete('/user/:id', Auth.auth, UserController.delete);
router.get('/login', UserController.authenticate);

//Candidato Routes
router.post('/candidato', Auth.auth, CandidatoController.create);
router.get('/candidato/:id', Auth.auth, CandidatoController.read);
router.put('/candidato/:id', Auth.auth, CandidatoController.update);
router.delete('candidato/:id', Auth.auth, CandidatoController.delete);

//Concurso Routes
router.post('/concurso', Auth.auth, ConcursoController.create);
router.get('/concurso/:id', Auth.auth, ConcursoController.read);
router.get('/concurso', Auth.auth, ConcursoController.readAll);
router.get('concurso/:id/candidatos', Auth.auth, ConcursoController.readConcursoCandidatos);
router.put('/concurso/:id', Auth.auth, ConcursoController.update);
router.delete('/concurso/:id', Auth.auth, ConcursoController.delete);


export default router;