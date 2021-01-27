<template>
  <div>
   <v-navigation-drawer v-model="drawer" app>
     
    <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Titulo</v-list-item-title>
            <v-list-item-subtitle>Subtitulo</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>


export default {
  name: "drawer",
  data: () => ({
    drawer: null,
    items: [
      { title: "Inicio", icon: "mdi-view-dashboard", to: "/" },
      { title: "Acerca", icon: "mdi-help-box", to: "/acerca" },
    ],
  }),
};
</script>