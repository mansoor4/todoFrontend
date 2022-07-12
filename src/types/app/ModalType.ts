import React from 'react';

type ModalType = {
    children?: React.ReactNode,
    closeHandler?: () => void,
    disable?: boolean,
};

export default ModalType;