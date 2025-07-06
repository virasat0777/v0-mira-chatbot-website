class ApiService {
  private baseUrl: string

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl.replace(/\/$/, "")
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const text = await response.text()

      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      try {
        return JSON.parse(text)
      } catch (parseError) {
        console.warn("Non-JSON response:", text)
        return { message: text }
      }
    } catch (error) {
      console.error("API Request failed:", error)
      throw error
    }
  }

  async getProjects() {
    return this.request("/api/projects/")
  }

  async getProject(id: string) {
    return this.request(`/api/projects/${id}`)
  }

  async getNews() {
    return this.request("/api/news/")
  }

  async getBlogs() {
    return this.request("/api/blogs/")
  }

  async getCareers() {
    return this.request("/api/careers/")
  }

  async getTeam() {
    return this.request("/api/team/")
  }

  async getSettings() {
    return this.request("/api/settings/")
  }

  async submitContact(data: any) {
    return this.request("/api/contact/", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

// Named export
export { ApiService }

// Default export
export default ApiService

// Singleton instance
export const apiService = new ApiService()
