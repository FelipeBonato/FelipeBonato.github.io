//const replaceAll = (from, to, text) => text.split(from).join(to);
              //OU
String.prototype.replaceAll = function(from, to){ return this.split(from).join(to); };   // objeto pai do prototype           

const carrinhoLista = document.getElementById('lista-carrinho'); //lista de produtos do Carrinho elemento UL
const template = document.getElementById('carrinho-item').innerHTML; //Peando template do produto para o carrinho
const totalSpan = document.querySelector('span#total'); // tag <span> id="total" 
// Meu carrinho arr
let carrinho = [];

//TEMPLATE fazendo o replaceALL dos valores do obj
const aplicarTemplateParaItem = (item, template) => {  
  return template
  .replaceAll('{{ID}}', item.id)
  .replaceAll('{{NOME}}', item.name)
  .replaceAll('{{IMAGEM}}', item.image)
  .replaceAll('{{PRECO}}', item.price)
  .replaceAll('{{QUANTIDADE}}', item.quantity);
};

// Botão Comprar
const onComprarClick = (evt) => {
  console.log(evt.target.nodeName, evt.target.attributes['data-id']); // conferindo os atributos

  if(evt.target.nodeName === 'BUTTON' && evt.target.attributes['data-id']){  //se for Button e tiver um atributo 'data-id'
    const id = parseInt(evt.target.attributes['data-id'].nodeValue);    //Recebendo os valores dos atriibutos em cada objeto
    const index = carrinho.findIndex(item=>item.id === id);   //verificando se já existe o id no carrinho (true our false)
    
    if(index === -1){   //se o id for false entra
      const name = evt.target.attributes['data-name'].nodeValue;        //Recebendo os valores dos atriibutos em cada objeto
      const price = parseFloat(evt.target.attributes['data-price'].nodeValue);  
      const image = evt.target.attributes['data-image'].nodeValue;
      const quantity = parseInt(evt.target.attributes['data-quantity'].nodeValue);
      const item = { id, name, price, image, quantity };
      console.log('novo item', item);
      carrinho.push(item);    // Empurrando/add para dentro do Array 'carrinho'
      console.log('carirnho', carrinho);
    } else{
        carrinho[index]. quantity++; //se for true, acrescenta mais um na quantidade do item
    }
    render();  //atualizando 
  }
};

const onRemoverClick = (evt) => {
  if(evt.target.nodeName === 'BUTTON' && evt.target.hasAttribute('data-id')){ //verificando se é o botao remover
    const id = parseInt(evt.target.getAttribute('data-id'));// pegar o item pelo id
    carrinho = carrinho.filter(item => item.id !== id); //???

    render();
    console.log('carrinho depois deremover', carrinho);
  }
};

const onQuantidadeTroca = (evt) => {
  if(evt.target.nodeName === 'INPUT' && evt.target.hasAttribute('data-id')){ // se é imput e tem o atributo data-id
    const quantity = parseInt(evt.target.value);  //pega o valor da quantidade
    const id = parseInt(evt.target.getAttribute('data-id'));  // pega o id do data-id
    // Alterar o item na lista global de mesmo id atualizando a quantidade
    const index = carrinho.findIndex(item=>item.id === id); 
    carrinho[index].quantity = quantity;
    render();
    console.log('quantidade altera', carinho);
  }
};

const render = () => {
  const html = carrinho.map((item) => aplicarTemplateParaItem(item, template)).join('\n'); // guarda o status atual da lista
  carrinhoLista.innerHTML = html;   // convert string????
  const total = carrinho.reduce((total, item) => total + item.quantity * item.price, 0);  //primeiro pega os precose multiplica p/ qtd, depois reduce soma toods os valores reduzindo em um total
  totalSpan.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency:'BRL'}); // pegando o total e convertendo para moeda brasileira
}

const produtosLista = document.getElementById('lista-produtos'); //elementos da UL
produtosLista.addEventListener('click', onComprarClick); //passando a funcao da const onComprarClick

carrinhoLista.addEventListener('change', onQuantidadeTroca);
carrinhoLista.addEventListener('click', onRemoverClick);