<template>
  <q-page padding>
    <div class="container q-pa-md">
      <div>
        <h4 class="text-center">Criar Cliente</h4>
        <q-form>
          <div class="q-gutter-y-md column">
            <q-input outlined v-model="cliente.nome" label="Nome" />

            <q-input outlined v-model="cliente.telefone" label="telefone" />

            <q-input outlined v-model="cliente.pontos" label="pontos iniciais" />

            <!-- <q-file outlined v-model="produto.imagem" label="imagem" @change="viewImg">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>-->
            <!-- submit -->
            <q-btn label="Cadastrar Cliente" @click="cadastrar()" color="primary" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import { postClient } from "../../api/clientes";

export default {
  data() {
    return {
      cliente: {
        nome: "",
        telefone: "",
        pontos: "0"
      }
    };
  },
  methods: {
    postClient,

    async cadastrar() {
      try {
        const formData = new FormData();

        formData.append("nome", this.cliente.nome);
        formData.append("telefone", this.cliente.telefone);
        formData.append("pontos", this.cliente.pontos);
        console.log(formData)

        const res = await this.postClient(this.cliente);

        console.log(res);
        alert("Cadastrado com sucesso");
      } catch (e) {
        console.log(e)
        alert(e);
      }
    }
  }
};
</script>
