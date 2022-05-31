<template>
  <q-page :class="isLoading ? 'flex flex-center' : ''" style="padding: 15px">
    <div v-if="isLoading">
      <q-spinner-orbit color="primary" size="5em" />
    </div>
    <q-form v-else @submit="onSubmit" class="q-gutter-md">
      <div class="form-title">Links</div>

      <div class="inner-subtitle">Transmissão</div>

      <q-input
        style="width: 100% - 60px"
        filled
        type="text"
        v-model="audioLink"
        label="Rádio"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="las la-broadcast-tower" />
        </template>
      </q-input>

      <q-input
        style="width: 100% - 60px"
        filled
        type="text"
        v-model="videoLink"
        label="TV"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="las la-video" />
        </template>
      </q-input>

      <div class="inner-subtitle">Redes sociais</div>

      <q-input
        style="width: 100% - 60px"
        filled
        type="text"
        v-model="whatsappLink"
        label="Whatsapp"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lab la-whatsapp" />
        </template>
      </q-input>

      <q-input
        style="width: 100% - 60px"
        filled
        type="text"
        v-model="instagramLink"
        label="Instagram"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lab la-instagram" />
        </template>
      </q-input>
      <q-input
        style="width: 100% - 60px"
        filled
        type="text"
        v-model="facebookLink"
        label="Facebook"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lab la-facebook" />
        </template>
      </q-input>
      <q-input
        style="width: 100% - 60px"
        filled
        type="twitter"
        v-model="twitterLink"
        label="Twitter"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor, digite alguma coisa',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lab la-twitter" />
        </template>
      </q-input>

      <q-btn
        style="width: calc(100% - 15px)"
        padding="15px"
        label="Salvar"
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
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { linksCollectionRef, linksDocRef } from "../boot/firebase";
import { getDoc, setDoc } from "firebase/firestore";

export default defineComponent({
  name: "LinksPage",

  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const audioLink = ref(null);
    const videoLink = ref(null);
    const instagramLink = ref(null);
    const whatsappLink = ref(null);
    const facebookLink = ref(null);
    const twitterLink = ref(null);

    let isLoading = ref(false);

    onMounted(() => {
      fetchLinksData();
    });

    async function fetchLinksData() {
      isLoading.value = true;
      try {
        let linksSnapshot = await getDoc(linksDocRef);
        isLoading.value = false;
        if (linksSnapshot.exists()) {
          audioLink.value = linksSnapshot.data().audioLink;
          videoLink.value = linksSnapshot.data().videoLink;
          instagramLink.value = linksSnapshot.data().instagramLink;
          whatsappLink.value = linksSnapshot.data().whatsappLink;
          facebookLink.value = linksSnapshot.data().facebookLink;
          twitterLink.value = linksSnapshot.data().twitterLink;
        }
      } catch (error) {
        console.log(error);
        isLoading.value = false;
      }
    }

    return {
      audioLink,
      videoLink,
      instagramLink,
      whatsappLink,
      facebookLink,
      twitterLink,
      isLoading,

      async onSubmit() {
        console.log("Creating Links Document");
        try {
          const result = await setDoc(linksDocRef, {
            audioLink: audioLink.value,
            videoLink: videoLink.value,
            instagramLink: instagramLink.value,
            whatsappLink: whatsappLink.value,
            facebookLink: facebookLink.value,
            twitterLink: twitterLink.value,
          });
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        } catch (error) {
          console.log(error);
        }
      },
    };
  },
});
</script>
