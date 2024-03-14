export interface LocalStorageUser {
    firstName: string | null;
    surname: string | null;
}

export interface LocalStorage {
    storage: Storage;
    keyName: string;
    app: {
        user: LocalStorageUser;
    };
    checkStorage(): boolean;
    getUserName(): LocalStorageUser;
    saveUserName({ firstName, surname }: LocalStorageUser): void;
    saveStorage(): void;
}
