<script setup>
import { ref } from 'vue'
const data = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    detail: '香濃奶茶搭配QQ珍珠',
    price: 50,
    amount: 20,
    editing: false
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    detail: '清新冬瓜配上新鮮檸檬',
    price: 50,
    amount: 20,
    editing: false
  },
  {
    id: 3,
    name: '翡翠檸檬',
    detail: '綠茶與檸檬的完美結合',
    price: 55,
    amount: 34,
    editing: false
  },
  {
    id: 4,
    name: '四季春茶',
    detail: '香醇四季春茶，回甘無比',
    price: 45,
    amount: 10,
    editing: false
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    detail: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    amount: 25,
    editing: false
  },
  {
    id: 6,
    name: '檸檬冰茶',
    detail: '檸檬與冰茶的清新組合',
    price: 45,
    amount: 20,
    editing: false
  },
  {
    id: 7,
    name: '芒果綠茶',
    detail: '芒果與綠茶的獨特風味',
    price: 55,
    amount: 18,
    editing: false
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    detail: '抹茶與鮮奶的絕配',
    price: 60,
    amount: 20,
    editing: false
  }
])
const edittype = ref({ edit: false })

const add = (d) => {
  d.amount++
}

const reduce = (d) => {
  if (d.amount > 0) {
    d.amount--
  }
}

const edit = (edittype) => {
  edittype.edit = !edittype.edit
  data.value = data.value.map((x) => {
    x.editing = !x.editing
    return x
  })
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col">價格</th>
        <th scope="col">庫存</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in data" :key="data.id">
        <span v-if="!d.editing">{{ d.name }}</span>
        <input v-else type="text" v-model="d.name" />
        <td>
          <small>{{ d.detail }}</small>
        </td>
        <td>{{ d.price }}</td>
        <td>
          <button type="button" @click="reduce(d)">-</button>{{ d.amount
          }}<button type="button" @click="add(d)">+</button>
        </td>
      </tr>
      <br />
      <button type="button" @click="edit(edittype)">
        {{ edittype.edit ? '儲存' : '編輯' }}
      </button>
    </tbody>
  </table>
</template>
