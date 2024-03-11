type Subscriber<T> = (data: T) => void;

export class Observable<T> {
    private observers: Subscriber<T>[] = [];

    public subscribe(subscriber: Subscriber<T>): void {
        this.observers.push(subscriber);
    }

    public unsubscribe(subscriber: Subscriber<T>): void {
        const index = this.observers.indexOf(subscriber);
        if (index) {
            this.observers.splice(index, 1);
        }
    }

    public publish(data: T): void {
        this.observers.forEach(cb => {
            cb(data);
        });
    }
}

export default Observable;
