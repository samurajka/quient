const URL = "https://srv.quary.cz/api";

export async function register(login:string, password:string, optional?:object) {
    const res = await fetch(`${URL}/auth/register`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login,
            password,
        }),
    });

    return await res.json();
};

export async function login(login:string, password:string) {
    const res = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login,
            password,
            duration: "24h",
        }),
    });

    return await res.json();
};

