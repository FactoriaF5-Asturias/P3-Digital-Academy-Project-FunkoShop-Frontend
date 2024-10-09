<script setup>
import { useAuthStore } from '@/stores/auth'
import { ModalStore } from '@/stores/modals/ModalStore';
import { useI18n } from 'vue-i18n'
import '@material-tailwind/html/scripts/popover.js'
import { logoutStore } from '@/stores/logout'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import LoginModal from '../auth/LoginModal.vue'
import RegisterModal from '../auth/RegisterModal.vue'

const modal = ModalStore()
const auth = useAuthStore()
const logout = logoutStore()
const { t } = useI18n()
</script>

<template>
  <div v-if="!auth.user.isAuthenticated" class="relative">
    <TransitionRoot as="template" :show="modal.openLogin">
      <Dialog class="relative z-10" @close="modal.close()">
        <!-- Contenido del modal de login -->
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="shadow-xl transition-all w-full max-w-md rounded-2xl">
                <LoginModal />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Modal para registro -->
    <TransitionRoot as="template" :show="modal.openRegister">
      <Dialog class="relative z-10" @close="modal.close()">
        <!-- Contenido del modal de registro -->
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="shadow-xl transition-all w-full max-w-md rounded-2xl">
                <RegisterModal />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Botones para abrir los modales -->
    <button @click="modal.open('register')" class="font-bold">{{ t('register') }}</button>
    <button @click="modal.open('login')" class="font-bold pl-3">{{ t('login') }}</button>
  </div>

  <div v-else role="menu" class="relative">
    <!-- Profile dropdown -->
    <Menu as="div" class="relative">
      <div>
        <MenuButton
          class="inline-flex flex-shrink-0 items-center justify-center px-1.5 py-1.5 bg-white text-black hover:bg-gray-300 rounded-md transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </MenuButton>
      </div>
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem v-slot="{ active }">
          <a href="/profile" :class="[
            active ? 'bg-gray-100' : '',
            ' px-4 py-2 text-sm text-gray-700 flex flex-row'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              class="w-5 h-5 text-dark-500 mr-3">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                clip-rule="evenodd" />
            </svg>
            {{ t('yourProfile') }}
          </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a href="/favorite" :class="[active ? 'bg-gray-100' : '', ' px-4 py-2 text-sm text-gray-700 flex flex-row']">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-5 h-5 text-red-500 mr-3">
              <path fill-rule="evenodd"
                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                clip-rule="evenodd" />
            </svg>
            Wishlist
          </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a href="/orders" :class="[active ? 'bg-gray-100' : '', ' px-4 py-2 text-sm text-gray-700 flex flex-row']">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              class="w-5 h-5 text-slate-400 mr-3">
              <path fill-rule="evenodd"
                d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z"
                clip-rule="evenodd" />
            </svg>
            Orders
          </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a href="#" @click="logout.logout()" :class="[
            active ? 'bg-gray-100' : '',
            ' px-4 py-2 text-sm text-gray-700 flex flex-row'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-5 h-5 text-dark-500 mr-3">
              <path fill-rule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                clip-rule="evenodd"></path>
            </svg>
            {{ t('logout') }}
          </a>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>