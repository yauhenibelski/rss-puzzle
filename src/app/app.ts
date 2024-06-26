import { soundService } from '@shared/sound-service/sound-service';
import createElement from '@utils/create-element';
import { router } from '../router/router';

class App {
    root = document.body;

    run(): void {
        const routOutput = createElement({ tag: 'div', style: 'router' });

        this.root.append(routOutput, soundService.audioElem);
        router();
    }
}

export default App;
