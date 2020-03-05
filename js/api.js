
  var acoes = new Vue({
    el:'#acoes',
    data:{
      valores: [],
      dias: [],
      codigo: '',
      mediaMovel: 0,
      mostraMedia: false,
      inicializado: false,
    },
    methods:{
      request(codigo){

          // INICIALIZANDO O SELECT DE DATAS
          this.inicializado = true

          // ATIVAR BOTÃO (CSS)
          botao = document.getElementsByClassName("botao");
          for (i = 0; i < botao.length; i++) {
            botao[i].className = botao[i].className.replace(" active", "");
          }
          event.currentTarget.className += " active";


          // INÍCIO REQUEST
          var request = new XMLHttpRequest()

          request.open('GET', 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+codigo+'&outputsize=compact&apikey=XWZBJTMU8BYSBS10', true)
          this.codigo = codigo;
          request.onreadystatechange = function(){

            // VALIDAÇÃO DA REQUEST
            if (this.readyState == 4 && this.status == 200) {

            // CAPTURA DOS DADOS
            var dados = JSON.parse(this.response);

            // SEPARANDO SOMENTE DATAS
            var datas = Object.keys(dados['Time Series (Daily)']);

            // GOOGLE CHARTS
            // Load the Visualization API and the corechart package.
            google.charts.load('current', {'packages':['corechart']});

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

            // VARIÁVEL QUE GUARDA AS INFORMAÇÕES DO GRÁFICO
            var auxGrafico = []

            // ZERANDO VALORES DE AÇÕES
            acoes.valores = []

            // POPULANDO AS VARIÁVEIS AUXILIARES
            datas.forEach((item, i) => {
              auxGrafico.unshift([item, parseFloat(dados['Time Series (Daily)'][item]['1. open']), parseFloat(dados['Time Series (Daily)'][item]['4. close'])])
              acoes.dias.unshift({data: item, value:i},)
              acoes.valores.unshift(parseFloat(dados['Time Series (Daily)'][item]['4. close']))
            });

            // ACRESCENTANDO LEGENDA
            auxGrafico.unshift(['Dia', 'Abertura', 'Fechamento'])

            // CRIAÇÃO DO GRÁFICO
            function drawChart() {

              var dadosGrafico = google.visualization.arrayToDataTable(auxGrafico);

              var options = {

                legend: { position: 'bottom' }
              };

              var chart = new google.visualization.LineChart(document.getElementById('grafico'));

              chart.draw(dadosGrafico, options);
            }

            }
          };

          request.send()

          this.mostraMedia = false
          this.dias = acoes.dias

      },
      calculoMedia(){

        var select = this.$refs.selectDatas
        if (select.value != 'a') {

          var indice = parseInt(select.value)

          var mediaMovel

          if (indice <= 97 && indice >=2) {
            mediaMovel = (parseFloat(this.valores[indice-2]) + parseFloat(this.valores[indice-1]) + parseFloat(this.valores[indice])+ parseFloat(this.valores[indice+1]) + parseFloat(this.valores[indice+2]))/5
          } else if(indice > 97){
            if (indice == 98) {
              mediaMovel = (parseFloat(this.valores[indice-2]) + parseFloat(this.valores[indice-1]) + parseFloat(this.valores[indice]) + parseFloat(this.valores[indice+1]))/4
            }else{
              mediaMovel = (parseFloat(this.valores[indice-2]) + parseFloat(this.valores[indice-1]) + parseFloat(this.valores[indice]))/3

            }
          } else {
            if (indice == 1) {
              mediaMovel = ((this.valores[indice+2] + this.valores[indice+1] + this.valores[indice] + this.valores[indice-1])/4)
            }else{
              mediaMovel = ((this.valores[indice+2] + this.valores[indice+1] + this.valores[indice])/3)

            }
          }

          this.mediaMovel = mediaMovel.toFixed(2)
          this.mostraMedia = true

        } else {
          this.mostraMedia = false
        }
      }
    }
  })
