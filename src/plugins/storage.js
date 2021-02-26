/* eslint-disable */
export default Storage = (function() {
    return {
        KEYS: {
            USER: '',
            USER_POWER: '',
        },
        get: (key, isSession) => {
            if (!Storage.isLocalStorage()) {
                return undefined;
            }
            try {
                const value = Storage.getStorage(isSession).getItem(key);
                if (value) {
                    return JSON.parse(value);
                }
            } catch (e) {
                console.log(e);
                return undefined;
            }
        },
        set: (key, value, isSession) => {
            if (!Storage.isLocalStorage()) {
                return undefined;
            }
            value = JSON.stringify(value);
            return Storage.getStorage(isSession).setItem(key, value);
        },
        remove: (key, isSession) => {
            if (!Storage.isLocalStorage()) {
                return undefined;
            }
            return Storage.getStorage(isSession).removeItem(key);
        },
        removeAll: (isSession) => {
            if (!Storage.isLocalStorage()) {
                return undefined;
            }
            return Storage.getStorage(isSession).clear();
        },
        getStorage: (isSession) => (isSession ? sessionStorage : localStorage),
        isLocalStorage: () => {
            try {
                if (!window.localStorage) {
                    console.warn('不支持本地存储!');
                    return false;
                }
                return true;
            } catch (e) {
                console.warn('本地存储已关闭!');
                return false;
            }
        },
    };
}());