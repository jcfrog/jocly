exports.config = {"status":true,"model":{"gameOptions":{"levelOptions":{"distKingCornerFactor":0.1,"castleFactor":0.1,"distPawnPromo3Factor":0.05,"pieceValueRatioFactor":1,"averageDistKingFactor":-0.01,"endingKingFreedomFactor":0.01,"posValueFactor":0.1,"endingDistKingFactor":0.05,"minorPiecesMovedFactor":0.1,"checkFactor":0.2,"distPawnPromo1Factor":0.3,"pieceValueFactor":1,"distPawnPromo2Factor":0.1},"uctIgnoreLoop":false,"preventRepeat":true,"uctTransposition":"state"},"thumbnail":"dukerutland-thumb.png","description":{"en":"dukerutland-description.html"},"js":["base-model.js","grid-geo-model.js","dukerutland-model.js"],"module":"chessbase","plazza":"true","obsolete":false,"title-en":"Duke of Rutland Chess","summary":"Chess on 14x10 (1747)","levels":[{"label":"Easy","ai":"uct","minVisitsExpand":1,"ignoreLeaf":false,"maxNodes":1000,"uncertaintyFactor":3,"name":"easy","playoutDepth":0,"c":0.6},{"c":0.6,"isDefault":true,"name":"fast","playoutDepth":0,"uncertaintyFactor":3,"label":"Fast [1sec]","ignoreLeaf":false,"ai":"uct","maxDuration":1,"minVisitsExpand":1},{"maxNodes":10000,"uncertaintyFactor":3,"minVisitsExpand":1,"maxDuration":10,"ai":"uct","ignoreLeaf":false,"label":"Medium","c":0.6,"playoutDepth":0,"name":"medium"},{"maxNodes":20000,"uncertaintyFactor":3,"minVisitsExpand":1,"maxDuration":15,"ai":"uct","ignoreLeaf":false,"label":"Strong","c":0.6,"playoutDepth":0,"name":"strong"}],"released":1405068608,"rules":{"en":"dukerutland-rules.html"},"credits":{"en":"dukerutland-credits.html"}},"view":{"switchable":true,"js":["base-view.js","grid-board-view.js","fairy-set-view.js","dukerutland-view.js"],"skins":[{"camera":{"elevationAngle":60,"fov":45,"elevationMin":0,"radius":18,"distMax":50},"name":"skin3d","3d":true,"preload":["smoothedfilegeo|0|/res/ring-target.js","image|/res/images/cancel.png","image|/res/images/wikipedia.png","smoothedfilegeo|0|/res/fairy/pawn/pawn.js","image|/res/fairy/pawn/pawn-diffusemap.jpg","image|/res/fairy/pawn/pawn-normalmap.jpg","smoothedfilegeo|0|/res/fairy/knight/knight.js","image|/res/fairy/knight/knight-diffusemap.jpg","image|/res/fairy/knight/knight-normalmap.jpg","smoothedfilegeo|0|/res/fairy/bishop/bishop.js","image|/res/fairy/bishop/bishop-diffusemap.jpg","image|/res/fairy/bishop/bishop-normalmap.jpg","smoothedfilegeo|0|/res/fairy/king/king.js","image|/res/fairy/king/king-diffusemap.jpg","image|/res/fairy/king/king-normalmap.jpg","smoothedfilegeo|0|/res/fairy/rook/rook.js","image|/res/fairy/rook/rook-diffusemap.jpg","image|/res/fairy/rook/rook-normalmap.jpg","smoothedfilegeo|0|/res/fairy/queen/queen.js","image|/res/fairy/queen/queen-diffusemap.jpg","image|/res/fairy/queen/queen-normalmap.jpg","smoothedfilegeo|0|/res/fairy/marshall/marshall.js","image|/res/fairy/marshall/marshall-diffusemap.jpg","image|/res/fairy/marshall/marshall-normalmap.jpg","smoothedfilegeo|0|/res/fairy/crowned-rook/crowned-rook.js","image|/res/fairy/crowned-rook/crowned-rook-diffusemap.jpg","image|/res/fairy/crowned-rook/crowned-rook-normalmap.jpg"],"world":{"fog":false,"color":4686804,"lightCastShadow":true,"ambientLightColor":2236962,"skyLightIntensity":1.2,"skyLightPosition":{"x":9,"z":9,"y":9},"lightIntensity":1.3,"lightPosition":{"z":9,"x":-9,"y":9},"lightShadowDarkness":0.55},"title":"3D Classic"},{"3d":false,"name":"skin2d","title":"2D Classic","preload":["image|/res/images/cancel.png","image|/res/images/whitebg.png","image|/res/fairy/wikipedia-fairy-sprites.png"]}],"sounds":{"usermove":null,"move4":"alq_move2","tac3":"alq_tac1","tac1":"alq_tac1","move2":"alq_move2","move3":"alq_move3","tac2":"alq_tac2","move1":"alq_move1","promo":"promo"},"visuals":{"600x600":["res/visuals/dukerutland-600x600-3d.jpg","res/visuals/dukerutland-600x600-2d.jpg"]},"module":"chessbase","useAutoComplete":true,"defaultOptions":{"sounds":true,"moves":true,"autocomplete":false,"notation":false},"useNotation":true,"xdView":true,"animateSelfMoves":false,"preferredRatio":1,"useShowMoves":true,"title-en":"Chessbase view","css":["chessbase.css"]}}