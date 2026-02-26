const API_URL =
  process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.length > 0
    ? process.env.NEXT_PUBLIC_API_URL
    : ''

async function fetchApi<T>(endpoint: string): Promise<{ success: boolean; data: T }> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`)
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      throw new Error(response.ok ? 'Invalid response format' : `Request failed (${response.status})`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

export const publicApi = {
  async getSite() {
    return fetchApi('/api/public/site')
  },
  
  async getWeeklyPrograms() {
    return fetchApi('/api/public/programs/weekly')
  },
  
  async getPrograms(day?: string) {
    const url = day ? `/api/public/programs?day=${day}` : '/api/public/programs'
    return fetchApi(url)
  },
  
  async getUpcomingEvents() {
    return fetchApi('/api/public/events/upcoming')
  },
  
  async getEvents(cursor?: string, limit?: number) {
    const params = new URLSearchParams()
    if (cursor) params.append('cursor', cursor)
    if (limit) params.append('limit', limit.toString())
    const query = params.toString()
    return fetchApi(`/api/public/events${query ? `?${query}` : ''}`)
  },
  
  async getLive() {
    return fetchApi('/api/public/live')
  },
  
  async getSermonSource() {
    return fetchApi('/api/public/sermons/source')
  },
  
  async getSermons() {
    return fetchApi('/api/public/sermons')
  },
  
  async getLeaders() {
    return fetchApi('/api/public/leaders')
  },

  async getLinks() {
    return fetchApi('/api/public/links')
  },
}

async function fetchApiWithAuth<T>(endpoint: string, token: string, options: RequestInit = {}): Promise<{ success: boolean; data: T }> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    })
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      throw new Error(response.ok ? 'Invalid response format' : `Request failed (${response.status})`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

export const adminApi = {
  async login(username: string, password: string) {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    let data: { success?: boolean; data?: any; error?: string }
    try {
      data = await response.json()
    } catch {
      data = { success: false, error: response.ok ? 'Invalid response' : 'Server error. Is the API running on ' + (API_URL || 'localhost:3001') + '?' }
    }
    if (!response.ok && data && !data.error) {
      data.error = response.status === 500 ? 'Server error. Check API is running and database is set up.' : 'Login failed.'
    }
    return data
  },

  async getPrograms(token: string) {
    return fetchApiWithAuth('/api/admin/programs', token)
  },

  async createProgram(token: string, programData: any) {
    return fetchApiWithAuth('/api/admin/programs', token, {
      method: 'POST',
      body: JSON.stringify(programData),
    })
  },

  async updateProgram(token: string, id: string, programData: any) {
    return fetchApiWithAuth(`/api/admin/programs/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(programData),
    })
  },

  async deleteProgram(token: string, id: string) {
    return fetchApiWithAuth(`/api/admin/programs/${id}`, token, {
      method: 'DELETE',
    })
  },

  async getAdmins(token: string) {
    return fetchApiWithAuth('/api/admin/admins', token)
  },

  async createAdmin(token: string, adminData: any) {
    return fetchApiWithAuth('/api/admin/admins', token, {
      method: 'POST',
      body: JSON.stringify(adminData),
    })
  },

  async getLive(token: string) {
    return fetchApiWithAuth('/api/admin/live', token)
  },

  async updateLive(token: string, liveData: any) {
    return fetchApiWithAuth('/api/admin/live', token, {
      method: 'PUT',
      body: JSON.stringify(liveData),
    })
  },

  async getSermons(token: string) {
    return fetchApiWithAuth('/api/admin/sermons', token)
  },

  async createSermon(token: string, sermonData: any) {
    return fetchApiWithAuth('/api/admin/sermons', token, {
      method: 'POST',
      body: JSON.stringify(sermonData),
    })
  },

  async updateSermon(token: string, id: string, sermonData: any) {
    return fetchApiWithAuth(`/api/admin/sermons/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(sermonData),
    })
  },

  async deleteSermon(token: string, id: string) {
    return fetchApiWithAuth(`/api/admin/sermons/${id}`, token, {
      method: 'DELETE',
    })
  },

  async getUpdateLinks(token: string) {
    return fetchApiWithAuth('/api/admin/update-links', token)
  },

  async createUpdateLink(token: string, data: { title: string; url: string; description?: string; category?: string; is_active?: boolean; display_order?: number }) {
    return fetchApiWithAuth('/api/admin/update-links', token, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async updateUpdateLink(token: string, id: string, data: { title?: string; url?: string; description?: string; category?: string; is_active?: boolean; display_order?: number }) {
    return fetchApiWithAuth(`/api/admin/update-links/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  async deleteUpdateLink(token: string, id: string) {
    return fetchApiWithAuth(`/api/admin/update-links/${id}`, token, {
      method: 'DELETE',
    })
  },
}
