<script setup>
import { computed, onMounted, reactive, ref } from 'vue';

// component logic
// declare some reactive state here.
const props = defineProps({
  msg: String,
});
console.log('props.msg:', props.msg);

const emit = defineEmits(['response']);
emit('response', 'hello from child');

const message = ref('Hello World');
const counter = reactive({ count: 0 });
const titleClass = ref('title');

const count = ref(0);
function increment() {
  count.value++;
}
// Guide - Watchers.
watch(count, (newCount) => {
  // yes, console.log() is a side effect
  console.log(`new count is: ${newCount}`);
});

const text = ref('tttttt');
function onInput(e) {
  text.value = e.target.value;
  console.log(e);
}

const awesome = ref(true);
function toggle() {
  if (awesome.value === true) {
    awesome.value = false;
  } else if (awesome.value === false) {
    awesome.value = true;
  }
}

let id = 0;
const hideCompleted = ref(false);
const newTodo = ref('');
const todos = ref([
  { id: id++, text: 'Learn HTML', done: true },
  { id: id++, text: 'Learn Javascript', done: true },
  { id: id++, text: 'Learn Vue', done: false },
]);
const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
});
function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false });
  newTodo.value = '';
}
function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo);
}

const pElementRef = ref(null);
onMounted(() => {
  pElementRef.value.textContent = 'mounted!';
});
</script>

<template>
  <!--
    Guide - Template Syntax.
   -->
  <h1 v-bind:class="titleClass">{{ message }}</h1>
  <!-- <h1 :class="titleClass">{{ message }}</h1> -->

  <!--
    Guide - Event Handling.
    and
    Guide - Watchers.
   -->
  <div>{{ counter.count }}</div>
  <button v-on:click="increment">{{ count }}</button>
  <!-- <button @click="increment">{{ count }}</button> -->

  <!--
    Guide - Form Bindings.
  -->
  <input :value="text" @input="onInput" />
  <!-- <input v-model="text" placeholder="Type here" /> -->
  <p>{{ text }}</p>

  <!--
    Guide - Conditional Rendering
  -->
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome</h1>
  <h1 v-else>Oh no</h1>

  <!--
    Guide - List Rendering
    and
    Computed Property
   -->
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">{{ hideCompleted ? 'Show all' : 'Hide Completed' }}</button>

  <!--
    Lifecycle and Template Refs
   -->
  <p ref="pElementRef">hello</p>

  <!--
    slot
   -->
  <slot>Fallback content</slot>
</template>

<style>
.title {
  color: red;
}
.done {
  text-decoration: line-through;
}
</style>
