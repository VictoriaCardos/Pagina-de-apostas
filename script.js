(function (win, doc) {
  'use strict';

  var $type = doc.querySelector('[data-js="type"]');

  var $btn0 = doc.querySelector('[data-js="btn0"]');
  var $btn1 = doc.querySelector('[data-js="btn1"]');
  var $btn2 = doc.querySelector('[data-js="btn2"]');

  var $btnCompleteGame = doc.querySelector('[data-js="completeGame"]');
  var $btnClearGame = doc.querySelector('[data-js="clearGame"]');
  var $btnAddToCart = doc.querySelector('[data-js="addToCart"]');

  var $description = doc.querySelector('[data-js="description"]');
  var $containerBtn = doc.querySelector('[data-js="containerBtn"]');

  var $divContainerCart = doc.querySelector('[data-js="containerCart"]');
  var $total = doc.querySelector('[data-js="total"]');

  var cont // usado para determinar qual button vou pegar informações

  var arr = []; //array usado para armazenar buttons 
  var qtdButton; // usado para saber a quantidade de buttons

  var $btn;
  var newArr = [];//usado para guardar os numeros dos buttons selecionados

  var maxNumber; //guarda o numero máximo de cada jogo
  var range; //guarda quantos buttons cada jogo tem
  var price //guarda qual o valor de cada jogo
  var colorType //guarda a cor de cada jogo

  var arrValue = []; //guarda os values dos buttos selecionados para eu poder verificar se ele já existe e poder remover do newArr depois
  var arrPosition = [];

  $btn0.onclick = function clickButton() {
    $btn1.removeAttribute('id');
    $btn2.removeAttribute('id');
    $btn0.setAttribute('id', 'buttonLotofacilClick')
    cont = 0
    chooseGame();
    verifyBtn()
    newArr = [];
  };

  $btn1.onclick = function clickButton() {
    $btn0.removeAttribute('id');
    $btn2.removeAttribute('id');
    $btn1.setAttribute('id', 'buttonMegaClick')
    cont = 1
    chooseGame();
    verifyBtn()
    newArr = [];
  };

  $btn2.onclick = function clickButton() {
    $btn0.removeAttribute('id');
    $btn1.removeAttribute('id');
    $btn2.setAttribute('id', 'buttonLotomaniaClick')
    cont = 2
    chooseGame();
    verifyBtn()
    newArr = []
  };

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

  function chooseGame() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', '/games.json', true);
    ajax.send();
    ajax.addEventListener('readystatechange', getInfos, true);

    function getInfos() { //PEGO INFORMAÇÕES DO ARQUIVO JSON
      if (isRequestOk()) {
        var data = JSON.parse(ajax.responseText);
        if (cont == 0) {
          $type.textContent = data.types[0].type;
          $description.textContent = data.types[0].description;
          maxNumber = data.types[0].maxnumber;
          range = data.types[0].range;
          price = data.types[0].price;
          colorType = data.types[0].color
        }

        if (cont == 1) {
          $type.textContent = data.types[1].type;
          $description.textContent = data.types[1].description;
          maxNumber = data.types[1].maxnumber;
          range = data.types[1].range;
          price = data.types[1].price;
          colorType = data.types[1].color
        }

        if (cont == 2) {
          $type.textContent = data.types[2].type;
          $description.textContent = data.types[2].description;
          maxNumber = data.types[2].maxnumber;
          range = data.types[2].range;
          price = data.types[2].price;
          colorType = data.types[2].color
        }
      }
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

  }

  function verifyBtn() {
    if (cont == 0)
      qtdButton = 25;
    if (cont == 1)
      qtdButton = 60;
    if (cont == 2)
      qtdButton = 80;

    createButton()
  }


  function createButton() {
    clearChildren()
    for (var i = 0; i < qtdButton; i++) {
      $btn = doc.createElement('button');
      $btn.setAttribute('id', 'meuId');
      $btn.textContent = Math.floor(Math.random() * 100);
      $btn.setAttribute('value', i);
      $btn.setAttribute('type', 'button');

      arr.push($btn);
    }
    if (arr.length - qtdButton == 0) {
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

  //fiz com que a função retorne um for each em que cada btn vai ter um .onclick e dentro vou dar um push no newArr se ele ja não foi selecionado

  function getSelectButton() {
    arr.forEach(function (button) {
      button.onclick = function clickButtonT() {

        if (newArr.length <= maxNumber - 1 || button.style.backgroundColor == "green") {

          var some = newArr.some(function (item) {
            return item == button.textContent
          });
          var some2 = arrValue.some(function (item) {
            return item == button.value
          });
          if (some && some2) {
            var buscar = button.value;
            var indice = arrValue.indexOf(buscar);
            while (indice >= 0) {
              arrValue.splice(indice, 1);
              indice = arrValue.indexOf(buscar)
            }

            var buscar2 = button.textContent;
            var indice2 = newArr.indexOf(buscar2);
            while (indice2 >= 0) {
              newArr.splice(indice2, 1);
              indice2 = newArr.indexOf(buscar2)
            }

            button.style.backgroundColor = "#ADC0C4";
          } else {
            arrValue.push(button.value)
            newArr.push(button.textContent)
            button.style.backgroundColor = "green";

          }
        }
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
        if (button.value == arrPosition[i]) {
          newArr.push(button.textContent)
          button.style.backgroundColor = "green";
        }
      }
    });
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
  var valueTotal = 0


  function createDivInfos() {
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
    padding: 6px;
    font: italic normal bold 15px/20px Helvetica Neue;
    letter-spacing: 0px;
    color: #868686;
    opacity: 1;">${newArr}
    <div style="color:${colorType};font: italic normal bold 16px/70px Helvetica Neue; letter-spacing: 0px;opacity: 1;">${$type.textContent}
    <span data-js="priceGame" style="color:#868686;opacity: 1;"> R\$ ${price}</span>
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
  }

  function updateTotal() {
    $total.textContent = '';
    $total.insertAdjacentHTML("beforeend", `TOTAL R\$ ${valueTotal}`);
  }

})(window, document);
