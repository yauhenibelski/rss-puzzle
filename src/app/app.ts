// import LoginPage from '@pages/login/login-page';
import StartPage from '@pages/start-screen/start-screen';

class App {
    run() {
        document.body.append(
            // new LoginPage().getElement(),
            new StartPage().getElement(),
        );
    }
}

export default App;
