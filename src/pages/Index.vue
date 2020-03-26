<template>
  <q-page class="flex column flex-center">
    <div class="row">
      <h1 class="text-h1 text-weight-bolder text-red-6">Fideliza</h1>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <q-btn color="primary" class="btn-index q-ma-md" label="Cadastrar" />
        <q-btn color="secondary" class="btn-index q-ma-md" label="Entrar" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>

<style scoped>
.btn-index{
  width: 200px;
  height: 50px;
}
</style>
