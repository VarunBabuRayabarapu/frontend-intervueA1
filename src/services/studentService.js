import config from "../utils/ApiConfig";
export const addStudent = async (payload) => {
    try {
        const res = await fetch(`${config.API_URL}/api/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        return await res.json();
    } catch (err) {
        console.error("Error adding student:", err);
    }
};

export const getTotalStudents = async () => {
    try {
        const res = await fetch(`${config.API_URL}/api/students-count`);
        const data = await res.json();
        return data.total || 0;
    } catch (err) {
        console.error("Error fetching total students:", err);
        return 0;
    }
};

export const submitAnswer = async (questionId, payload) => {
    try {
        const res = await fetch(`${config.API_URL}/api/answer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ questionId, ...payload }),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
};
