import axios from "axios";
// Define your API endpoints here
const API_ENDPOINTS = {
  // Example endpoint
  getUsers: "/api/users",
  getSocieties: "/societies",
  getPhases: "/phases",
  getCompleteProperties: "/property-list",
  getDealers: "/dealers",
  verification: "/verification",
  getBlock: "/get-block",
};

// Function to make API requests
async function makeRequest(endpoint, options = {}) {
  try {
    const baseURL = process.env.REACT_APP_PUBLIC_URL;
    const response = await axios(`${baseURL}${endpoint}`, options);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Export your API functions
export const getUsers = async () => {
  const endpoint = API_ENDPOINTS.getUsers;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await makeRequest(endpoint, options);
};

export const getSociety = async () => {
  const endpoint = API_ENDPOINTS.getSocieties;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await makeRequest(endpoint, options);
};

export const getDealers = async () => {
  const endpoint = API_ENDPOINTS.getDealers;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await makeRequest(endpoint, options);
};
export const getCompleteProperties = async () => {
  const endpoint = API_ENDPOINTS.getCompleteProperties;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await makeRequest(endpoint, options);
};

export const getPhases = async () => {
  const endpoint = API_ENDPOINTS.getPhases;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await makeRequest(endpoint, options);
};

export const verification = async (plot_no) => {
  const endpoint = `${API_ENDPOINTS.verification}/${plot_no}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await makeRequest(endpoint, options);
};

export const getFromBlockChain = async (block_id) => {
  const endpoint = `${API_ENDPOINTS.getBlock}/${block_id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await makeRequest(endpoint, options);
};

// Add more API functions as needed
