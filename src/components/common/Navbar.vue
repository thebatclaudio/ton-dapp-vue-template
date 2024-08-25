<script setup>
import { HomeIcon, BeakerIcon } from '@heroicons/vue/24/solid'
import { defineProps, shallowRef } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { store } from '../../common/store';

const props = defineProps(['currentRoute'])

const route = useRoute()

const menuItems = shallowRef([
  {
    'id': 'home',
    'title': 'Home',
    'path': '/home',
    'icon': HomeIcon,
  },
  {
    'id': 'menu-1',
    'title': 'Menu 1',
    'path': '/menu-1',
    'icon': BeakerIcon
  },
  {
    'id': 'menu-2',
    'title': 'Menu 2',
    'path': '/menu-2',
    'icon': BeakerIcon
  },
  {
    'id': 'menu-3',
    'title': 'Menu 3',
    'path': '/menu-3',
    'icon': BeakerIcon
  },
])

const isActive = (path) => {
  return path === route.path;
}
</script>

<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-4 px-5 bg-gray-800 rounded-md">
      <div v-for="item in menuItems">
        <div class="my-2 mx-1 p-1 rounded-md" :class="{ 'bg-blue-600': isActive(item.path) }">
          <RouterLink :to="item.path">
            <div class="flex flex-col text-center">
              <div class="flex justify-center">
                <div class="overflow-hidden flex justify-center bg-contain bg-center rounded-full aspect-square size-10">
                  <div class="flex flex-col justify-center">
                    <component :is="item.icon" class="size-9" />
                  </div>
                </div>
              </div>
              <div class="font-mono uppercase text-[8px] mt-2">{{ item.title }}</div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
