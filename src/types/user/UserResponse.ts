import Profile from './Profile';
import User from './User';

type UserResponse = {
    message?: string,
    user?: User,
    profile?: Profile,
}

export default UserResponse;