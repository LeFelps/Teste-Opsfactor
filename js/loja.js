
var loja = new Vue({
  el: '#loja',
    data: {
      categoria: 0,
      nomeCategoria: 0,
      imagem: '',
      selected: '0',
      produto: 0,
      optionsCategoria:[
        {text: 'Eletrodomésticos', value: '1'},
        {text: 'Eletrônicos', value: '2'},
      ],
      eletrodomesticos:[
        {text: 'Geladeira A', value: '1', url:'./images/GeladeiraA.png'},
        {text: 'Geladeira B', value: '2', url:'./images/GeladeiraB.png'},
      ],
      eletronicos:[
        {text: 'Televisão A', value: '1', url:'./images/TelevisaoA.png'},
        {text: 'Televisão B', value: '2', url:'./images/TelevisaoB.png'},
      ],
      optionsProduto:[],
    },
    methods:{
      selecionaCategoria() {
        // ATRIBUIÇÃO DO SELECT CATEGORIAS Á VARIÁVEL
        var select = this.$refs.selectCategoria
        this.categoria = select.value

        // VARIÁVEL PRODUTO ZERADA
        this.produto = '0'

        // VALIDAÇÃO DO VALOR SELECIONADO
        if (select.value == 1) {
          // ATRIBUIÇÃO DE NOMES DE PRODUTO E CATEGORIA
          this.optionsProduto = this.eletrodomesticos
          this.nomeCategoria = 'eletrodoméstico'
        }else if (select.value == 2){
          this.optionsProduto = this.eletronicos
          this.nomeCategoria = 'eletrônico'
        }

        // MUDANÇA DO INDICE DO SELECT PRODUTO
        var produto = this.$refs.selectProduto
        produto.selectedIndex = 0

      },
    selecionaProduto(){

      var select = this.$refs.selectProduto
      this.produto = select.value

      if (this.categoria == 1) {

        this.eletrodomesticos.forEach((element) => {
          if (select.value == element.value) {
            this.imagem = element.url
          }
        });

      } else if(this.categoria == 2) {

        this.eletronicos.forEach((element) => {
          if (select.value == element.value) {
            this.imagem = element.url
          }
        });


      }
    }
    }
})
