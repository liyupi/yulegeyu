import styled from '@emotion/styled';
import { Button } from 'antd';

const StyleFooter = styled.footer({
    position:"fixed",
    background:"rgba(0,0,0,.75)",
    color:"rgba(255,255,255,.85)",
    padding:12,
    textAlign:'center',
    left:0,
    right:0,
    bottom:0
})

const Footer = () => {
    return (
        <StyleFooter>
            羊了个羊@2022by
            <Button type='link' href='https://github.com/eveningwater'>
                eveningwater
            </Button>
            |
            <Button type='link' href='https://github.com/eveningwater'>
                代码已开源
            </Button>
        </StyleFooter>
    )
}

export default Footer;