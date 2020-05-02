$(function () {
    let counter = 0;
    let skins = document.getElementsByClassName("img-char");
    let select = document.createElement("div");
    select.id = "select";

    for(let i = 0; i<skins.length;i++){
        
        if(skins[i].getAttribute("alt") == localStorage.getItem('Character')){  
            console.log(skins[i].getAttribute("alt"));
            skins[i].parentNode.appendChild(select);
        } 
    };
    $(".skin").on("click",function () {
        $("#select").remove();
        $(this).append("<div id='select'></div>");
        let selection = $(this).children().eq(0).attr("alt");
        localStorage.setItem('Character', selection);
    });
    $(".play").on("click",function () {
        document.location.href = "game.html";
    });
    $(".title-game").on("click",function () {
        if(counter >= 27){
            $("body").append("<div class='pashalka'>Поздравляю! Вы нашли пасхалку! Нажмите играть и Вы увидете сюрприз.</div>");
            $("#select").remove();
            $(".pashalka").fadeIn(3000);
            setTimeout(()=>{
                $(".pashalka").fadeOut(3000)
            },10000);
            localStorage.setItem('Character', "Zombie");
            counter = 0;
        }
        counter++;
    });
});