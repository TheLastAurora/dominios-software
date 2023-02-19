import express, { NextFunction, Request, Response } from "express"
import routes from './routes';
import cors from "cors";

export class App {
    private express: express.Application;
    private port: string = '8090';

    constructor(){
        this.express = express();
        this.middlewares();
        this.router();
        this.listen();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

            this.express.use(cors());
            this.express.options('*', cors());
            next();
        })
    }

    private router(): void {
        this.express.use('/', routes);
    }

    private listen(): void {
        this.express.listen(this.port, () => console.log(`Server running on port ${this.port}`));
    }
}