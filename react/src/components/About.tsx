
import styled from '@emotion/styled'
import { GithubOutlined } from '@ant-design/icons'
const StyleAbout =  styled.div({
    borderRadius: 2
})

const StyleContainer =  styled.div({
    background:'rgba(0,0,0,.8)',
    padding:12,
    borderRadius: 2
})

const About = () => {
    return (
        <StyleAbout>
            <a href='https://github.com/eveningwater'>
                <StyleContainer>
                    <GithubOutlined></GithubOutlined>
                    &nbsp;代码完全开源,欢迎star
                </StyleContainer>
            </a>
        </StyleAbout>
    )
}

export default About;