(function () {

    // url params
    const regex = /[(\?|\&)]([^=]+)\=([^&#]+)/g;
    const str = window.location.href ; 
    let m;
    var params = [];
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        params[m[1]]=m[2];
    }

    var bV2 = false ; // v2 game, quarks do not jump, queen restricted to 64 classiccenter cells
    var bBlackStarts = false ;
    var bVSChess = false ;
    if(params["v2"] && params["v2"]=="y"){
        bV2 = true ;
    }
    if(params["bs"] && params["bs"]=="y"){
        bBlackStarts = true ;
    }
    if(params["vc"] && params["vc"]=="y"){
        bVSChess = true ;
    }


    //console.log("piecesTypes=",piecesTypes);
    // defining types for readable promo cases
    var T_ipawnw = 0;
    var T_ipawnb = 1;
    var T_pawnw = 2;
    var T_pawnb = 3;
    var T_rook = 4;
    var T_bishop = 5;
    var T_knight = 6;
    var T_queen = 7;
    var T_king = 8;
    var T_mind = 9;
    var T_env = 10;
    var T_dna = 11;
    var T_quarks = 12;
    var T_sun = 13;
    var T_moon = 14;
    var T_princess = 15;
    var T_prince = 16;
    var T_quarks_proton = 17;
    var T_imind = 18;
    var T_ienv = 19;



    var firstRow = 0;
    var lastRow = 9;
    var firstCol = 0;
    var lastCol = 9;

    var geometry = Model.Game.cbBoardGeometryGrid(10, 10);

    var confine = {};
    var restrictedConfine = {};

    for (var pos = 0; pos < geometry.boardSize; pos++) {
        confine[pos] = 1;
        if ( ((pos >= 0) && (pos < 10)) || (pos % 10 == 0) || (pos % 10 == 9) || ((pos >= 90) && (pos < 100)) ){
            // ignore 
        }else{
            restrictedConfine[pos] = 1;
        }
    }

    // graphs
    var rotMx = {
        "135": [[-1, 1], [-1, -1]],
        "90": [[0, 1], [-1, 0]],
        "45": [[1, 1], [-1, 1]],
        "0": [[1, 0], [0, 1]],
        "-45": [[1, -1], [1, 1]],
        "-90": [[0, -1], [1, 0]],
        "-135": [[-1, -1], [1, -1]]
    }

    function normalize(n) {
        if (n == 0) return n;
        return n / Math.abs(n);
    }
    function scalar(matrix, vector) {
        return [
            normalize(matrix[0][0] * vector[0] + matrix[1][0] * vector[1]),
            normalize(matrix[0][1] * vector[0] + matrix[1][1] * vector[1])
        ]
    }

    function Biffurc(dir, rot) {
        var newDir = dir;
        if (rot != "0") {
            newDir = scalar(rotMx[rot], dir);
        }
        return newDir;
    }

    // path meaning :  
    // initialDir : [dxstart,dystart] , 
    // path : [ [rot1,nb to go that dir,localflag],[rot2,nb to go that dir,localflag] ] , rotations from "-135" to "135", with a 45° step. nb=-1 = no limit
    // path includes flags for each part of the trip

    var FLAG_JUMP = 0x800000; // jump over this path

    Model.Game.cbExploreFlagedWay = function (pos, initialDir, path, graph, confine, geometry, flags) {
        var $this = this;
        var dir = initialDir;
        var away = [];
        var pos1 = pos;
        path.forEach(function (way) {
            dir = Biffurc(dir, way[0]);
            var dist = way[1];
            var localflag = flags;
            if (way[2]) {
                localflag = way[2];
            }
            var n = 0;
            while (((n < dist) || (dist == -1)) && pos1 != null) {
                pos1 = geometry.Graph(pos1, dir);
                if (pos1 != null && (!confine || (pos1 in confine)) && (localflag != FLAG_JUMP))
                    away.push(pos1 | localflag);
                n++;
            }
        });
        if (away.length > 0) {
            graph[pos].push($this.cbTypedArray(away));
        }
    }


    Model.Game.cbMindGraph = function (geometry, confine, bJump = false) {
        var $this = this;
        var flags = $this.cbConstants.FLAG_MOVE | $this.cbConstants.FLAG_CAPTURE;
        var jumpflag = $this.cbConstants.FLAG_STOP ;
        if(bJump){
			jumpflag = FLAG_JUMP ;
		}
        var graph = {};
        for (var pos = 0; pos < geometry.boardSize; pos++) {
            graph[pos] = [];
            if (confine && !(pos in confine)) {
                continue;
            }
            [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]].forEach(function (dc) {
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, jumpflag], ["0", 1, jumpflag], ["45", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, jumpflag], ["0", 1, jumpflag], ["-45", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, jumpflag], ["45", 1, jumpflag], ["0", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, jumpflag], ["-45", 1, jumpflag], ["0", 1]], graph, confine, geometry, flags);
            });
        }
        return graph;
    }
    Model.Game.cbEnvGraph = function (geometry, confine, bJump = false) {
		//return this.cbShortRangeGraph(geometry, [[-3, -1], [-3, 1], [-1, 3], [1, 3], [3, 1], [3, -1], [1, -3], [-1, -3]], confine);
        var $this = this;
        var flags = $this.cbConstants.FLAG_MOVE | $this.cbConstants.FLAG_CAPTURE;
        var jumpflag = $this.cbConstants.FLAG_STOP ;
		if(bJump){
			jumpflag = FLAG_JUMP ;
		}
        var graph = {};
        for (var pos = 0; pos < geometry.boardSize; pos++) {
            graph[pos] = [];
            [[1, 1], [1, -1], [-1, -1], [-1, -1]].forEach(function (dc) {
				$this.cbExploreFlagedWay(pos, dc, [["0", 1, jumpflag], ["-90", 1, jumpflag], ["0", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, jumpflag], ["90", 1,  jumpflag], ["0", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 2, jumpflag], ["-90", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 2, jumpflag], ["90", 1]], graph, confine, geometry, flags);
            });
        }

        return graph;
		
    }
    Model.Game.cbDNAGraph = function (geometry, confine) {
        return this.cbShortRangeGraph(geometry, [[-2, 0], [-2, 2], [0, 2], [2, 2], [2, 0], [2, -2], [0, -2], [-2, -2]], confine);
    }
    Model.Game.cbQuarksGraph = function (geometry, confine) {
        var $this = this;
        var flags = $this.cbConstants.FLAG_MOVE | $this.cbConstants.FLAG_CAPTURE;
        var jumpflag = $this.cbConstants.FLAG_STOP ;
		if(!bV2){
			jumpflag = FLAG_JUMP ;
		}
        var graph = {};
        for (var pos = 0; pos < geometry.boardSize; pos++) {
            graph[pos] = [];
            [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(function (dc) {
				$this.cbExploreFlagedWay(pos, dc, [["0", 1, $this.cbConstants.FLAG_STOP], ["-90", 2, jumpflag], ["-90", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, $this.cbConstants.FLAG_STOP], ["90", 2,  jumpflag], ["90", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, $this.cbConstants.FLAG_STOP], ["-90", 2, jumpflag], ["0", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, $this.cbConstants.FLAG_STOP], ["90", 2,  jumpflag], ["0", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 2, jumpflag], ["-90", 1, $this.cbConstants.FLAG_STOP], ["-90", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 2, jumpflag], ["90", 1, $this.cbConstants.FLAG_STOP], ["90", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 2, jumpflag], ["-90", 1, jumpflag],["0", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 2, jumpflag], ["90", 1, jumpflag],["0", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 3, jumpflag], ["-90", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 3, jumpflag], ["90", 1]], graph, confine, geometry, flags);
            });
        }

        return graph;
    }
    Model.Game.cbSunGraph = function (geometry, confine) {
        return this.cbQueenGraph(geometry, confine);
    }
    Model.Game.cbMoonGraph = function (geometry, confine) {
        var $this = this;
        var flags = $this.cbConstants.FLAG_MOVE | $this.cbConstants.FLAG_CAPTURE;
        var graph = {};
        for (var pos = 0; pos < geometry.boardSize; pos++) {
            graph[pos] = [];
            if (confine && !(pos in confine)) {
                continue;
            }
            [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]].forEach(function (dc) {
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, FLAG_JUMP], ["45", 1, $this.cbConstants.FLAG_STOP], ["45", 1]], graph, confine, geometry, flags);
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, FLAG_JUMP], ["-45", 1, $this.cbConstants.FLAG_STOP], ["-45", 1]], graph, confine, geometry, flags);
            });
        }
        return graph;
    }
    Model.Game.cbPrinceGraph = function (geometry, confine) {
        var $this = this;
        var flags = $this.cbConstants.FLAG_MOVE | $this.cbConstants.FLAG_CAPTURE;
        var graph = {};
        for (var pos = 0; pos < geometry.boardSize; pos++) {
            graph[pos] = [];
            if (confine && !(pos in confine)) {
                continue;
            }
            [[-1, 1], [1, 1], [1, -1], [-1, -1]].forEach(function (dc) {
                $this.cbExploreFlagedWay(pos, dc, [["0", -1]], graph, confine, geometry, flags);
            });
            /*[[-1, 0], [0, 1], [1, 0], [0, -1]].forEach(function (dc) {
                $this.cbExploreFlagedWay(pos, dc, [["0", 1, $this.cbConstants.FLAG_CAPTURE]], graph, confine, geometry, flags);
            });*/

        }

        return graph;
    }
    Model.Game.cbPrincessGraph = function (geometry, confine) {
        return this.cbPrinceGraph(geometry, confine);
    }

    // game definition 
    Model.Game.cbDefine = function () {

        // classic chess pieces
        var confine4Queen = confine ;
        if (bV2){
            confine4Queen = restrictedConfine ;
        }

        var piecesTypes = {


            0: {
                name: 'ipawnw',
                fenAbbrev: 'P',
                aspect: 'fr-pawn',
                graph: this.cbInitialPawnGraph(geometry, 1, confine),
                value: 1,
                initial: [{ s: 1, p: 20 }, { s: 1, p: 21 }, { s: 1, p: 22 }, { s: 1, p: 23 }, { s: 1, p: 24 }, { s: 1, p: 25 }, { s: 1, p: 26 }, { s: 1, p: 27 }, { s: 1, p: 28 }, { s: 1, p: 29 }],
                /*initial: bVSChess ? 
                    [{ s: 1, p: 21 }, { s: 1, p: 22 }, { s: 1, p: 23 }, { s: 1, p: 24 }, { s: 1, p: 25 }, { s: 1, p: 26 }, { s: 1, p: 27 }, { s: 1, p: 28 }] : 
                    [{ s: 1, p: 20 }, { s: 1, p: 21 }, { s: 1, p: 22 }, { s: 1, p: 23 }, { s: 1, p: 24 }, { s: 1, p: 25 }, { s: 1, p: 26 }, { s: 1, p: 27 }, { s: 1, p: 28 }, { s: 1, p: 29 }],*/
                epTarget: true,
            },

            1: {
                name: 'ipawnb',
                fenAbbrev: 'P',
                aspect: 'fr-pawn',
                graph: this.cbInitialPawnGraph(geometry, -1, confine),
                value: 1,
                initial: bVSChess ? 
                    [{ s: -1, p: 71 }, { s: -1, p: 72 }, { s: -1, p: 73 }, { s: -1, p: 74 }, { s: -1, p: 75 }, { s: -1, p: 76 }, { s: -1, p: 77 }, { s: -1, p: 78 }] :
                    [{ s: -1, p: 70 }, { s: -1, p: 71 }, { s: -1, p: 72 }, { s: -1, p: 73 }, { s: -1, p: 74 }, { s: -1, p: 75 }, { s: -1, p: 76 }, { s: -1, p: 77 }, { s: -1, p: 78 }, { s: -1, p: 79 }],
                epTarget: true,
            },

            2: {
                name: 'pawnw',
                fenAbbrev: 'P',
                aspect: 'fr-pawn',
                graph: this.cbPawnGraph(geometry, 1, confine),
                value: 1,
                initial: [],
                epCatch: true,
            },

            3: {
                name: 'pawnb',
                fenAbbrev: 'P',
                aspect: 'fr-pawn',
                graph: this.cbPawnGraph(geometry, -1, confine),
                value: 1,
                initial: [],
                epCatch: true,
            },

            4: {
                name: 'rook',
                abbrev: 'R',
                aspect: 'fr-rook',
                graph: this.cbRookGraph(geometry, confine),
                value: 5,
                castle: true,
                initial: [{ s: 1, p: 11 }, { s: 1, p: 18 }, { s: -1, p: 81 }, { s: -1, p: 88 }],
            },

            5: {
                name: 'bishop',
                abbrev: 'B',
                aspect: 'fr-bishop',
                graph: this.cbBishopGraph(geometry, confine),
                value: 3,
                initial: [{ s: 1, p: 13 }, { s: 1, p: 16 }, { s: -1, p: 83 }, { s: -1, p: 86 }],
            },

            6: {
                name: 'knight',
                abbrev: 'N',
                aspect: 'fr-knight',
                graph: this.cbKnightGraph(geometry, confine),
                value: 3,
                initial: [{ s: 1, p: 12 }, { s: 1, p: 17 }, { s: -1, p: 82 }, { s: -1, p: 87 }],
            },

            7: {
                name: 'queen',
                abbrev: 'Q',
                aspect: 'fr-queen',
                graph: this.cbQueenGraph(geometry, confine4Queen),
                value: 9,
                initial: [{ s: 1, p: bBlackStarts ? 15 : 14 }, { s: -1, p: bBlackStarts ? 85 : 84 }],
            },

            8: {
                name: 'king',
                abbrev: 'K',
                aspect: 'fr-king',
                graph: this.cbKingGraph(geometry, confine),
                isKing: true,
                initial: [{ s: 1, p: bBlackStarts ? 14 : 15 }, { s: -1, p: bBlackStarts ? 84 : 85 }],
            },

            9: {
                name: 'mind',
                abbrev: 'M',
                aspect: 'fr-mind',
                graph: this.cbMindGraph(geometry, confine),
                value: 5,
            },

            10: {
                name: 'env',
                abbrev: 'E',
                aspect: 'fr-env',
                graph: this.cbEnvGraph(geometry, confine),
                value: 5,
            },

            11: {
                name: 'dna',
                abbrev: 'D',
                aspect: 'fr-dna',
                graph: this.cbDNAGraph(geometry, confine),
                value: 2,
                initial: bVSChess ? [{ s: 1, p: 2 }, { s: 1, p: 7 }] : [{ s: 1, p: 2 }, { s: 1, p: 7 }, { s: -1, p: 92 }, { s: -1, p: 97 }],
            },

            12: {
                name: 'quarks',
                abbrev: 'A',
                aspect: 'fr-quarks',
                graph: this.cbQuarksGraph(geometry, confine),
                value: 7,
                initial: bVSChess ? [{ s: 1, p: bBlackStarts ? 6 : 3 }] : [{ s: 1, p: bBlackStarts ? 6 : 3 }, { s: -1, p: bBlackStarts ? 96 : 93 }],
            },

            13: {
                name: 'sun',
                abbrev: 'S',
                aspect: 'fr-sun',
                graph: this.cbSunGraph(geometry, confine),
                value: 10,
                initial: bVSChess ? [{ s: 1, p: 4 }] : [{ s: 1, p: 4 }, { s: -1, p: 94 }],
            },

            14: {
                name: 'moon',
                abbrev: 'L',
                aspect: 'fr-moon',
                graph: this.cbMoonGraph(geometry, confine),
                value: 8,
                initial: bVSChess ? [{ s: 1, p: 5 }] : [{ s: 1, p: 5 }, { s: -1, p: 95 }],
            },

            15: {
                name: 'princess',
                abbrev: 'X',
                aspect: 'fr-princess',
                graph: this.cbPrincessGraph(geometry, confine),
                value: 4,
                initial: bVSChess ? [{ s: 1, p: bBlackStarts ? 10 : 19 }] : [{ s: 1, p: bBlackStarts ? 10 : 19 }, { s: -1, p: bBlackStarts ? 80 : 89 }],
            },

            16: {
                name: 'prince',
                abbrev: 'Y',
                aspect: 'fr-prince',
                graph: this.cbPrinceGraph(geometry, confine),
                value: 4,
                initial: bVSChess ? [{ s: 1, p: bBlackStarts ? 19 : 10 }] : [{ s: 1, p: bBlackStarts ? 19 : 10 }, { s: -1, p: bBlackStarts ? 89 : 80 }],
            },

            17: {
                name: 'quarks',
                abbrev: 'A',
                aspect: 'fr-quarks-proton',
                graph: this.cbQuarksGraph(geometry, confine),
                value: 7,
                initial: bVSChess ? [{ s: 1, p: bBlackStarts ? 3 : 6 }] : [{ s: 1, p: bBlackStarts ? 3 : 6 }, { s: -1, p: bBlackStarts ? 93 : 96 }],
            },

            18: {
                name: 'imind',
                abbrev: 'M',
                aspect: 'fr-mind',
                graph: this.cbMindGraph(geometry, confine, true),
                value: 5,
                initial: bVSChess ? [{ s: 1, p: 0 }, { s: 1, p: 9 }] : [{ s: 1, p: 0 }, { s: 1, p: 9 }, { s: -1, p: 90 }, { s: -1, p: 99 }],
            },

            19: {
                name: 'ienv',
                abbrev: 'E',
                aspect: 'fr-env',
                graph: this.cbEnvGraph(geometry, confine, true),
                value: 5,
                initial: bVSChess ? [{ s: 1, p: 1 }, { s: 1, p: 8 }] : [{ s: 1, p: 1 }, { s: 1, p: 8 }, { s: -1, p: 91 }, { s: -1, p: 98 }],
            }
        }



        return {

            geometry: geometry,

            pieceTypes: piecesTypes,

            promote: function (aGame, piece, move) {
                // initial pawns go up to last row where it promotes to Queen

                if (piece.t == T_ipawnw)
                    return [T_pawnw];
                if (piece.t == T_ipawnb)
                    return [T_pawnb];
                if (piece.t == T_pawnw && (geometry.R(move.t) == lastRow))
                    return [T_rook, T_knight, T_bishop, T_queen];

                if (piece.t == T_pawnb && (geometry.R(move.t) == firstRow))
                    return [T_rook, T_knight, T_bishop, T_queen];
                    
                if (piece.t == T_ienv)
                    return [T_env];
                if (piece.t == T_imind)
                    return [T_mind];
                return [];
            },

            castle: {
                /*"4/0": { k: [3, 2], r: [1, 2, 3], n: "O-O-O" },
                "4/7": { k: [5, 6], r: [6, 5], n: "O-O" },
                "60/56": { k: [59, 58], r: [57, 58, 59], n: "O-O-O" },
                "60/63": { k: [61, 62], r: [62, 61], n: "O-O" },*/
            },

        };
    }
    
    var SuperModelBoardGenerateMoves=Model.Board.GenerateMoves;
	Model.Board.GenerateMoves = function(aGame) {

		SuperModelBoardGenerateMoves.apply(this,arguments); // call regular GenerateMoves method

		// prince-ss special moves
		var geo = aGame.cbVar.geometry ;
		var board = aGame.mBoard.board ;
		var $this = this ;
		var xtraMoves = [];
        for (var i = 0 ; i < this.mMoves.length ; i ++){
			var  m = this.mMoves[i] ;
			var attackerIdx = this.board[m.f];
			if ((m.c == null) && ((this.pieces[attackerIdx].t == T_princess) || (this.pieces[attackerIdx].t == T_prince))){
				// is there an opponent prince-ss around me? (top, left, right, bottom)
				[[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (dc) {
					var p = geo.Graph(m.t,dc);
					if (p != null){
						// check cell
						if (board[p]>=0){
							// there is a piece
							var piece = $this.pieces[board[p]];
							if ((piece.s != $this.mWho) && ((piece.t == T_prince) || (piece.t == T_princess))){
								// this is an opponent prince-ss
								console.log("I found a prince-ss to add", p);
								// add same move but with capture
								xtraMoves.push({
									c:piece.i,
									f:m.f,
                                    t:p,
                                    //finalt:m.t,
									a:m.a,
									ck:m.ck,
									ept:m.ept
								});
							}
						}
					}
				});
			}
		}
		for (var i = 0 ; i < xtraMoves.length; i++){
			this.mMoves.push(xtraMoves[i]);
        }        

    }


})();
