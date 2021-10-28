import { lista } from "./pergunta.js";
var listaDePerguntas = lista;
var listaDeRespostas = [];
var numeroAleatorio; // variavel para um numero aleatorio
var pergunta; //pergunta que vai ser selecionada ao montar a pergunta

export  function iniciar(list){
    
    //pegando o butao do document
    var button = document.querySelector('button');
    
    //colocando o event listener de checar se a resposta esta certa
    button.addEventListener('click',checarResposta)

    //gerando numero aleatorio para pegar uma pegunta aleatorio no "Banco"
    numeroAleatorio = getRandomArbitrary(0, lista.length);

    //montando uma pergunta nova com o indice do numeroaleatorio
    montarPergunta(numeroAleatorio)
}


function montarPergunta(indice){

    //checando se a lista de perguntas contem perguntas
    if(listaDePerguntas.length != 0){

        //variaveis
        var titulo = document.querySelector("h3");
        var opcoes = document.querySelectorAll("ul li label");
        
        //colocando a pergunta selecionada de acordo com o indice
        pergunta = listaDePerguntas[indice];

        //o h3 titulo da pagina ira ter o mesmo conteudo do titulo da pergunta
        titulo.innerHTML = pergunta.titulo

        //preenchendo os labels com as opções de resposta da lista de resposta da pergnta
        for(var i = 0 ;i <  pergunta.listaRespostas.length; i++){
            opcoes[i].innerHTML = pergunta.listaRespostas[i];
            //colocando condição de remover o disbled para poder enviar a resposta
            opcoes[i].addEventListener('click',function(){
                document.querySelector('.bt-resposta').removeAttribute('disabled');
            })
                
        }

    }
}


function checarResposta(){
    
    //se a lista de perguntas for maior que 0
        
        //variaveis
            var titulo = document.querySelector("h3");
            var resposta = document.querySelectorAll("input")
        
        //--------------


        //procurando as resposta selecionada
        for(var i = 0; i < resposta.length; i++){
            //se o imput estiver selecionado
            if(resposta[i].checked){
                //se o valor do input for o mesmo valor da respcerta da pergunta
                if(resposta[i].value == pergunta.respCerta){

                    //ira adicionar o titulo da pergunta e a resposta certa na lista de respostas
                    listaDeRespostas.push({titulo:pergunta.titulo,resposta:'Certo'})                  
                    
                    //se a resposta estiver errada ira adicionar o titulo e errado na lista de respostas
                }
                else{
                    listaDeRespostas.push({titulo:pergunta.titulo,resposta:'Errado'})     
                }
              
                //removendo a pergunta feita da lista de perguntas de acordo com indice dela na lista original
                listaDePerguntas.splice(lista.indexOf(pergunta),1);

                //tirando o checked do input selecionado
                resposta[i].checked = false;

                //pausando o 
                break;
            
            }
        }
        //------------------------------------

        //colocando o atributo disbled para que não seja possivel clicar sem escolher
        //uma opção
        var $button = document.querySelector('.bt-resposta');
        $button.setAttribute('disabled','disabled');
        
        
        //montando outra pergunta com o numeros aleatorio
        numeroAleatorio = getRandomArbitrary(0, listaDePerguntas.length);
        montarPergunta(numeroAleatorio)

        //se a lista não tiver mais perguntar ira exibir o resultado
        if(listaDePerguntas.length === 0){
            console.log(listaDeRespostas)
            exibirResultado();
    }
}



// codigo pego no stackoverFlow para gerar numeros aletatorios necessário para buscar
//uma pergunta de forma aleatoria
 function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }


//função para exibir todas as respostas dadas
function exibirResultado(){

    var div = document.querySelector('.resultado-filho');
    var divPai = document.querySelector('.resultado');
    var $h4;
    var $span;
    var novaResposta;



    for(var i= 0; i < listaDeRespostas.length; i++){
        novaResposta = listaDeRespostas[i];
        $h4 = document.createElement('h4');
        $span = document.createElement('span');
        $h4.innerHTML = novaResposta.titulo;
        $span.innerHTML = novaResposta.resposta;
        div.appendChild($h4);
        div.appendChild($span);
        $h4 = null;
        $span = null;
    }
    divPai.style.display ='block';


}
