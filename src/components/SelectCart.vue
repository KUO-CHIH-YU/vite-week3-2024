<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps(['cart'])
const emit = defineEmits(['deleteCart', 'updateCart', 'itemSum'])
</script>

<template>
  <tr v-for="d in cart" :key="cart.id">
    <td>
      <button @click="emit('deleteCart', d.id)" class="btn btn-secondary btn-sm" type="button">
        x
      </button>
    </td>
    <td>{{ d.name }}</td>
    <td>
      <small>{{ d.detail }}</small>
    </td>
    <td>
      <select class="form-select" v-model="d.amount" @change="emit('updateCart', d)">
        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
      </select>
    </td>
    <td>{{ d.price }}</td>
    <td>{{ emit('itemSum', d) }}</td>
  </tr>
</template>
