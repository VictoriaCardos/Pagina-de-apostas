(function (win, doc){
  'use strict';
  
  var $type = doc.querySelector('[data-js="type"]'); 

  var $btn0 = doc.querySelector('[data-js="btn0"]'); 
  var $btn1 = doc.querySelector('[data-js="btn1"]'); 
  var $btn2 = doc.querySelector('[data-js="btn2"]'); 

  var $description = doc.querySelector('[data-js="description"]');
  var $containerBtn = doc.querySelector('[data-js="containerBtn"]');

  var cont // usado para determinar qual button vou pegar informações

  var arr = []; //array usado para armazenar buttons 
  var qtdButton; // usado para saber a quantidade de buttons

  var $btn;
  var newArr =[];//usado para guardar os numeros dos buttons selecionados
  
  var maxNumber; //guarda o numero máximo de cada jogo

  var arrValue = []; //guarda os values dos buttos selecionados para eu poder verificar se ele já existe e poder remover do newArr depois

  $btn0.onclick = function clickButton(){
    cont= 0
    chooseGame();
    verifyBtn()
    newArr = [];
  };

  $btn1.onclick = function clickButton(){
    cont= 1
    chooseGame();
    verifyBtn()
    newArr = [];
  };

  $btn2.onclick = function clickButton(){
    cont= 2
    chooseGame();
    verifyBtn()
    newArr = []
  };

  function chooseGame(){ 
    var ajax = new XMLHttpRequest();
    ajax.open('GET', '/games.json', true);
    ajax.send();
    ajax.addEventListener('readystatechange', getInfos , true);

    function getInfos(){ //PEGO INFORMAÇÕES DO ARQUIVO JSON
      if(isRequestOk()){
        var data = JSON.parse(ajax.responseText);
        if(cont == 0){
            $type.textContent = data.types[0].type;
            $description.textContent = data.types[0].description;
            maxNumber = data.types[0].maxnumber;
        }
        
        if(cont == 1){
            $type.textContent = data.types[1].type;
            $description.textContent = data.types[1].description;
             maxNumber = data.types[1].maxnumber;
        } 
        
        if(cont == 2){
            $type.textContent = data.types[2].type;
            $description.textContent = data.types[2].description;
             maxNumber = data.types[2].maxnumber;
        } 
      }
    }

    function isRequestOk(){
      return ajax.readyState === 4 && ajax.status === 200;
    }

  } 

  function verifyBtn(){ 
    if(cont==0 )
      qtdButton = 25;
    if(cont==1)
      qtdButton = 60; 
    if(cont==2)
      qtdButton = 80;
    
    createButton()
  }


  function createButton(){
    clearChildren()
    for(var i=0; i<qtdButton; i++){
      $btn = doc.createElement('button');
      $btn.setAttribute('id','meuId');
      $btn.textContent = Math.floor(Math.random()*100);
      $btn.setAttribute('value',i );
      $btn.setAttribute('type', 'button' );
      
      arr.push($btn);      
    }
    if(arr.length-qtdButton==0){
      insertOnpage()
    }
  }
//aqui eu quero verificar se já existe filhos na div. se tiver eu  quero que exclua, se não tiver, nada acontece
  function clearChildren(){
    if($containerBtn.hasChildNodes){
      arr.length = 0;
      $containerBtn.innerText = "";
    }
  }  

  function insertOnpage(){
    arr.forEach(function(button){
      $containerBtn.appendChild(button);
    })
    getSelectButton()
  }

//fiz com que a função retorne um for each em que cada btn vai ter um .onclick e dentro vou dar um push no newArr se ele ja não foi selecionado
  function getSelectButton(){
    arr.forEach(function(button){
      button.onclick = function clickButton(){
      
        if( newArr.length<=maxNumber-1 ||button.style.backgroundColor == "green" ){
          
          var some = newArr.some(function(item){
            return item == button.textContent
          });
          var some2 = arrValue.some(function(item){
            return item == button.value
          });
          if(some && some2){ 
            var buscar = button.value;
            var indice = arrValue.indexOf(buscar);
            while(indice>=0){
              arrValue.splice(indice,1);
              indice = arrValue.indexOf(buscar)
            }

            var buscar2 = button.textContent;
            var indice2 = newArr.indexOf(buscar2);
            while(indice2>=0){
              newArr.splice(indice2,1);
              indice2 = newArr.indexOf(buscar2)
            }
          
            button.style.backgroundColor = "gray";
          }else{
            arrValue.push(button.value)
            newArr.push(button.textContent) 
            button.style.backgroundColor = "green";
            
          }
        }
        
      }
    });   
  }

})(window, document);
