import ButtonType from '../app/ButtonType';
import ImageType from '../app/ImageType';
import InputListType from '../app/InputListType';
import User from './User';

type EditProfile = {
    user: User,
    button: ButtonType,
    image: ImageType,
    inputs: InputListType,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    editCloseHandler: () => void,
    intializeUserData: (userData: User) => void
}

export default EditProfile;