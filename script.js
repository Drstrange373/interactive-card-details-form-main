// element reference
const cardUserName = document.getElementById('card-username')
const cardUserNumber = document.getElementById('card-number')
const cardExpiry = document.getElementById('card-expiry')
const cardCVV = document.getElementById('cvv')
const inputUserName = document.getElementById('uname')
const inputUserNumber = document.getElementById('ucardnumber')
const inputExpiryMonth = document.getElementById('uexpirymonth')
const inputExpiryYear = document.getElementById('uexpiryyear')
const inputCVV = document.getElementById('ucvv')
const submitButton = document.getElementsByClassName('submit-btn')[0].firstChild
const continueButton = document.getElementById('ctn-btn')
const form = document.getElementsByClassName('form-container')[0]
const thankyouSection = document.getElementsByClassName('thankyou')[0]





// event listeners
inputUserName.addEventListener('input', handelUserNameInput)
inputUserNumber.addEventListener('input', handelUserNumberInput)
inputExpiryMonth.addEventListener('input', handelInputExpiryMonthAndYear)
inputExpiryYear.addEventListener('input', handelInputExpiryMonthAndYear)
inputCVV.addEventListener('input', handelInputCVV)
form.addEventListener('submit', handelSubmit)
continueButton.addEventListener('click', ()=>location.reload())


// function definitions
function clearAllWarnings(){
    const warningElements = Array.from(document.getElementsByClassName('warning'))
    warningElements.forEach((element)=>{
        element.classList.remove('warning-active')
    })
}

function handelUserNameInput(evt){
    clearAllWarnings()
    // Writing in card
    cardUserName.textContent = evt.target.value.toUpperCase().trim()
}

function handelUserNumberInput(evt){
    clearAllWarnings()
    let sanitizedValue = evt.target.value.replaceAll(" ","")
    
    // More than 16 characters are not allowed
    sanitizedValue = sanitizedValue.slice(0, 16)
    
    // Adds whitespace for every 4 characters except for last 4 characters
    evt.target.value = sanitizedValue.replace(/(.{4})(?!$)/g, '$1 ')
    // Writing in card
    cardUserNumber.textContent = evt.target.value
}

function handelInputExpiryMonthAndYear(evt){
    clearAllWarnings()
    let value = evt.target.value

    // If last character is not number
    if(isNaN(parseInt(value[value.length - 1]))){
        value = value.slice(0, value.length-1)
    }
    // More than 2 characters are not allowed
    value = value.slice(0, 2)
    evt.target.value = value

    // Writing in card
    if(evt.target === inputExpiryMonth) {
        cardExpiry.children[0].textContent = evt.target.value
        return
    }
    else if(evt.target === inputExpiryYear){
        cardExpiry.children[1].textContent = evt.target.value
        return
    }
}

function handelInputCVV(evt){
    clearAllWarnings()
    let value = evt.target.value
    
    // If last character is not number
    if(isNaN(parseInt(value[value.length - 1]))){
        value = value.slice(0, value.length-1)
    }

    value = value.slice(0, 3)
    evt.target.value = value

    // Writing in card
    switch(value.length){
        case 1:
            cardCVV.textContent = "00"+value
            break
        case 2:
            cardCVV.textContent = "0"+value
            break
        case 3:
            cardCVV.textContent = value
            break
        default:
            cardCVV.textContent = "000"
    }
}

function handelSubmit(evt){
    evt.preventDefault()
    let isValid = true
    // validation

    if(/[^a-zA-Z\s]/.test(inputUserName.value)){ // to check if value has number or special characters excluding whitespace
        isValid = false
        document.querySelector('.user-name-field').querySelector('.warning').classList.add('warning-active')
    }

    if(/[^0-9]/.test(inputUserNumber.value.replaceAll(" ",""))){ // check if value is not in digit
        isValid = false
        document.querySelector('.card-number-field').querySelector('.warning').classList.add('warning-active')
    }
    else if(inputUserNumber.value.replaceAll(" ", "").length !== 16){
        isValid = false
        document.querySelector('.card-number-field').querySelectorAll('.warning')[1].classList.add('warning-active')
    }

    if(!(inputExpiryMonth.value.trim() && inputExpiryYear.value.trim())){
        isValid = false
        document.querySelector('.exp-date-field').querySelector('.warning').classList.add('warning-active')
    }

    if(!inputCVV.value.trim()){
        isValid = false
        document.querySelector('.cvc-field').querySelector('.warning').classList.add('warning-active')
    }

    // if all checks are passed then 'isValid' will remain unchanged

    if(isValid){
        thankyouSection.style.display = 'flex'
        form.style.display = 'none'
    }
}
