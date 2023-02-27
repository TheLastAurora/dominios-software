import bcrypt from 'bcrypt';

class Encrypt {

    public async hash(text: string): Promise<string>{
        return bcrypt.hash(text, 10);
    }

    public async compare(text: string, hash: string): Promise<boolean>{
        return bcrypt.compare(text, hash);
    }

}

export default new Encrypt();