const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = search.value;

    if (searchValue.length === 0) {
        return alert("Rellene el campo");
    }

    messageOne.textContent = "cargando...";
    messageTwo.textContent = "";

    fetch("/weather?address=" + searchValue).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageOne.classList.add("error");
                setTimeout(() => {
                    messageOne.textContent = "";
                    messageOne.classList.remove("error");
                }, 2000);
            } else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        });
    });
});
