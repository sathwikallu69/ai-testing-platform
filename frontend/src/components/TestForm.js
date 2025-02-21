import { useState } from "react";
import { runPerformanceTest, runFunctionalityTest, runSecurityTest } from "../api"; 

const TestForm = () => {
    const [url, setUrl] = useState("");
    const [selectedTest, setSelectedTest] = useState("performance"); // Default test
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTest = async () => {
        setLoading(true);
        setError(null);
        setTestResult(null);

        let result;
        try {
            if (selectedTest === "performance") {
                result = await runPerformanceTest(url);
            } else if (selectedTest === "functionality") {
                result = await runFunctionalityTest(url);
            } else if (selectedTest === "security") {
                result = await runSecurityTest(url);
            }

            if (result.error) {
                setError(result.error);
            } else {
                setTestResult(result); // Store response in state
            }
        } catch (err) {
            setError("Failed to fetch test results.");
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>AI Testing Platform</h2>

            {/* Dropdown to select test type */}
            <label>Select Test Type:</label>
            <select value={selectedTest} onChange={(e) => setSelectedTest(e.target.value)}>
                <option value="performance">Performance Test</option>
                <option value="functionality">Functionality Test</option>
                <option value="security">Security Test</option>
            </select>

            {/* URL Input Field */}
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
            />

            {/* Run Test Button */}
            <button onClick={handleTest} disabled={loading}>
                {loading ? "Testing..." : "Run Test"}
            </button>

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {/* Test Output */}
            {testResult && (
                <div>
                    <h3>Test Output</h3>
                    <pre>{JSON.stringify(testResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default TestForm;