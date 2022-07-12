import { FC, JSXElementConstructor, ReactElement } from 'react';

const Auxillary: FC<{ children: ReactElement<unknown, string | JSXElementConstructor<unknown>> }> = (props) => props.children;

export default Auxillary;