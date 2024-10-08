
const API_URL = 'http://localhost:5000/api';
export const getReflections = async (id) => {
    const response = await fetch(`${API_URL}/reflections/${id}`);
    return response.json();
};

export const updateReflection = async (id, reflection) => {
    const response = await fetch(`${API_URL}/reflections/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reflection),
    });
    return response.json();
};

export const deleteReflection = async (id) => {
    const response = await fetch(`${API_URL}/reflections/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const loginUser = async ({ email, password }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const registerUser = async ({ email, password }) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};



// Fetch user profile
export const getUserProfile = async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

// Update user profile
export const updateUserProfile = async (userData) => {
    const response = await fetch(`${API_URL}/users/${userData.userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

  


export const createReflection = async (reflection) => {
    const response = await fetch(`${API_URL}/reflections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token
        },
        body: JSON.stringify(reflection),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};






export const getMoodEntries = async (userId) => {
    const response = await fetch(`http://localhost:5000/api/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch mood entries');
    }
    return response.json();
  };
  
  export const createMoodEntry = async (entry) => {
    const response = await fetch('http://localhost:5000/api/mood-entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!response.ok) {
      throw new Error('Failed to create mood entry');
    }
    return response.json();
  };
  
  export const updateMoodEntry = async (_id, entry) => {
    const response = await fetch(`http://localhost:5000/api/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
      
    });
    console.log(_id);
    console.log(entry);
    console.log(response);
    if (!response.ok) {
       
        throw new Error(`HTTP error! status: ${response.status}`); // throw new Error('Failed to update mood entry');
    }
    return response.json();
  };
  
  export const deleteMoodEntry = async (id) => {
    const response = await fetch(`http://localhost:5000/api/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
        console.log(response)
      throw new Error('Failed to delete mood entry');
    }
  };

  export const getRecentMoodEntry = async (userId) => {
  const response = await fetch(`http://localhost:5000/api/mood-entries/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent mood entry');
  }
  return response.json();
};