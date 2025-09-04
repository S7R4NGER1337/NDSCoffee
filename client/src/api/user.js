export const userAuthenticated = async (userData) => {
    const response = await fetch("http://localhost:3030/login", {
        method: "POST",
        body: JSON.stringify({
            name: userData.username,
            password: userData.password,
        }),
        headers: {
            "Content-type": "application/json",
        },
    });

    return response.json()
} 
