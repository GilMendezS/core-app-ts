import User from '../../models/interfaces/user.interface';

const userFixture: User = {
    "status": "active",
    "id": 101,
    'active_session': false,
    "token": '',
    "customer_id": 101,
    "username": "someUser",
};

export default userFixture;