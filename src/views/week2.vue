<template>
  <h2>註冊</h2>
  <input v-model="SingUpemail" type="Email" placeholder="Email" /> |
  <input v-model="SingUppwd" type="Password" placeholder="Password" /> |
  <input v-model="nickname" type="text" placeholder="Nickname" />
  <br /><br />
  <button @click="singUp" type="button">註冊</button>
  <p>{{ messageSignUp }}</p>

  <h2>登入</h2>
  <input v-model="SingInemail" type="Email" placeholder="Email" /> |
  <input v-model="SingInpwd" type="Password" placeholder="Password" /> | <br /><br />
  <button @click="singIn" type="button">登入</button>
  <p>{{ messageSignIn }}</p>

  <div v-if="verify">
    <h2>驗證</h2>
    <input v-model="token" type="text" placeholder="Token" /> |
    <button @click="checkout" type="button">驗證</button>
    <p>{{ messagecheckout }}</p>

    <h2>登出</h2>
    <input v-model="token" type="text" placeholder="Token" /> |
    <button @click="signOut" type="button">登出</button>
    <p>{{ messagesignOut }}</p>

    <hr />

    <h1>Todo list</h1>
    <input v-model="addtodo" type="text" placeholder="todo" /> |
    <button @click="addtodobtn" type="button">addTodo</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.content }}
        {{ todo.status ? '完成' : '未完成' }}

        <input type="text" placeholder="更新值" @change="updateTodoEdit($event, todo.id)" />
        | <button @click="del(todo.id)" type="button">刪除</button> |
        <button @click="update(todo.id)" type="button">更新</button> |
        <button @click="togglestatus(todo.id)" type="button">切換狀態</button>
      </li>
    </ul>
  </div>
  <br /><br /><br />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const url = 'https://todolist-api.hexschool.io'

const SingUpemail = ref('')
const SingUppwd = ref('')
const nickname = ref('')
let uid = ref('')
const messageSignUp = ref('')

const singUp = async () => {
  try {
    const res = await axios.post(`${url}/users/sign_up`, {
      email: SingUpemail.value,
      password: SingUppwd.value,
      nickname: nickname.value
    })
    console.log(res.data)
    messageSignUp.value = '註冊成功. UID: ' + res.data.uid
  } catch (error) {
    messageSignUp.value = '錯誤'
  }
}

const SingInemail = ref('')
const SingInpwd = ref('')
const messageSignIn = ref('')
const token = ref('')
const verify = ref(false)
const messagecheckout = ref('')
const messagesignOut = ref('')

const singIn = async () => {
  try {
    const res = await axios.post(`${url}/users/sign_in`, {
      email: SingInemail.value,
      password: SingInpwd.value
    })
    // console.log(res.data)
    messageSignIn.value = 'token: ' + res.data.token
    token.value = res.data.token
  } catch (error) {
    messageSignIn.value = '錯誤'
  }
}

const checkout = async () => {
  try {
    const res = await axios.get(`${url}/users/checkout`, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res.data.uid)
    uid = res.data.uid
    if (uid || document.cookie) {
      document.cookie = `todo=${token.value};`
      verify.value = true
      getTodos()
    }
    messagecheckout.value = '驗證成功 UID: ' + res.data.uid
  } catch (error) {
    messagecheckout.value = '驗證失敗'
  }
}

const TodoToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('todo='))
  ?.split('=')[1]

console.log(document.cookie)
onMounted(() => {
  if (TodoToken) {
    token.value = TodoToken
    verify.value = true
    getTodos()
  }
})

const signOut = async () => {
  try {
    const res = await axios.post(
      `${url}/users/sign_out`,
      {},
      {
        headers: { authorization: token.value }
      }
    )
    // console.log(res.data)
    verify.value = false
    document.cookie += '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    messagesignOut.value = res.data.message
  } catch (error) {
    messagesignOut.value = '登出失敗' + error.message
  }
}

const todos = ref([])
const todoEdit = ref({})
const addtodo = ref('')

const getTodos = async () => {
  const response = await axios.get(`${url}/todos`, {
    headers: {
      authorization: token.value
    }
  })
  // console.log(todos.value)
  todos.value = response.data.data
}

const addtodobtn = async () => {
  try {
    const res = await axios.post(
      `${url}/todos`,
      {
        content: addtodo.value
      },
      {
        headers: { authorization: token.value }
      }
    )
    console.log(res.data)
    getTodos()
  } catch (error) {
    console.log(error.data)
  }
}

const del = async (id) => {
  try {
    const res = await axios.delete(`${url}/todos/${id}`, {
      headers: { authorization: token.value }
    })
    getTodos()
  } catch (error) {
    console.log(error.data)
  }
}

const update = async (id) => {
  // const todo = todos.value.find((todo) => todo.id === id)
  console.log(id)
  try {
    const res = await axios.put(
      `${url}/todos/${id}`,
      {
        content: todoEdit.value[id]
      },
      {
        headers: { authorization: token.value }
      }
    )
    console.log(res.data)
    getTodos()
  } catch (error) {
    console.log(error.data)
  }
}

const updateTodoEdit = (event, id) => {
  todoEdit.value = { ...todoEdit.value, [id]: event.target.value }
}

const togglestatus = async (id) => {
  try {
    const res = await axios.patch(
      `${url}/todos/${id}/toggle`,
      {},
      {
        headers: { authorization: token.value }
      }
    )
    getTodos()
  } catch (error) {
    console.log(error.data)
  }
}
</script>
