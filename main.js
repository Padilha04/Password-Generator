//Default Value

let passwordLength = 16;

let password = "";

//Element Access

const rangeSlider = document.querySelector("#password-length");

const passwordInput = document.querySelector("#password");

const upperCaseEl = document.querySelector(".uppercase-check");

const numbersEl = document.querySelector(".numbers-check");

const symbolsEl = document.querySelector(".symbol-check");

const passSizeEl = document.querySelector("#password-length-text");

const passwordForceIndicatorEl = document.querySelector("#passwordForceIndicator")

const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");

//Constant Creation

const upperChars = "ABCDEFGHJKLMNPQRSTUVXZ";

const numbersChars = "123456789";

const symbolsChars = "?!@&$%*#()[]";

//Functions

function generatePassword() {
  let chars = "abcdefghjklmnpqrstuvxz";

  password = "";

  for (let i = 0; i < rangeSlider.value; i++) {
    if (upperCaseEl.checked === true) {
      chars += upperChars;
    }

    if (numbersEl.checked === true) {
      chars += numbersChars;
    }

    if (symbolsEl.checked === true) {
      chars += symbolsChars;
    }

    const randomNumberChar = Math.floor(Math.random() * chars.length);

    password += chars.substring(randomNumberChar, randomNumberChar + 1);
  }
}

function checkValidPassword() {
  generatePassword();
  securityPercentCheck();
  calculateFontSize()

  function checkPasswordValidByType(charType) {
    var check = false;
    let checkResult = "";
    for (i = 0; i < charType.length; i++) {
      check += password.includes(charType.substring(i, i + 1));
    }

    if (check === 0) {
      checkResult = false;
    } else {
      checkResult = true;
    }
    return checkResult;
  }

  if (
    ((upperCaseEl.checked === true &&
      checkPasswordValidByType(upperChars) === true) ||
      upperCaseEl.checked === false) &&
    ((numbersEl.checked === true &&
      checkPasswordValidByType(numbersChars) === true) ||
      numbersEl.checked === false) &&
    ((symbolsEl.checked === true &&
      checkPasswordValidByType(symbolsChars) === true) ||
      symbolsEl.checked === false)
  ) {
    passwordInput.value = password;
  } else {
    generatePassword();
  }
}

function securityPercentCheck() {
  const percent = Math.round(
    (passwordLength / 64) * 100 * 0.25 +
      (upperCaseEl.checked ? 15 : 0) +
      (numbersEl.checked ? 25 : 0) +
      (symbolsEl.checked ? 35 : 0)
  );

  securityIndicatorBarEl.style.width = `${percent}%`;

  console.log(percent);

  if (percent < 20) {
    securityIndicatorBarEl.classList.add("critical");
    passwordForceIndicatorEl.classList.add("criticalText")
    passwordForceIndicatorEl.innerHTML ='Senha: Fraca'
  } else {
    securityIndicatorBarEl.classList.remove("critical");
    passwordForceIndicatorEl.classList.remove("criticalText")
  }
  if (percent >= 20 && percent < 70) {
    securityIndicatorBarEl.classList.add("warning");
    passwordForceIndicatorEl.classList.add("warningText")
    passwordForceIndicatorEl.innerHTML ='Senha: Intermediária'
  } else {
    securityIndicatorBarEl.classList.remove("warning");
    passwordForceIndicatorEl.classList.remove("warningText")
  }
  if (percent >= 70) {
    securityIndicatorBarEl.classList.add("safe");
    passwordForceIndicatorEl.classList.add("safeText")
    passwordForceIndicatorEl.innerHTML ='Senha: Forte'
  } else {
    securityIndicatorBarEl.classList.remove("safe");
    passwordForceIndicatorEl.classList.remove("safeText")
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed");
  } else {
    securityIndicatorBarEl.classList.remove("completed");
  }
}
function calculateFontSize() {
  if (passwordLength >= 45) {
    passwordInput.classList.remove('font-sm')
    passwordInput.classList.remove('font-xs')
    passwordInput.classList.add('font-xxs')

  } else if(passwordLength >= 32){
    passwordInput.classList.remove('font-xxs')
    passwordInput.classList.remove('font-sm')
    passwordInput.classList.add('font-xs')

  } else if(passwordLength >= 22){
    passwordInput.classList.remove('font-xs')
    passwordInput.classList.remove('font-xxs')
    passwordInput.classList.add('font-sm')

  } else {
    passwordInput.classList.remove('font-xs')
    passwordInput.classList.remove('font-xxs')
    passwordInput.classList.remove('font-sm')
  }

}

function copy() {
  navigator.clipboard.writeText(passwordInput.value);
}

//Events

upperCaseEl.addEventListener("click", () => {
  checkValidPassword();
});

symbolsEl.addEventListener("click", () => {
  checkValidPassword();
});

numbersEl.addEventListener("click", () => {
  checkValidPassword();
});

rangeSlider.addEventListener("input", () => {
  passwordLength = rangeSlider.value;
  passSizeEl.innerText = passwordLength;
  checkValidPassword();
});

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);

document.querySelector("#refresh").addEventListener("click", checkValidPassword);

// First Password Generated

checkValidPassword();

