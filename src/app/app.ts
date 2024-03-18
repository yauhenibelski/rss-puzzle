// import localStorage from '@shared/local-storage/local-storage';
// import LoginPage from '@pages/login/login-page';
// import StartPage from '@pages/start-screen/start-screen';
import FieldPage from '@pages/field-page/field-page';
// import ResultPage from '@pages/result/result';
import { soundService } from '@shared/sound-service/sound-service';

// import FieldPage from "@pages/field-page/field/field";
class App {
    run() {
        // localStorage.checkStorage();
        document.body.append(
            new FieldPage().getElement(),
            // new ResultPage().getElement(),
            // new LoginPage().getElement(),
            // new StartPage().getElement(),
            // new FieldPage().getElement(),
            // new ResultPage().getElement(),
            soundService.audioElem,
        );
    }
}

export default App;
