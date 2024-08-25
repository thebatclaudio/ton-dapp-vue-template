<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { store } from './common/store'

import Navbar from './components/common/Navbar.vue'

const router = useRouter()

const loading = ref(true);
const preventCollapse = function (event) {
  if (window.scrollY === 0) {
    window.scrollTo(0, 1);
  }
}

onMounted(async () => {
  await store.init()
  loading.value = false;
  router.push('/home');
})
</script>

<template>

  <div class="relative z-10">
    <div class="flex flex-col h-[100vh]">
      <div id="content" class="flex-1 overflow-auto p-4" v-on:touchstart="preventCollapse(event)">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
      <div id="navbar-container" v-if="!loading" class="relative p-3 bg-black">
        <Navbar class="relative z-20"></Navbar>
      </div>
    </div>
  </div>
</template>

<style>
#navbar-container::before {
  content: "";
  position: absolute;
  height: 40px;
  top: -40px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
  z-index: 10;
}
</style>