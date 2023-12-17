export type Reactive<T> = {
    value: T;
    addListener(arg0: () => void): void;
    isForcingRerenderOnUpdate: boolean;
};
