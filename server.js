
// importa configuração do Express e do banco de dados
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
history = require('connect-history-api-fallback'),

  app = express();


app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))



var port = process.env.PORT || 8181;
// passa a porta definida no Express e levantamento do servidor
app.listen(port);
console.log('Servidor client iniciado na porta ' + port + '.');

