import styled from '@emotion/styled';
import { BASE_IMAGE_URL } from './core/gameConfig';
import Router from './router/router';
import GameConfigStore from './store/store';

const StyleApp = styled.div({
    background:`url(${BASE_IMAGE_URL}1.jpg)no-repeat center/cover`,
    padding:'16px 16px 50px',
    minHeight:'100vh',
    backgroundSize:"100% 100%",
    width:"100%"
});

const StyleContent = styled.div`
    max-width:480px;
    margin: 0 auto;
`

const App = () => {
   const { Provider } = GameConfigStore;
   return (
     <StyleApp>
        <Provider>
            <StyleContent>
                <Router />
            </StyleContent>
        </Provider>
     </StyleApp>
   )
}

export default App
