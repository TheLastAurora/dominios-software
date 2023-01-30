import bcrypt from 'bcrypt';

class Encrypt {

    public hash(text: string): string{
        return bcrypt.hashSync(text, 10);
    }

    public compare(text: string, hash: string): boolean{
        return bcrypt.compareSync(text, hash);
    }

}

export default new Encrypt();