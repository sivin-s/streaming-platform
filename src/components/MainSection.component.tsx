import type React from 'react'
import {Main} from './components.styled/index.styled'

// interface IProps {
//    error?: boolean;
//    message: string;
//    children?: React.ReactNode | undefined;
// } instead we use React.PropsWithChildren it allow includes props|undefined - children types are string, boolean, number
// React.PropsWithChildren - utility type that automatically adds children?:ReactNode
export const MainComponent: React.FC<React.PropsWithChildren> = ({children})=>(
    <Main>
        {children}
    </Main>
)