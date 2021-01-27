<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
     <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/15.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Mi Nombre</v-list-item-title>
            <v-list-item-subtitle>Detalle Tipo</v-list-item-subtitle>
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
 
    <v-card class="overflow-hidden">
      <v-app-bar
      app
      color="primary"
      dark
      src="https://picsum.photos/1920/1080?random"
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
         <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
        >
          mdi-magnify
        </v-icon>
      </template>
      <span>Buscar</span>
    </v-tooltip>
    
      </v-btn>
      <v-switch v-model="$vuetify.theme.dark" class="switch pa-3 pt-8"></v-switch>
    </v-app-bar>
    

   
  </v-card>
    <v-main>
      <!-- Añadir el vue router -->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <!--         <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption"
              >{{ new Date().getFullYear() }} &copy; Sistemas, Todos los derechos reservados</span
            >
            <v-spacer></v-spacer>
            <span class="caption mr-1"><a href="//www.facebook.com/" target="_blank" style="text-decoration: none">Mi Pagina</a></span>
          </v-footer> -->
      <v-footer padless absolute>
        <v-card color="primary" class="white--text text-center app--footer">
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4 white--text"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0">
            Phasellus feugiat arcu sapien, et iacut ut risus eget metus lsit
            amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
            lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
            iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
            tempor vel ut orci. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Sistema</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: null,
    items: [
      { title: "Inicio", icon: "mdi-view-dashboard", to: "/" },
      { title: "Acerca", icon: "mdi-help-box", to: "/acerca" },
    ],
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>