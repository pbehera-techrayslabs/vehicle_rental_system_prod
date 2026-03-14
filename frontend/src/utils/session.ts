const SESSION_KEY = "session";
export function setSession(data: any) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}
export function getSession() {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

export function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}
export function isLoggedIn(): boolean {
    return getSession() !== null;
}