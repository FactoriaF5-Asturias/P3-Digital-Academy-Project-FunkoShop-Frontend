<script setup>
defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <h2 class="text-2xl md:text-4xl font-semibold uppercase text-slate-950">
    {{ title }}
  </h2>
</template>
