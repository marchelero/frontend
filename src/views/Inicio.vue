<template>
  <div class="inicio pa-6">
    <h1>Este es el titulo</h1>
    <v-data-table
      :headers="headers"
      :items="ejemplo"
      :items-per-page="5"
      class="elevation-1"
      no-data-text="No existen registros"
      no-results-text="Sin resultados"
      page-text="de"
    >
     <template v-slot:items="props">
              <td>{{ props.index + 1 }}</td>
              <td>{{ props.item.id }}</td> 
              <td>{{ props.item.nombre }}</td>
              <td>{{ props.item.detalle }}</td>

             <!--  <td>
                <v-btn
                v-if="operativo==true || operativo == 'true'"
                  depressed
                  outline
                  icon
                  fab
                  dark
                  color="success"
                  small
                  @click="editItem(props.item)"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                      <template v-if="predioTipo==2">
                <v-btn
                v-if="operativo==true || operativo == 'true'"
                  depressed
                  outline
                  icon
                  fab
                  dark
                  color="red"
                  small
                  @click="confirmItem(props.item.id)"
                >
                  <v-icon>delete</v-icon>
                </v-btn> 
                      </template>
              </td>-->
            </template>
    </v-data-table>
  </div>
</template>

<script>
// @ is an alias to /src
import Service from "../services/general";
import axios from "axios";
export default {
  name: "inicio",
  components: {},
  data: () => ({
    ejemplo: [],
    headers: [
      { text: "#", align: "left", sortable: false },
      { text: "Id", sortable: false, value: "id", width: "15%" }, 
      { text: "Nombre", value: "nombre", sortable: false },
      { text: "Detalle", value: "detalle", sortable: false },
    ],
  }),
  mounted() {
    this.getEjemplo();
  },
  methods: {
    getEjemplo() {
     
        axios
          .get(
            Service.getBase() + "datos",
            Service.getHeader()
          )
          .then((response) => {
            this.ejemplo = response.data;

          })
          .catch((error) => {
            console.error("Error al cargar registros", error);
          });
    },
  },
};
</script>
