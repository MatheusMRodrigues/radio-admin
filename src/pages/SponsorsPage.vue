<template>
  <q-page style="padding: 15px">
    <div class="form-title">Anunciantes</div>

    <div class="inner-subtitle" style="margin: 25px 0">Adicionar novo</div>
    <label for="upload-photo">
      <div class="upload-button">
        <i class="las la-upload"></i> SELECIONAR ARQUIVO
      </div>
    </label>
    <div class="input-group my-3">
      <input id="upload-photo" type="file" @change="selectImage($event)" />
    </div>

    <div style="margin: 10px 0">
      <img class="image-preview" :src="imagePreview" />
    </div>

    <q-btn
      v-if="!imagePreview.includes('https')"
      :disable="isLoading"
      @click="submit()"
      padding="8px"
      color="primary"
    >
      <div v-if="!isLoading">SALVAR</div>
      <q-spinner-orbit v-else color="white" size="1em" />
    </q-btn>

    <div class="inner-subtitle" style="margin: 25px 0">
      Lista de cadastrados
    </div>

    <div v-if="!sponsors.length && !isLoadingList">VAZIO</div>
    <div
      v-else-if="isLoadingList"
      style="text-align: center; margin-top: 100px"
    >
      <q-spinner-orbit color="primary" size="5em" />
    </div>
    <div v-else class="row q-col-gutter-md">
      <div class="col-md-3" v-for="(sponsor, index) in sponsors" :key="index">
        <q-card>
          <img :src="sponsor.imageUrl" class="card-img-top" />
          <div class="card-info">
            <div class="row reverse">
              <q-btn
                @click="deleteSponsor(sponsor.id)"
                padding="8px"
                type="submit"
                color="negative"
                :disable="isLoadingDelete"
              >
                <q-spinner-orbit
                  v-if="isLoadingDelete && inProgressId == sponsor.id"
                  color="white"
                  size="1em"
                />
                <div v-else>EXCLUIR</div>
              </q-btn>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
.card-info {
  padding: 10px;
}

.card-title {
  margin: 0;
}

.card-img-top {
  object-fit: cover;
  width: 100%;
  height: 150px;
}

.image-preview {
  object-fit: cover;
  width: 300px;
  height: 150px;
}

.form-title {
  text-align: start;
  color: #1976d2;
  font-size: 24px;
  font-weight: 700;
}

label {
  cursor: pointer;
  /* Style as you please, it will become the visible UI component. */
}

.upload-button {
  background-color: cornflowerblue;
  width: 200px;
  text-align: center;
  font-weight: 700;
  color: white;
  padding: 15px 0;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar, uid } from "quasar";
import { useRouter } from "vue-router";
import { storageRef, uploadBytes, getDownloadURL, db } from "../boot/firebase";
import {
  getDocs,
  setDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";
import { ref as sRef } from "firebase/storage";

export default defineComponent({
  name: "SponsorsPage",

  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const file = ref(null);
    const imagePreview = ref(
      "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
    );
    const error = ref(null);
    const inProgressId = ref(null);

    let sponsors = ref([]);

    let isLoading = ref(false);
    let isLoadingDelete = ref(false);
    let isLoadingList = ref(false);

    onMounted(() => {
      fetchSponsorsData();
    });

    async function fetchSponsorsData() {
      isLoadingList.value = true;
      sponsors.value = [];
      try {
        let sponsorsSnapshot = await getDocs(collection(db, "sponsors"));
        sponsorsSnapshot.forEach((item) => {
          console.log(item.data());
          sponsors.value.push(item.data());
        });
        isLoadingList.value = false;
      } catch (error) {
        console.log(error);
        isLoadingList.value = false;
      }
    }

    return {
      file,
      imagePreview,
      error,
      sponsors,
      isLoading,
      isLoadingList,
      isLoadingDelete,
      inProgressId,

      selectImage(event) {
        console.log(event.target.files[0]);
        const fileType = event.target.files[0].type;
        if (fileType === "image/jpeg" || fileType === "image/png") {
          file.value = event.target.files[0];
          error.value = null;
        } else {
          error.value = "Invalide archive";
          file.value = null;
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file.value);
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
      },

      async submit() {
        isLoading.value = true;
        console.log("Creating Links Document");
        const uniqueId = uid();
        try {
          const snapshot = await uploadBytes(
            sRef(storageRef, uniqueId),
            file.value
          );
          getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
            try {
              const result = await setDoc(doc(db, "sponsors", uniqueId), {
                id: uniqueId,
                imageUrl: downloadUrl,
              });
              isLoading.value = false;
              imagePreview.value =
                "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png";
              fetchSponsorsData();
              console.log("Created");
              $q.notify({
                position: "top-right",
                color: "green-4",
                textColor: "white",
                icon: "check",
                message: "Salvo",
              });
            } catch (error) {
              console.log(error);
              isLoading.value = false;
            }
          });
        } catch (error) {
          isLoading.value = false;
          console.log(error);
        }
      },
      async deleteSponsor(id) {
        inProgressId.value = id;
        isLoadingDelete.value = true;
        console.log(id);
        const sponsorRef = doc(db, "sponsors", id);
        try {
          await deleteDoc(sponsorRef);
          inProgressId.value = null;
          isLoadingDelete.value = false;
          fetchSponsorsData();
        } catch (error) {
          inProgressId.value = null;
          isLoadingDelete.value = false;
          console.log(error);
        }
      },
    };
  },
});
</script>
