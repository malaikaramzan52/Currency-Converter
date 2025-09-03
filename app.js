const BASE_URL=
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".Selects");
const btn = document.getElementById("btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let i = 0;
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
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amVal = amount.value;
    if (amVal === " " || amVal < 1) {
        amVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCae()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data= await response.json();
    console.log(response);

});
