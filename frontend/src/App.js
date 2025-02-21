import axios from "axios";
import React from "react";
import TestForm from "./components/TestForm";

const API_BASE_URL = "http://127.0.0.1:8000"; // Backend URL

function App() {
  return (
    <div>
      <TestForm />
    </div>
  );
}

export default App;

export const runPerformanceTest = async (url) => {
  return axios.post(`${API_BASE_URL}/test/performance`, null, {
    params: { url },
  });
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