import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    async login({ email, password }) {
      this.loading = true
      this.error = null
      try {
        // TODO: call your real API here
        // const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {...})
        // const data = await res.json()

        // Mock success:
        await new Promise(r => setTimeout(r, 600))
        const data = { token: 'fake_jwt_token', user: { id: 1, name: 'Nail Artist', email } }

        this.token = data.token
        this.user = data.user
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      } catch (e) {
        this.error = 'Invalid credentials'
        return false
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
