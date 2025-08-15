const API_BASE_URL = '/api';

/**
 * Wrapper around fetch providing consistent error handling.
 * @param {string} endpoint API endpoint relative to base URL.
 * @param {RequestInit} options Fetch options.
 * @returns {Promise<any>} Parsed JSON response.
 * @throws {Error} Detailed error describing network or server issues.
 */
const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Request failed with status ${response.status}`);
    }

    // Attempt to parse JSON, falling back to empty object for no content.
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    }

    return {};
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
};

export const addIncomeEntry = (entry) =>
  request('/income', { method: 'POST', body: JSON.stringify(entry) });

export const addExpenseEntry = (entry) =>
  request('/expense', { method: 'POST', body: JSON.stringify(entry) });

export const getIncomeEntries = () => request('/income');

export const getExpenseEntries = () => request('/expense');

export const deleteIncomeEntry = (id) =>
  request(`/income/${id}`, { method: 'DELETE' });

export const deleteExpenseEntry = (id) =>
  request(`/expense/${id}`, { method: 'DELETE' });

export const openDB = async () => Promise.resolve();

export default {};

