import { body } from 'express-validator';

class LogiValidator {
    validate() {
        return [
            body( 'username' ).notEmpty()
                .withMessage( 'The username field is required' ),
            body( 'password' ).notEmpty()
                .withMessage( 'The password field is required' ),
        ]
    }
}
export default new LogiValidator;