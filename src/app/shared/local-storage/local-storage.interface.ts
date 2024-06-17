import { CurrentLevelRound } from '@interfaces/current-level.interface';

export interface LocalStorageUserHintState {
    mute: boolean;
}
export interface LocalStorageUser {
    firstName: string | null;
    surname: string | null;
}
export interface LocalStorageApp {
    user: LocalStorageUser;
    hintState: LocalStorageUserHintState;
    nextLevel: CurrentLevelRound;
    completed: CurrentLevelRound[];
}
export interface LocalStorage {
    storage: Storage;
    keyName: string;
    app: LocalStorageApp;
    checkStorage(): boolean;
    getUserName(): LocalStorageUser;
    saveUserName({ firstName, surname }: LocalStorageUser): void;
    saveStorage(): void;
    saveHintState(options: LocalStorageUserHintState): void;
    getHintState(): LocalStorageUserHintState;
    setNextRound(value: CurrentLevelRound): void;
    getNextRound(): CurrentLevelRound;
    getCompleted(): Array<number[]>;
    userLogged(): boolean;
}
