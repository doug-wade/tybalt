import { reactive } from "@tybalt/reactive";

export default async function getObservableAndSubscriber() {
    return new Promise((res, rej) => {
        try {
        const observable = new Observable(subscriber => {
            res({ subscriber, observable });
        })
        } catch (e) {
            rej(e);
        }
    });
}
