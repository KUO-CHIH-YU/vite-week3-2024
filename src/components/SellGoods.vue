<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['data'])
const emit = defineEmits(['addToCart'])
</script>

<template>
  <a
    href="#"
    class="list-group-item list-group-item-action"
    v-for="d in data"
    :key="data.id"
    @click.prevent="emit('addToCart', d)"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        {{ d.name }}
        <small>${{ d.price }}</small>
      </h5>
    </div>
    <p class="mb-1">{{ d.detail }}</p>
  </a>
</template>
