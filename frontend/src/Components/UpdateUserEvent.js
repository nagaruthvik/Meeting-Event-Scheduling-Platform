const apiUrl = import.meta.env.VITE_API_KEY
export default async function updateUserEvent(data, userId) {
    try {
        const response = await fetch(`${apiUrl}user/update/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const resData = await response.json();

        if (response.ok) {
            console.log("Update successful for user", userId, resData);
        } else {
            console.error("Error updating user", userId, ":", resData);
        }
    } catch (error) {
        console.error("Network error for user", userId, ":", error);
    }
}