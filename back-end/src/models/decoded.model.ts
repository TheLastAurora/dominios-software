import { Credentials } from "./user.model";

export interface Decoded {
    credentials: Credentials,
    iat: number,
    exp: number
}