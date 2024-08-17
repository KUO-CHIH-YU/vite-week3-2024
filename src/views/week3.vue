<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="d in data"
            :key="data.id"
            @click.prevent="addToCart(d)"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">
                {{ d.name }}
                <small>${{ d.price }}</small>
              </h5>
            </div>
            <p class="mb-1">{{ d.detail }}</p>
          </a>
        </div>
      </div>
      <div class="col-md-8">
        <div v-if="cart.length === 0" class="alert alert-primary text-center" role="alert">
          請選擇商品
        </div>
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" width="50">操作</th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in cart" :key="cart.id">
                <td>
                  <button @click="deleteCart(d.id)" class="btn btn-secondary btn-sm" type="button">
                    x
                  </button>
                </td>
                <td>{{ d.name }}</td>
                <td>
                  <small>{{ d.detail }}</small>
                </td>
                <td>
                  <select class="form-select" v-model="d.amount" @change="updateCart(d)">
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                  </select>
                </td>
                <td>{{ d.price }}</td>
                <td>{{ itemSum(d) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-end mb-3">
            <h4>
              總計：<span>${{ total }}</span>
            </h4>
            <textarea
              class="form-control mb-3"
              rows="3"
              placeholder="備註"
              v-model="description"
            ></textarea>
            <div class="text-end">
              <button @click.prevent="createOrder" class="btn btn-primary">送出</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="!order.id" class="alert alert-primary text-center" role="alert">
          尚未建立訂單
        </div>
        <div v-else class="card">
          <div class="card-body">
            <div class="card-title">
              <h3>訂單</h3>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">品項</th>
                  <th scope="col" width="90">數量</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="d in order.cart" :key="d.id">
                  <td>{{ d.name }}</td>
                  <td>{{ d.amount }}</td>
                  <td>{{ itemSum(d) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="text-end mb-3">
              <div>備註：{{ order.description }}</div>
              <br />
              <h4>
                總計：<span>${{ order.total }}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const data = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    detail: '香濃奶茶搭配QQ珍珠',
    price: 50
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    detail: '清新冬瓜配上新鮮檸檬',
    price: 50
  },
  {
    id: 3,
    name: '翡翠檸檬',
    detail: '綠茶與檸檬的完美結合',
    price: 55
  },
  {
    id: 4,
    name: '四季春茶',
    detail: '香醇四季春茶，回甘無比',
    price: 45
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    detail: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50
  },
  {
    id: 6,
    name: '檸檬冰茶',
    detail: '檸檬與冰茶的清新組合',
    price: 45
  },
  {
    id: 7,
    name: '芒果綠茶',
    detail: '芒果與綠茶的獨特風味',
    price: 55
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    detail: '抹茶與鮮奶的絕配',
    price: 60
  }
])

const order = ref({})
const cart = ref([])
const addToCart = (drink) => {
  const existingDrink = cart.value.find((item) => item.name === drink.name)

  if (existingDrink) {
    existingDrink.amount += 1
  } else {
    cart.value.push({
      ...drink,
      id: new Date().getTime(),
      amount: 1
    })
  }
}

const updateCart = (item) => {
  cart.value = cart.value.map((cartItem) => {
    if (cartItem.id === item.id) {
      cartItem.sum = parseInt(item.price)
    }
    return cartItem
  })
}

const deleteCart = (id) => {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== id)
}

const itemSum = (item) => {
  return item.price * item.amount
}

const total = computed(() => {
  return cart.value.reduce((pre, next) => {
    return pre + next.price * next.amount
  }, 0)
})

const description = ref('')
const createOrder = () => {
  order.value = {
    id: new Date().getTime(),
    cart: cart.value,
    description: description.value,
    total: total.value
  }
  console.log(order.value)
  cart.value = []
  description.value = ''
}
</script>
