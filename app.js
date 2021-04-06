/*
  - Construa uma aplicação de conversão de moedas. O HTML e CSS são os que você
    está vendo no browser;
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento, 
    concentre-se em executar o que descreverei abaixo;
    - Quando a página for carregada: 
      - Popule os <select> com tags <option> que contém as moedas que podem ser
        convertidas. "BRL" para real brasileiro, "EUR" para euro, "USD" para 
        dollar dos Estados Unidos, etc.  --------------------------------------------OK
      - O option selecionado por padrão no 1º <select> deve ser "USD" e o option
        no 2º <select> deve ser "BRL"; OK --------------------------------------------OK
      - O parágrafo com data-js="converted-value" deve exibir o resultado da 
        conversão de 1 USD para 1 BRL; OK---------------------------------------------OK
      - Quando um novo número for inserido no input com 
        data-js="currency-one-times", o parágrafo do item acima deve atualizar 
        seu valor; -------------------------------------------------------------------OK
      - O parágrafo com data-js="conversion-precision" deve conter a conversão 
        apenas x1. Exemplo: 1 USD = 5.0615 BRL;
      - O conteúdo do parágrafo do item acima deve ser atualizado à cada 
        mudança nos selects;
      - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
        cada mudança nos selects e/ou no input com data-js="currency-one-times";
      - Para que o valor contido no parágrafo do item acima não tenha mais de 
        dois dígitos após o ponto, você pode usar o método toFixed: 
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    - Para obter as moedas com os valores já convertidos, use a Exchange rate 
      API: https://www.exchangerate-api.com/;
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
*/
const selectOne = document.getElementById('currency-selectOne')
const selectTwo = document.getElementById('currency-selectTwo')
const convertedValueContainer = document.querySelector('[data-js="converted-value"]')
const currencyOneTimes = document.querySelector('[data-js="currency-one-times"]')
const apiKey = '8d8167ec31c1ecbc880d68fd'
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`
let valueOne = 'USD'
let valueTwo = 'BRL'
let dataObj = ''
let valueUni = 1



const getdata = async () => {
  const response = await fetch(url + 'USD')
  const data = await response.json()
  dataObj = data
  makeSelectOne(data.conversion_rates)
  makeSelectTwo(data.conversion_rates)
}


getdata()
/* const getdataUpdate = async () =>{
  const response = await fetch(url)
  const data = await response.json()
  dataObj = data
  return data
} */

currencyOneTimes.addEventListener('input', event => {

  valueUni = event.target.value
  //console.log(dataObj.conversion_rates[valueOne], dataObj.conversion_rates[valueTwo])
  if (valueOne === "USD") {
    let attValue = valueUni * dataObj.conversion_rates[valueTwo]
    convertedValueContainer.innerHTML = attValue.toFixed(2)
  } else {
    let attValue = valueUni * (dataObj.conversion_rates[valueTwo] / dataObj.conversion_rates[valueOne])
    convertedValueContainer.innerHTML = attValue.toFixed(2)
  }


})


let makeSelectOne = data => {
  let arrayC = ''
  let cee = Object.keys(data).map(item => {
    arrayC += `<option id="selectOne" value='${item}'>${item}</option> `
  })
  selectOne.innerHTML = arrayC
  updateCurrencyShowed(valueTwo)
}

let makeSelectTwo = data => {
  let arrayC = ''
  let cee = Object.keys(data).map(item => {
    arrayC += `${item === 'BRL' ? `<option  id="selectTwo" selected value='${item}'>${item}</option> `
      : `<option id="selectTwo" value='${item}'>${item}</option>`}`
  })
  selectTwo.innerHTML = arrayC
}

let showSelected = (selectValue) => {
  document.querySelectorAll(selectValue).forEach(item => {
    if (item.selected) {
      if (selectValue == '#selectTwo') {
        valueTwo = item.getAttribute('value')
        console.log("teste", dataObj.conversion_rates['GBP'], dataObj.conversion_rates['USD'], 'valueTwo: ', dataObj.conversion_rates[valueTwo], 'valueOne: ', dataObj.conversion_rates[valueOne] )
        let attValue = valueUni * (dataObj.conversion_rates[valueTwo] / dataObj.conversion_rates[valueOne])
        convertedValueContainer.innerHTML = attValue.toFixed(2)
      } if (selectValue == '#selectOne') {
        valueOne = item.getAttribute('value')
        console.log('ts ')
        let attValue = valueUni * (dataObj.conversion_rates[valueTwo] / dataObj.conversion_rates[valueOne])
        convertedValueContainer.innerHTML = attValue.toFixed(2)


      }
    }
  })
}

let updateCurrencyShowed = (valueTwo) => {
  let attValue = valueUni * dataObj.conversion_rates[valueTwo]
  convertedValueContainer.innerHTML = attValue.toFixed(2)
}



