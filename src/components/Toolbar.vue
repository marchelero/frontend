<template>

    <v-app-bar
      app
      color="primary"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Titulo</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-switch
        v-model="$vuetify.theme.dark"
      class="switch pa-3"></v-switch>
      
    </v-app-bar>

</template>
<script>
export default {
  name: "toolbar",
  components: {
    //
  },
  data: () => ({
   
  }),
  mounted() {
   
  },
  methods: {
   
  }
};
</script>
