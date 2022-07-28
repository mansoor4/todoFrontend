import Profile from '../user/Profile';
import User from '../user/User';

type AuthResponse = {
    message?: string,
    user?: User,
    profile?: Profile,
};
export default AuthResponse;