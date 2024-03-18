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
