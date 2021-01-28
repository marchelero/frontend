<template>
  <v-card class="pa-4">
    <v-data-table
      :headers="headers"
      :items="ejemplo"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Ejemplo CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                          :rules="[v => !!v || 'El campo es requerido']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.detalle"
                          label="Detalle"
                          :rules="[v => !!v || 'El campo es requerido']"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" persistent max-width="300">
            <v-card>
              <v-card-title class="headline"
                >Esta seguro que desea borrar este registro?</v-card-title
              >
              <v-card-text
                >La accion eliminara el registro por completo.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.acciones`]="{ item }">
        <v-icon color="primary" small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <!--  <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
      </template>
    </v-data-table>
    <v-snackbar
      v-model="snack.state"
      :top="'top'"
      :right="'right'"
      :color="snack.color"
      :multi-line="snack.mode === 'multi-line'"
      :timeout="3500"
      :vertical="snack.mode === 'vertical'"
    >
      {{ snack.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="snack.state = false">
          Cerrar
        </v-btn></template
      >
    </v-snackbar>
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
    search: "",
    mdialog: false,
    headers: [
      { text: "Id", sortable: false, value: "id", width: "15%" },
      { text: "Nombre", value: "nombre", sortable: false },
      { text: "Detalle", value: "detalle", sortable: false },
      { text: "Acciones", value: "acciones", sortable: false },
    ],
    editedItem: {}, // empty holder for create/update ops
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    snack: {
      state: false,
      color: "success",
      mode: "",
      timeout: 2500,
      text: "",
    },
  }),
  mounted() {
    this.getEjemplo();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
    },
  },
  methods: {
    getEjemplo() {
      axios
        .get(Service.getBase() + "datos", Service.getHeader())
        .then((response) => {
          this.ejemplo = response.data;
        })
        .catch((error) => {
          console.error("Error al cargar registros", error);
        });
    },
    
    showEditDialog(item) {
      this.mdialog = true;
    },

    editItem(item) {
      // console.log(item);
      this.editedIndex = this.ejemplo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.ejemplo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete(
          Service.getBase() + "datos/" + this.editedItem.id,
          Service.getHeader()
        )
        .then((response) => {
          this.toast("success", "Registro eliminado");
          this.getEjemplo();
          this.closeDelete();
        })
        .catch((error) => {
          this.closeDelete();
          this.toast("error", "No se puede Eliminar el Registro.");
          console.error("Error al cargar registros", error);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        if (this.$refs.form.validate()) {
          axios
            .put(
              Service.getBase() + "datos/" + this.editedItem.id,
              this.editedItem,
              Service.getHeader()
            )
            .then((response) => {
              this.toast("success", "Registro actualizado");
              this.getEjemplo();
              this.close();
            })
            .catch((error) => {
              this.toast("error", "No se pudo actualizar");
            });
        } 
      } else {
        if (this.$refs.form.validate()) {
          axios
            .post(
              Service.getBase() + "datos",
              this.editedItem,
              Service.getHeader()
            )
            .then((response) => {
              this.toast("success", "Registro guardado");
              this.getEjemplo();
              this.close();
            })
            .catch((error) => {
              this.toast("error", "No se pudo guardar");
            });
        }
      }
    },
    toast(mcolor, mtext) {
      this.snack.color = mcolor;
      this.snack.text = mtext;
      this.snack.state = true;
    },
  },
};
</script>
