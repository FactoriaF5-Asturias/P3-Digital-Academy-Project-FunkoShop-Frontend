<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BaseTable from '@/components/AdminDashboard/AdminTables/BaseTable.vue'
import BasePagination from '@/components/BaseComponents/BasePagination.vue'
import { useOrderStore } from '@/stores/order/orderStore'
import OrderTableRow from './OrderTableRow.vue'
const orderStore = useOrderStore()
const {
  orders,
  currentPage,
  totalPages,
  isLoading: orderLoading,
  error: orderError
} = storeToRefs(orderStore)
const itemsPerPage = 10


onMounted(() => {
  orderStore.fetchOrdersByUser()
})
const handlePageChange = (newPage) => {
  orderStore.fetchOrdersByUser(newPage, itemsPerPage)
}

</script>
<template>
  <div v-if="orderLoading" class="flex justify-center">
    <p>Loading orders...</p>
  </div>
  <div v-else-if="orderError" class="text-center mt-2 text-red-500">
    <p>Error: {{ orderError }}</p>
  </div>
  <div v-else>
    <BaseTable :headers="['Order ID', 'User ID', 'Total Items', 'Total Price', 'Status']">
      <OrderTableRow v-for="order in orders" :key="order.order_id" :order="order" />
    </BaseTable>
    <BasePagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="handlePageChange"
    />
  </div>
</template>