export default function logout() {
    document.cookie = "jwt" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // goto('/')
    window.location.href = '/';
}