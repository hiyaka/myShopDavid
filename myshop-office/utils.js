export function getUser() {
    let user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
}



export function getUserToken() {
    let user = getUser();
    if (!user) return "";
    return user.token;
}