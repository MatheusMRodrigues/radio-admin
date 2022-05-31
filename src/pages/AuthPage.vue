<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="text-center" style="margin: 0 !important">
        <img
          class="text-center"
          alt="Quasar logo"
          src="~assets/tv.png"
          style="width: 40%"
        />
      </div>
      <!-- <div class="form-title">RADIO ADMIN</div> -->

      <q-input
        style="width: 100%"
        filled
        type="password"
        v-model="password"
        label="Código de acesso"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      />
      <q-btn
        style="width: 100%"
        padding="15px"
        label="Entrar"
        type="submit"
        color="primary"
      />
    </q-form>
  </q-page>
</template>

<style>
.form-title {
  text-align: center;
  color: #1976d2;
  font-size: 24px;
  font-weight: 700;
}
</style>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import { authDocRef } from "../boot/firebase";
import { getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AuthPage",

  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const password = ref(null);

    return {
      password,

      async onSubmit() {
        const code = await getDoc(authDocRef);
        if (password.value === code.data().passwd) {
          LocalStorage.set("loggedIn", true);
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "check",
            message: "ACESSO PERMITIDO",
          });
          router.push("/");
        } else {
          $q.notify({
            color: "red-4",
            textColor: "white",
            icon: "close",
            message: "ACESSO NEGADO",
          });
        }
      },

      onReset() {
        password.value = null;
      },
    };
  },
});
</script>
