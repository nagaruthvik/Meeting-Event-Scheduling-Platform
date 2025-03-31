
const apiUrl = import.meta.env.VITE_API_KEY;
export default async function getUserDetails(userIds,isFull) {
    try {
        let userNames = []
        let fullDetails = []
        

        for (let i = 0; i < userIds.length; i++) {
            const response = await fetch(`${apiUrl}user/${userIds[i]}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const userDetails = await response.json();
                fullDetails.push(userDetails.result)
                userNames.push(userDetails.result.firstName);
            } else {
                console.log("Error:", response.statusText);
            }
        }

        return isFull ?   fullDetails :userNames 
       
    } catch (error) {
        console.error("Something went wrong:", error);
        return [];
    }
}
