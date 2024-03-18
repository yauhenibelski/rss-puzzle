import { CurrentLevelRound } from '@interfaces/current-level';
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
    },

    checkStorage(): boolean {
        const app = this.storage.getItem(this.keyName);
        if (app) this.app = JSON.parse(app);
        return Boolean(app);
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
};

export default localStorage;
