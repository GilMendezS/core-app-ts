import bcrypt from 'bcrypt';

const defaultRounds: number = 10;

export function hashPassword( password: string ): string | void {
    return bcrypt.hashSync(password, defaultRounds );
}
export function comparePassword( password: string, hash: string ) : boolean {
    return bcrypt.compareSync( password, hash );
}