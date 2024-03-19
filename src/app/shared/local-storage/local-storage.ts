import { CurrentLevelRound } from '@interfaces/current-level.interface';
import { wordCollection } from '@shared/wordCollection';
import { currentLevel } from '@shared/observables';
import { LocalStorage, LocalStorageUser, LocalStorageUserHintState } from './local-storage.interface';

const localStorage: LocalStorage = {
    storage: window.localStorage,
    keyName: 'rss-puzzle',
    app: {
        user: {
            firstName: null,
            surname: null,
        },
        hintState: {
            mute: true,
        },
        nextLevel: {
            level: 0,
            round: 0,
        },
        completed: [],
    },

    checkStorage(): boolean {
        const app = this.storage.getItem(this.keyName);
        if (app) this.app = JSON.parse(app);
        return Boolean(app);
    },

    userLogged(): boolean {
        this.checkStorage();
        return Object.values(this.app.user).every(name => name);
    },

    getUserName(): LocalStorageUser {
        this.checkStorage();
        return this.app.user;
    },

    saveHintState(options: LocalStorageUserHintState): void {
        this.app.hintState = options;

        this.storage.setItem(this.keyName, JSON.stringify(this.app));
    },

    setNextRound(value: CurrentLevelRound): void {
        this.app.completed.push(currentLevel.value);

        this.app.nextLevel = value;

        this.saveStorage();
    },

    getNextRound(): CurrentLevelRound {
        this.checkStorage();
        return this.app.nextLevel;
    },

    getHintState(): LocalStorageUserHintState {
        this.checkStorage();
        return this.app.hintState;
    },

    saveUserName({ firstName, surname }: LocalStorageUser): void {
        const { user } = this.app;
        user.firstName = firstName;
        user.surname = surname;

        this.saveStorage();
    },
    saveStorage(): void {
        this.storage.setItem(this.keyName, JSON.stringify(this.app));
    },
    getCompleted(): Array<number[]> {
        const { completed } = this.app;
        const arr = Array.from({ length: wordCollection.length }, () => []) as Array<number[]>;

        return completed.reduce((acc, { level, round }) => {
            acc[level].push(round);

            return acc;
        }, arr);
    },
};

export default localStorage;
