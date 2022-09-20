document.addEventListener("DOMContentLoaded", ()=> {
    const countTap = 27;
    let counter = countTap;
    let skins = document.getElementsByClassName("img-char");
    let selectCharacter = null;

    for(let i = 0; i < skins.length; i++){

        if(skins[i].getAttribute("alt") == localStorage.getItem('Character')){
            selectCharacter = skins[i].parentNode;
            const select = document.createElement("div");
            select.id = "select";
            selectCharacter.appendChild(select);
        }

        skins[i].parentNode.addEventListener("click", function () {
            if(selectCharacter){
                selectCharacter.querySelector("#select").remove();
            }

            const select = document.createElement("div");
            select.id = "select";
            this.appendChild(select);

            selectCharacter = this;
            localStorage.setItem('Character', this.querySelector("img").getAttribute("alt"));
        })
    };

    document.querySelector(".play").addEventListener("click", () => {
        document.location.href = "game.html";
    });

    const surprise = document.createElement("div");
    surprise.classList.add("surprise");
    surprise.style.display = "none";
    surprise.innerText = "Поздравляю! Вы нашли пасхалку! Нажмите играть и Вы увидете сюрприз.";
    document.body.appendChild(surprise);

    document.querySelector(".title-game").addEventListener("click", () => {
        counter--;
        if(counter <= 0){
            if(selectCharacter){
                selectCharacter.querySelector("#select").remove();
            }
            surprise.style.display = "block";
            setTimeout(()=>{
                surprise.style.display = "none";
            },10000);
            localStorage.setItem('Character', "Zombie");
            counter = countTap;
        }

        console.log(counter + " clicks out of " + countTap + " left");
    });
});
