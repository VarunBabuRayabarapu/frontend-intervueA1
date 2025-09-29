import config from "../utils/ApiConfig";
export const fetchAllQuestions = async () => {
    try {
        const res = await fetch(`${config.API_URL}/api/questions`);
        const data = await res.json();
        return data;
    } catch (err) {
        return [];
    }
};
