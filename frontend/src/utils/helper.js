export function isAuthenticated() {
    let token = JSON.parse(localStorage.getItem('user'))?.token;
    return token ? true : false;
}
