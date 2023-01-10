import { ElementType, ReactNode } from "react";

export interface TitleProps extends Record<string,any>{
    children: ReactNode
    level: number | string
}

const levelList = [1,2,3,4,5,6];

const Title = (props: Partial<TitleProps>) => {
    const { level,children,...rest } = props;
    const Component = (level && levelList.includes(+level) ? `h${level}` : 'h1') as ElementType;

    return (
        <Component {...rest}>{ children }</Component>
    )
}

export default Title;