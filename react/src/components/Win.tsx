import styled from '@emotion/styled';
import { Row } from 'antd';
import About from './About';
import Title from './Title';
export interface WinProps {
     isWin: boolean
}

const StyleHeart = styled.div({
    width: 25,
    height: 25,
    background:"#e63f0c",
    position: 'relative',
    margin: '1em auto',
    transform:'rotate(45deg)',
    animation:'scale 2s linear infinite',
    '@keyframes scale':{
        '0%':{
            transform:'scale(1) rotate(45deg)'
        },
        '100%':{
            transform:"scale(1.2) rotate(45deg)"
        }
    },
    '&::before,&::after':{
        content:'""',
        width:'100%',
        height:'100%',
        borderRadius:'50%',
        position:'absolute',
        background:"#e63f0c",
    },
    '&::before':{
        left:'-15px',
        top: 0
    },
    '&::after':{
        top:'-15px',
        left: 0
    }
});

const StyleCenter = styled.div({
    textAlign:'center'
})
const Win = (props: WinProps) => {
    const { isWin } = props;
    if(!isWin){
        return null;
    }
    return (
        <Row justify='center'>
            <StyleCenter>
                <StyleHeart />
                <Title level={2}>恭喜你赢啦！</Title>
                <About />
            </StyleCenter>
        </Row>
    )
}

export default Win;