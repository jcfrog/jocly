var selectedGame = "";
var playerURL="https://mi-g.github.io/jocly/examples/browser/control.html";
function startSelectedGame(){
    if(selectedGame == ""){
        alert("Please select a game first");
    }else{
        window.open(playerURL+"?game="+selectedGame,'_blank');
    }
}

var bRulesOpen = false ;
function loadRules(rulesPath,fullPath){
    $("#rules").load(rulesPath, null, function(data, status, jqXGR){
        var re = /{GAME}/gi ;
        data = data.replace(re,fullPath);
        var closeDiv = "<div class='close-rules-button'><a href='javascript:closeRules();'>Close rules</a></div>";
        data = closeDiv+data+closeDiv;
        //console.log(data);
        $("#rules").html(data);
        $("#rules-container").scrollTop(0);
    });
}
function closeRules(){
    bRulesOpen = false ;
    $("#rules").html("");
    $("#rules-container").css("height","10px");
}
function openRules(){
    if(selectedGame == ""){
        alert("Please select a game first");
    }else{
        Jocly.getGameConfig(selectedGame).then((p)=>{
            console.log(p);
            $("#rules-container").css("height","500px");
            bRulesOpen = true ;
            console.log();
            var rulesPath = "" ;
            if (typeof(p.model.rules) == "string"){
                rulesPath = p.view.fullPath+"/"+p.model.rules ; 
            }else{
                if (p.model.rules.en){
                    rulesPath = p.view.fullPath+"/"+p.model.rules.en ; 
                }
            }
            if (rulesPath.length > 0){
                loadRules(rulesPath , p.view.fullPath);
            }else{
                $("#rules").html("<p>Sorry, no rules available for "+p.model["title-en"]+"</p>");
            }
        });
    }
}


function gameClicked(g){
    if (selectedGame !== g.id){
        selectedGame = g.id;
        $(".game-thumb").removeClass("selected-game");
        $(g).addClass("selected-game");
        Jocly.getGameConfig(g.id).then((p)=>{
            console.log(p);
            $("#gd-game-name").text(p.model["title-en"]);
            $("#gd-game-abstract").text(p.model["summary"]);
            $("#gd-buttons-play").css("background","#2dbd2d");
            if (p.model.rules !== undefined){
                $("#gd-buttons-rules").css("background","cornflowerblue");
            }else{
                $("#gd-buttons-rules").css("background","#888888");
            }
            if (bRulesOpen){
                openRules();
            }
            //$("#gd-buttons-play").click(startSelectedGame);
        });
    }
        
    console.log(selectedGame);
}

function addGame(gameName){
    console.log(gameName);
    Jocly.getGameConfig(gameName).then((p)=>{
        console.log(p); 
        //$("#games-panel").append("<div>"+p.model["title-en"]+"</div>");
        var d = $('<div/>', {
            title : p.model["title-en"],
            module : p.model.module,
            id : gameName,
            class : 'game-thumb'        
        }).click(function(){
            gameClicked(this)
        });
        $('<img/>',{
            src : p.view.fullPath+"/"+p.model.thumbnail,
            
        }).appendTo(d);
        $("#games-panel").append(d);
        gameFullPath = p.view.fullPath ;
        if (p.model.rules !== undefined){
            var rulesPath = p.view.fullPath+"/"+p.model.rules.en ;
            console.log(rulesPath);
        }else{
            console.log("no rules for " + gameName );
        }
    })
}


Jocly.listGames()
  .then(function(games) {
    for (g in games){
        addGame(g);
    }
});


