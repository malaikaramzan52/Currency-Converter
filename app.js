const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".Selects");
const btn = document.getElementById("btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.getElementById("msg");
let i = 0;
window.addEventListener("load", () => {
    updateExchangeRate();
});


//country list
for (let select of dropdown) {
    for (currCode in countryList) {
        // console.log(code,countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
    const updateExchangeRate = async () => {
        let amount = document.querySelector(".amount input");
        let amVal = amount.value;

        if (amVal.trim() === "" || amVal < 1) {
            amVal = 1;
            amount.value = "1";
        }

        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        // console.log(rate);
        let finalAmount = (amVal * rate);
        msg.innerText = `${amVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    }

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

