<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <img
            alt="Painel logo"
            src="~assets/tv-icon.png"
            style="width: 28px"
          />
          <q-toolbar-title shrink class="text-weight-bold">
            PAINEL ADMIN
          </q-toolbar-title>
        </q-btn>
        <q-space />
        <q-btn
          flat
          dense
          label="Sair"
          @click="logout"
          aria-label="Sair"
          icon="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header class="text-weight-bold text-uppercase">
            Inicio
          </q-item-label>

          <q-item
            v-for="link in links1"
            :key="link.text"
            @click="$router.push(link.url)"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item-label header class="text-weight-bold text-uppercase">
            Gerenciamento do app
          </q-item-label>

          <q-item
            v-for="link in links2"
            :key="link.text"
            @click="$router.push(link.url)"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase">
            outros
          </q-item-label>

          <q-item
            v-for="link in links3"
            :key="link.text"
            @click="close"
            v-ripple
            clickable
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LocalStorage } from "quasar";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";

export default defineComponent({
  name: "MainLayout",

  // components: {
  //   EssentialLink,
  // },

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    const currentRoute = computed(() => {
      return useRoute().name;
    });

    function logout() {
      LocalStorage.clear();
      router.push("/auth");
    }

    return {
      currentRoute,
      fabYoutube,
      leftDrawerOpen,
      toggleLeftDrawer,
      logout,
      links1: [{ icon: "home", text: "Home", url: "/" }],
      links2: [
        { icon: "currency_exchange", text: "Anunciantes", url: "/sponsors" },
        {
          icon: "notifications_active",
          text: "Notificações",
          url: "/notifications",
        },
        { icon: "link", text: "Links", url: "/links" },
      ],
      links3: [{ icon: "close", text: "Sair" }],
    };
  },
});
</script>
