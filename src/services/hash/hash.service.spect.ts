import { generateHash, comparePassword } from './hash.service';

describe( 'Test password service', () => {
    it( 'Should return a hash instead of plain text', () => {
        const simpletext = 'somestring';
        const hash = generateHash( simpletext );
        expect( hash ).not.toEqual( simpletext );
    } );
    it( 'should validate a hash as a valid password', () => {
        const simpletext:string = 'somestring';
        const invalidText:string = 'invalid';
        const hash = generateHash( simpletext );
        const isAValidPassword = comparePassword( simpletext, hash as string );
        const mustBeInvalid= comparePassword( invalidText, hash as string );
        expect( isAValidPassword ).toBeTruthy();
        expect( mustBeInvalid ).toBeFalsy();
    } );
} )