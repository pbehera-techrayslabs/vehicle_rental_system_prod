const USERS_KEY = "users";
export function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
export function saveUsers(users: any[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
export function addUser(user: any) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}
export function deleteUser(id: number) {
    let users = getUsers();
    users = users.filter((u: any) => u.id !== id);
    saveUsers(users);
}
export function findUserByEmail(email: string) {
    const users = getUsers();
    return users.find((u: any) => u.email === email);
}