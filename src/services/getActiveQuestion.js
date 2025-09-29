import config from "../utils/ApiConfig";
export const getActiveQuestion = async () => {
    try {
        const res = await fetch(`${config.API_URL}/api/active-question`);
        return await res.json();
    } catch (err) {
        console.error("Failed to fetch active question:", err);
        return null;
    }
};
