import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

export const verifyPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}
