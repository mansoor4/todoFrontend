import Profile from '../user/Profile';
import User from '../user/User';

type AuthResponse = {
    message?: string,
    user?: User,
    profile?: Profile,
    userId?: string,
};
export default AuthResponse;