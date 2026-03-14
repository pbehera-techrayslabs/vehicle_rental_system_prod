export function setCookie(name: string, value: string, days: number = 1) {

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
   const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;

}
export function getCookie(name: string): string | null {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}