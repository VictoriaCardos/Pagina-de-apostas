(function (win, doc) {
  'use strict';

  var $divBtnGames = doc.querySelector('[data-js="btnGames"]');
  var $type = doc.querySelector('[data-js="type"]');
  var $btnType
  var $containerBtn = doc.querySelector('[data-js="containerBtn"]');
  const $btnCompleteGame = doc.querySelector('[data-js="completeGame"]');
  var $btnClearGame = doc.querySelector('[data-js="clearGame"]');
  var $btnAddToCart = doc.querySelector('[data-js="addToCart"]');
  var $divContainerCart = doc.querySelector('[data-js="containerCart"]');

  var $description = doc.querySelector('[data-js="description"]');
  var arrDataType = [];
  var arrButton = [];
  var arr = []; //array usado para armazenar buttons
  var newArr = [];//usado para guardar os numeros dos buttons selecionados
  var arrValue = []; //guarda os values dos buttos selecionados para eu poder verificar se ele já existe e poder remover do newArr depois
  var arrPosition = [];
  var valueTotal = 0
  var $btn;
  var $total = doc.querySelector('[data-js="total"]');
  var $ButtonMega
  var $divMensage = doc.querySelector('[data-js="mensage"]');
  var verifyMensage= true
  var maxNumber; //guarda o numero máximo de cada jogo
  var range; //guarda quantos buttons cada jogo tem
  var price //guarda qual o valor de cada jogo
  var colorType //guarda a cor de cada jogo

  $btnCompleteGame.onclick = function clickButton() {
    arrPosition = []
    completeGame()
  }

  $btnClearGame.onclick = function clickButton() {
    makeGray();
  }

  $btnAddToCart.onclick = function clickButton() {
    createDivInfos();
  }

  var ajax = new XMLHttpRequest();
  ajax.open('GET', '/games.json', true);
  ajax.send();
  ajax.addEventListener('readystatechange', getInfos, true);

  function getInfos() { //PEGO INFORMAÇÕES DO ARQUIVO JSON
    if (isRequestOk()) {
      var data = JSON.parse(ajax.responseText);

      arrDataType=data.types
      createButtonTypeGame();
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }
  }

  function createButtonTypeGame(){
    arrDataType.reverse()
    for(var i=0; i<arrDataType.length; i++){
      $type.textContent = arrDataType[i].type;
      $divBtnGames.insertAdjacentHTML("afterbegin", `<button style="background: #FFFFFF 0% 0% no-repeat padding-box;
      border: 2px solid ${arrDataType[i].color};
      border-radius: 100px;
      opacity: 1;
      text-align: center;
      font: italic normal bold  Helvetica Neue;
      letter-spacing: 0px;
      color:  ${arrDataType[i].color};
      line-height: 30px;
      font-weight: bold;
      margin: 6px;
      padding: 0 20px;" type="button" value="${i}" class="buttonGame" data-js="btnType" id"${$type.textContent}">${$type.textContent}</button>`);
      $btnType = doc.querySelector('.buttonGame');
      arrButton.push($btnType)
      maxNumber = arrDataType[i].maxnumber;
      range = arrDataType[i].range;
      price = arrDataType[i].price;
      colorType = arrDataType[i].color
      
    }
    addOnClick();
    selectMega();
  }

  function selectMega(){
    for(var i=0; i<arrDataType.length; i++){
      $type.textContent = arrDataType[i].type;
      if($type.textContent == 'Lotofácil'){
        $description.textContent = arrDataType[i].description;
        $type.textContent = arrDataType[i].type;
        maxNumber = arrDataType[i].maxnumber;
        range = arrDataType[i].range;
        price = arrDataType[i].price;
        colorType = arrDataType[i].color
        $ButtonMega = arrButton[i]

        $ButtonMega.setAttribute('style', `background:${arrDataType[i].color};
        border: 2px solid ${arrDataType[i].color};
        border-radius: 100px;
        opacity: 1;
        text-align: center;
        font: italic normal bold Helvetica Neue;
        letter-spacing: 0px;
        color: #FFFFFF;
        line-height: 30px;
        padding: 0 20px;`)

        createButton();
        newArr = [];
        arrPosition = [];
        break;
      }
    }
  }

//ao clicar eu faço a atribuição das informações de forma dinâmica
var valueButton
  function addOnClick(){
    arrButton.forEach(function (button) {
      button.onclick = function clickButton() {
        valueButton = arrDataType[button.value].type
        $description.textContent = arrDataType[button.value].description;
        $type.textContent = arrDataType[button.value].type;
        maxNumber = arrDataType[button.value].maxnumber;
        range = arrDataType[button.value].range;
        price = arrDataType[button.value].price;
        colorType = arrDataType[button.value].color
        selectAndColorize()
        createButton();
        newArr = [];
        arrPosition = [];
      }
    }); 
  }
var teste
  function selectAndColorize(){
    for(var i=0; i<arrDataType.length; i++){
      if(arrDataType[i].type == valueButton){
        $description.textContent = arrDataType[i].description;
        $type.textContent = arrDataType[i].type;
        maxNumber = arrDataType[i].maxnumber;
        range = arrDataType[i].range;
        price = arrDataType[i].price;
        colorType = arrDataType[i].color
        $ButtonMega = arrButton[i]

        $ButtonMega.setAttribute('style', `background:${arrDataType[i].color};
        border: 2px solid ${colorType};
        border-radius: 100px;
        opacity: 1;
        text-align: center;
        font: italic normal bold Helvetica Neue;
        letter-spacing: 0px;
        color: #FFFFFF;
        line-height: 30px;
        padding: 0 20px;`)

        createButton();
        newArr = [];
        arrPosition = [];
      }else{
        $ButtonMega = arrButton[i]
        $ButtonMega.setAttribute('style', `background: #FFFFFF 0% 0% no-repeat padding-box;
      border: 2px solid ${arrDataType[i].color};
      border-radius: 100px;
      opacity: 1;
      text-align: center;
      font: italic normal bold  Helvetica Neue;
      letter-spacing: 0px;
      color:  ${arrDataType[i].color};
      line-height: 30px;
      font-weight: bold;
      margin: 6px;
      padding: 0 20px;`);
      }
    }
  }

  function createButton(){
    clearChildren()
    for (var i = 0; i < range; i++) {
      $btn = doc.createElement('button');
      $btn.setAttribute('id', 'meuId');
      $btn.textContent = Math.floor(Math.random() * 200);
      $btn.setAttribute('value', i);
      $btn.setAttribute('type', 'button');

      arr.push($btn);
    }
    if (arr.length - range == 0) {
      insertOnpage()
    }
  }
  //aqui eu quero verificar se já existe filhos na div. se tiver eu  quero que exclua, se não tiver, nada acontece
  function clearChildren() {
    if ($containerBtn.hasChildNodes) {
      arr.length = 0;
      $containerBtn.innerText = "";
    }
  }

  function insertOnpage() {
    arr.forEach(function (button) {
      $containerBtn.appendChild(button);
    })
    getSelectButton()
  }

  function getSelectButton() {
    arr.forEach(function (button) {
      button.onclick = function clickButton() {
        if (newArr.length <= maxNumber - 1 || button.style.backgroundColor == "green") {
          const ifAnyIsTrue = newArr.some(function (item) {
            return item == button.textContent
          });
          const ifAnyIsTrue2 = arrValue.some(function (item) {
            return item == button.value
          });

          if (ifAnyIsTrue && ifAnyIsTrue2) {
            const search = button.value;
            var index = arrValue.indexOf(search);
            while (index >= 0) {
              arrValue.splice(index, 1);
              index = arrValue.indexOf(search)
            }

            const newSearch = button.textContent;
            var index2 = newArr.indexOf(newSearch);
            while (index2 >= 0) {
              newArr.splice(index2, 1);
              index2 = newArr.indexOf(newSearch)
            }
            button.style.backgroundColor = "#ADC0C4";
            
          }else {
            arrValue.push(button.value)
            newArr.push(button.textContent)
            button.style.backgroundColor = "green";
          }
        }else{
          alert(`Você já selecionou a quantidade máxima de números`)
        }
        console.log(maxNumber)
  
      }
    });
  }
  
  function completeGame() {
    if (maxNumber - newArr.length != 0) {
      for (var i = 0; i < maxNumber - newArr.length; i++) {
        arrPosition.push(createNumberUnic()) //gerando uma posição 
      }
    }
    //faço um push do textContent em que a posição indicar e mudo a cor dele.
    makeGreen();
  }
  var createNumberUnic = function createNumberUnic() {
    var sugestion = Math.ceil(Math.random() * range); // Escolher um numero ao acaso
    while (arrPosition.indexOf(sugestion) >= 0) {  // Enquanto o numero já existir, escolher outro
      sugestion = Math.ceil(Math.random() * range);
    }
    return sugestion; // devolver o numero único
  }

  function makeGreen() {
    arr.forEach(function (button) {
      for (var i = 0; i < arrPosition.length; i++) {
        if (arrPosition[i] == button.value) {
          button.style.backgroundColor = "green";
          newArr.push(button.textContent)
        }
      }
    });
    if(maxNumber - newArr.length !=0){ 
      newArr=[];
      for (var i = 0; i < maxNumber - newArr.length; i++) {
        arrPosition.push(createNumberUnic()) //gerando uma posição 
      }
      arr.forEach(function (button) {
      for (var i = 0; i < arrPosition.length; i++) {
        if (arrPosition[i] == button.value) {
          button.style.backgroundColor = "green";
          newArr.push(button.textContent)
        }
      }
    });
    }
  }

  function makeGray() {
    arr.forEach(function (button) {
      for (var i = 0; i < arrPosition.length; i++) {
        if (button.value == arrPosition[i]) {
          button.style.backgroundColor = "#ADC0C4";
        }
      }
    });
    newArr = [];
    if (newArr.length == 0) {
      arr.forEach(function (button) {
        if (button.style.backgroundColor = "green") {
          button.style.backgroundColor = "#ADC0C4";
        }
      });
    }
  }
  
  function createDivInfos() {
    
    if(newArr.length >= maxNumber){
      if(verifyMensage ==true){
        $divMensage.parentNode.removeChild($divMensage);
        verifyMensage = false
      }
      
      $divContainerCart.insertAdjacentHTML("afterbegin", `
      <button id="buttonTrash" data-js="remove"><img src="/assets/lata-de-lixo.svg" alt="lata de lixo" class="svgs"></button>
      <div data-js="removeDiv"style="text-align: left;
      border-left:${colorType};
      border-top: #FFFFFF;
      border-right: #FFFFFF;
      border-bottom: #FFFFFF;
      border-style:solid;
      border-width:5px;
      position: relative;
      left: 40px;
      top: -55px;
      padding: 2px;
      font: italic normal bold 14px/20px Helvetica Neue;
      letter-spacing: 0px;
      color: #868686;
      opacity: 1;">${newArr.sort((a,b)=>a-b)}
      <div style="color:${colorType};font: italic normal bold 16px/70px Helvetica Neue; letter-spacing: 0px;opacity: 1;">${$type.textContent}
      <span data-js="priceGame" style="color:#868686;opacity: 1;"> R\$ ${price.toFixed(2).replace(/\./g, ',')}</span>
      </div>
      </div>` )
      valueTotal = valueTotal + price;
      updateTotal()

      var $btnRemove = doc.querySelector('[data-js="remove"]');
      var $btnRemoveDiv = doc.querySelector('[data-js="removeDiv"]');
      var $priceGame = doc.querySelector('[data-js="priceGame"]');
      $btnRemove.onclick = function clickButton() {
        $btnRemove.parentNode.removeChild($btnRemove);
        $btnRemoveDiv.parentNode.removeChild($btnRemoveDiv);
        valueTotal = valueTotal - $priceGame.textContent.replace(/R\$/g, '');
        updateTotal()
      }
    }else{
      if(maxNumber-newArr.length >1){
        return alert(`Selecione mais ${maxNumber-newArr.length} buttons antes de adicionar ao carrinho`)
      }
      return alert(`Selecione mais ${maxNumber-newArr.length} button antes de adicionar ao carrinho`)
    }
    
  }

  function updateTotal() {
    $total.textContent = '';
    $total.insertAdjacentHTML("beforeend", `TOTAL R\$ ${valueTotal.toFixed(2).replace(/\./g, ',')}`);
  }

})(window, document);
