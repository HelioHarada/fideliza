<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <!-- camera -->
      <div class="row justify-center">
        <div class="col-12 col-md-12">
          <div class="row column justify-center q-pa-sm q-ma-sm">
            <p>Use a camera para ler o QR code:</p>

            <div v-for="(camera , index ) in cameras" :key="camera.id">
              <q-btn color="primary" size="sm" @click="initCamera(index)" :label="camera.name" />
            </div>
          </div>
          <video id="camera"></video>
        </div>
      </div>
      <!-- card cliente -->
      <div class="row justify-center">
        <div class="col-12 col-md-12" v-if="cliente.nome">
          <q-card class="my-card">
            <q-card-section>
              <div class="q-pa-md">
                <q-item-label caption>Nome</q-item-label>
                <span class="text-h5">{{cliente.nome}}</span>
                <q-item-label caption>Telefone : {{cliente.telefone}}</q-item-label>
              </div>
              <q-separator />
              <!-- <div class="text-subtitle2">telefone: {{cliente.telefone}}</div> -->
              <h3 class="text-center">Pontos</h3>
              <h2 class="text-center">{{cliente.pontos}}</h2>
              <q-card-section class="row column justify-center">
                <q-btn color="secondary" label="1 ponto" @click="addpontos = 1" />
                <q-item-label class="text-center q-pa-sm" caption>ou</q-item-label>
                <q-input outlined v-model="addpontos" type="number" label="Quantidade de pontos" />
              </q-card-section>
              <!-- btn pontuar -->
              <q-card-section class="row justify-center">
                <q-btn color="primary" size="lg" @click="confirm" label="Fidelizar" />
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getClient, postPontos } from "../../api/clientes";

import { Dialog } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      scanner: null,
      activeCameraId: null,
      cameras: [],
      scans: [],
      message: "",
      id: "",
      addpontos: "0",
      expend: false,
      cliente: {
        nome: "",
        pontos: ""
      }
    };
  },

  mounted() {
    this.initCamera();
  },
  methods: {
    getClient,
    postPontos,

    initCamera(select) {
      var self = this;

      if (!self.scanner) {
        console.log("criar instancia")
        self.scanner = new Instascan.Scanner({
          video: document.getElementById("camera"),
          scanPeriod: 5
        });

        // Ler e exibir
        self.scanner.addListener("scan", function(content, image) {
          console.log(content);
          self.id = content;
          self.showClient(content);
        });
      }

      // Pegar cameras para execução
      Instascan.Camera.getCameras()
        .then(function(cameras) {
          self.cameras = cameras;
          if (cameras.length > 0) {
            if (select) {
              console.log(select);
              self.activeCameraId = cameras[select].id;
              self.scanner.start(cameras[select]);
            } else {
              self.activeCameraId = cameras[0].id;
              self.scanner.start(cameras[0]);
            }
          } else {
            alert("camera não encontrada");
            console.error("No cameras found.");
          }
        })
        .catch(function(e) {
          alert(e);
          console.error(e);
        });
    },

    async showClient(id) {
      try {
        const res = await this.getClient(id);
        console.log(res);
        this.cliente = res.data[0];
      } catch (error) {
        console.log(error);
      }
    },

    confirm() {
      const total = parseInt(this.cliente.pontos) + parseInt(this.addpontos);
      this.$q
        .dialog({
          title: "Confirmar pontuação",
          message:
            "Você está adicionando " +
            this.addpontos +
            " No total o cliente " +
            this.cliente.nome +
            " ficara com : " +
            total,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          console.log("add");
          this.adicionarPontos(this.cliente.id, total);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },

    async adicionarPontos(id, ponto) {
      try {
        const res = await this.postPontos(id, ponto);
        this.showClient(id);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    // selectCamera: function (camera) {
    //   this.activeCameraId = camera.id;
    //   this.scanner.start(camera);
    // }
  }
};
</script>



<style scoped>
#camera {
  width: 300px;
}
</style>
