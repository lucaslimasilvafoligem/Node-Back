export function isNotEmpty(string) {
    return string && string.replace(/\s+/g, '').length !== 0;
}

export function removeExcessSpaces(string) {
    return string.replace(/\s+/g, ' ').trim();
}

export function equals(obj1, obj2) {
    return obj1 === obj2;
}

export function isValidPassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^:,<>-_!}~{&.*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password) && !/\s/.test(password);
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !/\s/.test(email);
}
