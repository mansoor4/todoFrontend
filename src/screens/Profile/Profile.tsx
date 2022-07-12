import React, { FC, useState } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import User from '../../types/user/User';
import useUpdateUser from '../../hooks/useUpdateUser';
import defaultUrl from '../../assets/default_profile.png';
import getInputList from '../../utils/getProfileInputList';
import DisplayProfile from '../../components/DisplayProfile/DisplayProfile';
import EditProfile from '../../components/EditProfile/EditProfile';
import errorHandler from '../../utils/errorHandler';

const Profile: FC = () => {
	const { updateUser, isLoading } = useUpdateUser();
	const curUserData = useAppSelector((state) => state.user.user);
	let imageUrl = useAppSelector((state) => state.user.profile?.url);
	const [userData, setUserData] = useState<User>({
		firstName: '',
		lastName: '',
		contact: '',
		address: '',
		email: '',
		removeProfile: false,
	});

	const [fileData, setFileData] = useState<File | null>(null);
	const [profileSelect, setProfileSelect] = useState(false);
	const [editProfile, setEditProfile] = useState(false);

	const intializeUserData = (user: User) => {
		setUserData((prevUser) => {
			return {
				...prevUser,
				firstName: user.firstName,
				lastName: user.lastName,
				contact: user.contact,
				address: user.address,
				email: user.email,
			};
		});
	};

	const submitHandler = async () => {
		try {
			await updateUser(userData, fileData);
			setUserData({
				firstName: '',
				lastName: '',
				contact: '',
				address: '',
				email: '',
				removeProfile: false,
			});
			setFileData(null);
			editCloseHandler();
		} catch (err) {
			errorHandler(err);

		}

	};

	const removeProfileHandler = () => {
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				removeProfile: true,
			};
		});
		setProfileSelect(true);

	};

	const userDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				[event.target.name]: event.target.value,
			};
		});
	};

	const fileDataChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (files) {
			setFileData(files[0]);
			setUserData((prevUserData) => {
				return {
					...prevUserData,
					removeProfile: false,
				};
			});
			setProfileSelect(true);
		}
	};

	const editOpenHandler = () => {
		setEditProfile(true);
		setProfileSelect(false);
	};

	const editCloseHandler = () => {
		setEditProfile(false);
		setProfileSelect(false);
	};


	if (profileSelect || !imageUrl) {
		if (fileData && !userData.removeProfile) imageUrl = URL.createObjectURL(fileData);
		else imageUrl = defaultUrl;
	}

	const inputList = getInputList(userData);

	return <div>
		{!editProfile &&
			<DisplayProfile
				user={curUserData}
				imageUrl={imageUrl}
				editOpenHandler={editOpenHandler} />
		}
		{editProfile &&
			<EditProfile
				user={curUserData}
				image={{ imageUrl, fileDataChangeHandler, removeProfileHandler }}
				button={{ isLoading, submitHandler }}
				inputs={inputList}
				changeHandler={userDataChangeHandler}
				editCloseHandler={editCloseHandler}
				intializeUserData={intializeUserData} />
		}
	</div>;
};

export default Profile;