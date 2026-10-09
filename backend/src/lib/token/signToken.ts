import { env } from '../../env';
import User from '../../models/schema/user';

var jwt = require('jsonwebtoken');

export function signToken(user: User) {
    return jwt.sign(
        {
            id: user.user_id,
        },
        env.secret.jwt,
        {
            expiresIn: 7 * 24 * 60 * 60, // expires in 7 days
        },
    );
}
