export const scanPortfolio = async (url) => {
    let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
    // Sanitize URL: Remove trailing slash if present to avoid double slashes
    if (API_BASE_URL.endsWith('/')) {
        API_BASE_URL = API_BASE_URL.slice(0, -1);
    }

    console.log("Scanning via API:", API_BASE_URL); // Debug log

    try {
        const response = await fetch(`${API_BASE_URL}/scan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Scan failed with status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("API Scan Error:", error);
        throw error;
    }
}
