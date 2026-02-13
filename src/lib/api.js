const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api/v1';

async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config).catch(() => null);

  if (!response) {
    throw new Error('Network error occurred');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed (${response.status})`);
  }

  return await response.json();
}

function normalizeOpening(data) {
  return {
    id: data.ID,
    role: data.Role,
    company: data.Company,
    location: data.Location,
    remote: data.Remote,
    link: data.Link,
    salary: data.Salary,
    createdAt: data.CreatedAt,
    updatedAt: data.UpdatedAt,
  };
}

export const openingsApi = {
  async getAll() {
    const response = await fetchApi('/openings');
    const data = response.data || [];
    return data.map(normalizeOpening);
  },

  async getById(id) {
    const response = await fetchApi(`/opening?id=${id}`);
    return normalizeOpening(response.data);
  },

  async create(opening) {
    const response = await fetchApi('/opening', {
      method: 'POST',
      body: JSON.stringify(opening),
    });
    return normalizeOpening(response.data);
  },

  async update(id, opening) {
    const response = await fetchApi(`/opening?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(opening),
    });
    return normalizeOpening(response.data);
  },

  async delete(id) {
    const response = await fetchApi(`/opening?id=${id}`, {
      method: 'DELETE',
    });
    return response.data;
  },
};

