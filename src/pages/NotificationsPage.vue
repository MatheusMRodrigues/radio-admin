<template>
  <q-page style="padding: 15px">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="form-title">Enviar notificação</div>

      <q-input
        :disable="loading"
        style="width: 100% - 60px"
        filled
        type="text"
        v-model="title"
        label="Título"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="las la-quote-right" />
        </template>
      </q-input>

      <q-input
        :disable="loading"
        style="width: 100% - 60px"
        filled
        type="textarea"
        v-model="body"
        label="Mensagem"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="las la-sticky-note" />
        </template>
      </q-input>

      <q-select
        :disable="loading"
        filled
        v-model="screen"
        :options="options"
        label="Tela"
      >
        <template v-slot:prepend>
          <q-icon name="las la-mobile" />
        </template>
      </q-select>

      <q-btn
        :disable="!title.length > 0 || !body.length > 0"
        style="width: calc(100% - 15px)"
        padding="15px"
        label="Enviar"
        type="submit"
        color="primary"
      />
    </q-form>
  </q-page>
</template>

<style>
.form-title {
  text-align: start;
  color: #1976d2;
  font-size: 24px;
  font-weight: 700;
}
</style>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LinksPage",

  setup() {
    const title = ref("");
    const body = ref("");
    const screen = ref("HOME");

    const loading = ref(false);

    const screens = { HOME: "/home", TV: "/tv", RÁDIO: "/radio" };

    return {
      title,
      body,
      screen,
      loading,
      screens,
      options: ["HOME", "TV", "RÁDIO"],

      async onSubmit() {
        console.log(screen.value);
        console.log(screens[screen.value]);
        loading.value = true;
        try {
          await axios({
            method: "post",
            url: "https://fcm.googleapis.com/fcm/send",
            data: {
              to: "/topics/newsNotification",
              notification: {
                title: title.value,
                body: body.value,
              },
              data: {
                route: screens[screen.value],
              },
            },
            headers: {
              Authorization:
                "key=AAAA7b0paog:APA91bGoqRBogrnBOYDaTn6ohK6B7qMaZHR0OMTCR55YkNXuMP7pcGs8fVCa_lEMZQKBd23MBkfq4Z0LIyDd2jHMlJAZ4qz4DsbIUtnRZQ4KZEbfsMf5WrKj32MBMjW_2eRz-xV781D8",
            },
          });
          title.value = "";
          body.value = "";
          loading.value = false;
        } catch (error) {
          console.log(error);
          loading.value = false;
        }
      },
    };
  },
});
</script>
