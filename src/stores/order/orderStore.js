import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/orders'

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref([])
  const order = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(0)
  const pageSize = ref(10)
  const totalPages = ref(0)

  const totalOrders = computed(() => orders.value.length)
  const accessToken = computed(() => localStorage.getItem('access_token'))

  const getAuthHeaders = () => {
    if (!accessToken.value) {
      throw new Error('Unauthorized: No access token found')
    }
    return {
      Authorization: `Bearer ${accessToken.value}`
    }
  }

  const handleError = (err) => {
    error.value = err.response
      ? `Server Error: ${err.response.status} - ${err.response.data.message || err.response.statusText}`
      : err.request
        ? 'No response from server. Please check your network or server status.'
        : `Error: ${err.message}`
  }

  const fetchAllOrders = async (page = 0, size = 10) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(BASE_URL, {
        params: { page, size },
        headers: getAuthHeaders()
      })
      orders.value = response.data.content
      currentPage.value = response.data.number
      pageSize.value = response.data.size
      totalPages.value = response.data.totalPages
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchOrderById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: getAuthHeaders()
      })
      order.value = response.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const createOrder = async (orderData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(BASE_URL, orderData, {
        headers: getAuthHeaders()
      })
      orders.value.push(response.data)
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOrder = async (id, orderData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, orderData, {
        headers: getAuthHeaders()
      })
      const index = orders.value.findIndex((order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteOrder = async (id) => {
    loading.value = true
    error.value = null
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: getAuthHeaders()
      })
      orders.value = orders.value.filter((order) => order.id !== id)
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchOrdersByUser = async (page = 0, size = 10) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${BASE_URL}/user`, {
        params: { page, size },
        headers: getAuthHeaders()
      })
      orders.value = response.data.content
      currentPage.value = response.data.number
      pageSize.value = response.data.size
      totalPages.value = response.data.totalPages
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  // Order Items management

  const addOrderItemToOrder = async (orderId, orderItemData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(`${BASE_URL}/${orderId}/items`, orderItemData,{
        headers: getAuthHeaders()
      });
      const index = orders.value.findIndex((order) => order.id === orderId)
      if (index !== -1) {
        orders.value[index].items.push(response.data)
      }
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  const removeOrderItemFromOrder = async (orderId, orderItemId) => {
    loading.value = true
    error.value = null
    try {
      await axios.delete(`${BASE_URL}/${orderId}/items/${orderItemId}`,{
        headers: getAuthHeaders()
      });
      const index = orders.value.findIndex((order) => order.id === orderId)
      if (index !== -1) {
        orders.value[index].items = orders.value[index].items.filter(
          (item) => item.id !== orderItemId
        )
      }
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    order,
    loading,
    error,
    totalOrders,
    currentPage,
    pageSize,
    totalPages,
    fetchAllOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    fetchOrdersByUser,
    addOrderItemToOrder,
    removeOrderItemFromOrder
  }
})
