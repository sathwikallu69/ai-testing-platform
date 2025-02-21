import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Your FastAPI backend URL

const testPerformance = async () => {
  const url = "https://example.com"; // Replace with user input
  const encodedUrl = encodeURIComponent(url);

  console.log("Sending request to backend..."); // Debugging log

  try {
    const response = await fetch(`http://127.0.0.1:8000/test/performance?url=${encodedUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Optional but good practice
      },
    });

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

testPerformance(); // Run the function

export const runPerformanceTest = async (url) => {
  try {
      const response = await fetch(`${API_BASE_URL}/test/performance?url=${encodeURIComponent(url)}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error("Failed to fetch test results");
      }

      return await response.json(); // Return JSON response
  } catch (error) {
      console.error("Error running performance test:", error);
      return { error: error.message };
  }
};

export const runFunctionalityTest = async (component) => {
  return axios.post(`${API_BASE_URL}/test/functionality`, null, {
    params: { component },
  });
};

export const runSecurityTest = async (endpoint) => {
  return axios.post(`${API_BASE_URL}/test/security`, null, {
    params: { endpoint },
  });
};