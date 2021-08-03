export const getRandomArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export const query = async <T>(resolveCallback?: () => T, rejectCallback?: () => T): Promise<T> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resolveCallback) resolve(resolveCallback());
            if (rejectCallback) reject(rejectCallback());
        }, getRandomArbitrary(300, 1000));
    });
};
