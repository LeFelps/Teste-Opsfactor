
var loja = new Vue({
  el: '#loja',
    data: {
      categoria: 0,
      nomeCategoria: 0,
      imagem: '',
      selected: '0',
      produto: 0,
      nomeProduto: '',
      optionsCategoria:[
        {text: 'Eletrodomésticos', value: '1'},
        {text: 'Eletrônicos', value: '2'},
      ],
      eletrodomesticos:[
        {text: 'Geladeira A', value: '1', url:'https://electrolux.vteximg.com.br/arquivos/ids/194996/geladeira-refrigerador-frost-free-bottom-freezer-598-litros-electrolux-DB84X_Detalhe2.jpg?v=636994866574070000'},
        {text: 'Geladeira B', value: '2', url:'https://electrolux.vteximg.com.br/arquivos/ids/183699-500-500/Refrigerador-Side-By-Side-Frost-Free-504L-Inox-SS72X.png?v=636469699350000000'},
      ],
      eletronicos:[
        {text: 'Televisão A', value: '1', url:'https://images.samsung.com/is/image/samsung/br-uhdtv-nu7400-un50nu7400gxzd-frontblack-113032186?$PD_GALLERY_L_JPG$ '},
        {text: 'Televisão B', value: '2', url:'https://img.global.news.samsung.com/br/wp-content/uploads/2017/02/smart-tv.png '},
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
