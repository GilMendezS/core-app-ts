import { hashPassword, comparePassword } from './password.service';

describe( 'Test password service', () => {
    it( 'Should return a hash instead of plain text', () => {
        const simpletext = 'somestring';
        const hash = hashPassword( simpletext );
        expect( hash ).not.toEqual( simpletext );
    } );
    it( 'should validate a hash as a valid password', () => {
        const simpletext:string = 'somestring';
        const invalidText:string = 'invalid';
        const hash = hashPassword( simpletext );
        const isAValidPassword = comparePassword( simpletext, hash as string );
        const mustBeInvalid= comparePassword( invalidText, hash as string );
        expect( isAValidPassword ).toBeTruthy();
        expect( mustBeInvalid ).toBeFalsy();
    } );
} )