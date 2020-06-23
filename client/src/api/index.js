import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})

export const insertServer = payload => api.post(`/server-list`, payload)
export const getAllServers = () => api.get(`/server-list`)
export const updateServerById = (id, payload) => api.put(`/server-list/${id}`, payload)
export const deleteServerById = id => api.delete(`/server-list/${id}`)
export const getServerById = id => api.get(`/server-list/${id}`)

const apis = {
    insertServer,
    getAllServers,
    updateServerById,
    deleteServerById,
    getServerById,
}

export default apis 