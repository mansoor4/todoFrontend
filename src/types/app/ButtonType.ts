type ButtonType = {
    isLoading?: boolean,
    submitHandler?: () => void,
    children?: React.ReactNode,
    loadingType?: string,
    curLoadingType?: string[],
    id?: string,
    curId?: string,
    style?: string

}
export default ButtonType;