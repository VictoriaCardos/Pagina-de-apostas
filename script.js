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
  

  $btn0.onclick = function clickButton(){
    cont= 0
    chooseGame();
    verifyBtn()
  };

  $btn1.onclick = function clickButton(){
    cont= 1
    chooseGame();
    verifyBtn()
  };

  $btn2.onclick = function clickButton(){
    cont= 2
    chooseGame();
    verifyBtn()
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
        }
        
        if(cont == 1){
            $type.textContent = data.types[1].type;
            $description.textContent = data.types[1].description;
        } 
        
        if(cont == 2){
            $type.textContent = data.types[2].type;
            $description.textContent = data.types[2].description;
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
      var $btn = doc.createElement('button');
      $btn.setAttribute('id','meuId');
      $btn.textContent = 'x';
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
  }

})(window, document);