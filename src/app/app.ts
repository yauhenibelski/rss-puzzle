import LoginPage from '@pages/login/login-page';

class App {
    run() {
        console.log('work');
        document.body.append(new LoginPage().getElement());
    }
}

export default App;
