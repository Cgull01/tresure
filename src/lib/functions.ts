export default function logout() {
    document.cookie = "jwt" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // goto('/')
    window.location.href = '/';
}

export function pad(n:number){return n<10 ? '0'+n : n}
