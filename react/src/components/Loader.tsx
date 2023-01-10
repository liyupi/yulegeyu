import styled from '@emotion/styled';
import { Spin } from 'antd';

const StyleLoad = styled.div({
    display:'flex',
    minHeight:'100vh',
    justifyContent:'center',
    alignItems:"center"
});

export interface LoadProps {
    message?: string
}
const Load = (props: Partial<LoadProps>) => {
    const { message = 'loading....' } = props;
    return (
        <StyleLoad>
            <Spin tip={message}></Spin>
        </StyleLoad>
    )
}
export default Load;