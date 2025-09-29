import config from "../utils/ApiConfig";
export const createQuestion = async (payload) => {
    try {
        const res = await fetch(`${config.API_URL}/api/question`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        return await res.json();
    } catch (err) {
        console.error("Error creating question:", err);
    }
};
