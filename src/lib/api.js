const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api/v1';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || 'An error occurred',
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred', 0, { originalError: error.message });
  }
}

export const openingsApi = {
  async getAll() {
    const response = await fetchApi('/openings');
    return response.data || [];
  },

  async getById(id) {
    const response = await fetchApi(`/opening?id=${id}`);
    return response.data;
  },

  async create(opening) {
    const response = await fetchApi('/opening', {
      method: 'POST',
      body: JSON.stringify(opening),
    });
    return response.data;
  },

  async update(id, opening) {
    const response = await fetchApi(`/opening?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(opening),
    });
    return response.data;
  },

  async delete(id) {
    const response = await fetchApi(`/opening?id=${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },
};

export { ApiError };
