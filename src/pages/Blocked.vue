<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <q-img
        width="25vh"
        src="https://www.pngall.com/wp-content/uploads/8/Warning-PNG-Free-Image.png"
        alt=""
      />

      <div class="text-red" style="font-size: 15vh">Bloqueado!</div>

      <div class="text-h2 text-red" style="opacity: 0.4">
        Liberação mediante pagamento.
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BlockedPage",
});
</script>
