type ImageType = {
    imageUrl: string,
    fileDataChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    removeProfileHandler: () => void,
}
export default ImageType;