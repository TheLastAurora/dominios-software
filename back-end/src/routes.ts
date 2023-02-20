import { Request, Response, Router } from "express";
import UserController from "./controllers/user.controller";
import CandidatoController from "./controllers/candidato.controller";
import ConcursoController from "./controllers/concurso.controller";
import GabaritoController from "./controllers/gabarito.controller";
import Auth from "./middlewares/auth";

const router = Router();

//Default Route
router.get('/', (req: Request, res: Response)=> res.status(200).json({status: "SAPO API Online"}));

//User Routes
router.post('/user', UserController.create);
router.get('/user/:id', Auth.verify, UserController.read);
router.put('/user/:id', Auth.verify, UserController.update);
router.delete('/user/:id', Auth.verify, UserController.delete);
router.post('/login', UserController.authenticate);

//Candidato Routes
router.post('/candidato', Auth.verify, CandidatoController.create);
router.get('/candidato/:id', Auth.verify, CandidatoController.read);
router.put('/candidato/:id', Auth.verify, CandidatoController.update);
router.delete('/candidato/:id', Auth.verify, CandidatoController.delete);

//Gabarito Routes
router.post('/gabarito', Auth.verify, GabaritoController.create);
router.get('/gabarito/:id', Auth.verify, GabaritoController.read);
router.put('/gabarito/:id', Auth.verify, GabaritoController.update);
router.delete('/gabarito/:id', Auth.verify, GabaritoController.delete);

//Concurso Routes
router.post('/concurso', Auth.verify, ConcursoController.create);
router.get('/concurso/:id', Auth.verify, ConcursoController.read);
router.get('/concurso', Auth.verify, ConcursoController.readAll);
router.get('/concurso/:id/candidatos', Auth.verify, ConcursoController.readConcursoCandidatos);
router.get('/concurso/:id/gabaritos', Auth.verify, ConcursoController.readConcursoGabaritos);
router.put('/concurso/:id', Auth.verify, ConcursoController.update);
router.delete('/concurso/:id', Auth.verify, ConcursoController.delete);


export default router;