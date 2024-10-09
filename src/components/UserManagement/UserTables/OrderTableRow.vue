<script setup>
defineProps({
  order: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <tr class="bg-slate-50 hover:bg-gray-100 text-slate-900 border-t border-slate-300">
    <td class="px-4 py-3 font-semibold">{{ order.order_id }}</td>
    <td class="px-4 py-3">{{ order.user_id }}</td>
    <td class="px-4 py-3">{{ order.total_items }}</td>
    <td class="px-4 py-3">{{ order.total_price }}</td>
    <td class="px-4 py-3">{{ order.status }}</td>
  </tr>
</template>