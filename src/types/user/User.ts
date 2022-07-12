type User = {
    userId?: string,
    firstName?: string,
    lastName?: string,
    username?: string,
    email?: string,
    contact?: string,
    address?: string,
    password?: string,
    createdAt?: Date,
    updatedAt?: Date,
    removeProfile?:boolean,

};

export default User;