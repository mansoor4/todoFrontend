import User from './User';

type DisplayProfileType = {
    imageUrl: string,
    user: User,
    editOpenHandler: () => void;
}

export default DisplayProfileType;