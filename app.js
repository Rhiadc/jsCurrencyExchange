
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


currencyOneTimes.addEventListener('input', event => {

  valueUni = event.target.value
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



