<template>

<v-card class="pa-4">

   <v-dialog v-model="dialog">
                  <template v-slot:activator="{ on }">
                    <div class="d-flex">
                        <v-btn color="primary" dark v-on="on">
                            Nuevo 
                        </v-btn>
                    </div>
                  </template>
                  <v-card>
                    <v-card-title>
                        <span v-if="editedItem.id">Editar: {{editedItem.id}} - {{editedItem.nombre}} </span>
                        <span v-else>Nuevo Registro</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="4">
                            <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="editedItem.detalle" label="Detalle"></v-text-field>
                          </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue" text @click="showEditDialog()">Cancelar</v-btn>
                      <template>
                        <div v-if="editedItem.id">
                          <v-btn color="blue" text @click="saveItem(editedItem)">Guardar</v-btn>
                        </div>
                        <div v-else>
                          <v-btn color="blue" text @click="saveNuevo()">Guardar Nuevo</v-btn>
                        </div>
                      </template>
                      
                      
                      </v-card-actions>
                  </v-card>
            </v-dialog>
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
      </template>
      <template v-slot:item.actions="{ item }">
            <div class="text-truncate">
              <v-icon
                class="mr-2"
                @click="showEditDialog(item)"
                color="primary" 
              >
                mdi-pencil
              </v-icon>
              <v-icon
                @click="deleteItem(item)"
                color="pink" 
              >
                mdi-delete
              </v-icon>
          </div>
        </template>
    </v-data-table>
       </v-card>


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
     /*  { text: "#", align: "left", sortable: false }, */
      { text: "Id", sortable: false, value: "id", width: "15%" }, 
      { text: "Nombre", value: "nombre", sortable: false },
      { text: "Detalle", value: "detalle", sortable: false },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    dialog: false, // used to toggle the dialog
    editedItem: {} // empty holder for create/update ops
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
    showEditDialog(item) {
        this.editedItem = item||{}
        this.dialog = !this.dialog
    },
     saveNuevo() {
   
    },
    saveItem(id) {

       
      
    },
    deleteServicioElectrico(id) {
      
    
    },
  
  },
};
</script>
