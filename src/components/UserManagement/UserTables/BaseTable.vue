<script setup>
defineProps({
  headers: Array
})
</script>
<template>
  <div class="overflow-x-auto rounded-[20px] mt-8">
    <table class="min-w-full table-auto">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            class="px-4 py-4 text-left bg-slate-800 text-slate-200 font-semibold text-sm"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>