// import LoginPage from '@pages/login/login-page';
// import StartPage from '@pages/start-screen/start-screen';

import FieldPage from '@pages/field-page/field-page';

// import FieldPage from "@pages/field-page/field/field";
class App {
    run() {
        document.body.append(
            // new LoginPage().getElement(),
            // new StartPage().getElement(),
            // new FieldPage().getElement(),
            new FieldPage().getElement(),
        );
    }
}

export default App;
