const url = 'http://localhost:8081/'


export function postClient(data){
  console.log(data)
  return this.$axios.post(url+"clientes", data)
}


export function getClient(id){
  console.log(id)
  return this.$axios.get(url+"clientes/"+id)
}


export function postPontos(id, pontos){
  console.log(pontos)
  return this.$axios.post(url+"clientes/add/"+id, {"pontos" : pontos})
}
