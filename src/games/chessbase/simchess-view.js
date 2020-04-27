/*
 * authors: jerome choain
 */




(function () {
    var CANVAS_SIZE = 512;
    var FAIRY_CANVAS_PROPERTIES = {
        cx: CANVAS_SIZE,
        cy: CANVAS_SIZE
    }
    function THREE_CONST(v) {
        if (typeof THREE !== "undefined")
            return THREE[v];
        else
            return 0;
    }

    var getResource;

    // Reducing the promo frame which was overflowing the board screen
    // View.Game.cbPromoSize = 1400;
    myPaintTextureImageClip = function (side, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, xoffset) {

        var cx = ctx.canvas.width;
        var cy = ctx.canvas.height;

        if (imgKey.indexOf("overlayImg") == 0) {
            // base position for overlaying piece 2d onto 3d texture : 147x147 at [182,185]
            ctx.drawImage(image, xoffset, side == 1 ? 0 : 100, 100, 100, 147, 147, 182, 185);
            return;
        }

        if (side == 1 || channel != "diffuse") {
            ctx.drawImage(image, clip.x, clip.y, clip.cx, clip.cy, 0, 0, cx, cy);
        } else {
            ctx.globalCompositeOperation = 'normal';
            ctx.drawImage(image, clip.x, clip.y, clip.cx, clip.cy, 0, 0, cx, cy);
            ctx.globalCompositeOperation = 'multiply';
            ctx.drawImage(image, clip.x, clip.y, clip.cx, clip.cy, 0, 0, cx, cy);
            ctx.drawImage(image, clip.x, clip.y, clip.cx, clip.cy, 0, 0, cx, cy);
            ctx.globalCompositeOperation = 'hue';
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
    }

    // extending fairy pieces with some musketeer new pieces
    View.Game.cbFairySimchesskitchessPieceStyle3D = $.extend(true, {}, View.Game.cbFairyPieceStyle3D, {
        "-1": {
            'default': {

                paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                    myPaintTextureImageClip(-1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources);
                },
            },
        },

        "fr-bishop": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 400);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg400: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-king": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 500);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg500: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-knight": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 300);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg300: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-pawn": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 0);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg0: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-queen": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 600);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg600: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-rook": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 200);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg200: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-prince": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 100);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg100: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-princess": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 700);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg700: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-mind": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 800);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg800: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-env": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 900);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg900: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-dna": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 1000);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg1000: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-quarks": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 1100);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg1100: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-moon": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 1200);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg1200: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

        "fr-sun": {

            paintTextureImageClip: function (spec, ctx, material, channel, channelData, imgKey, image, clip, resources) {
                myPaintTextureImageClip(1, spec, ctx, material, channel, channelData, imgKey, image, clip, resources, 1300);
            },

            mesh: {
                jsFile: "/res/pieces/base.js"
            },
            materials: {
                mat0: {
                    channels: {
                        diffuse: {
                            texturesImg: {
                                diffImg: "res/simchess/base-diffuse-map.jpg",
                                overlayImg1300: "/res/simchess/gamesprites.png",
                            }
                        },
                        normal: {
                            texturesImg: {
                                normalImg: "res/simchess/base-normal-map.jpg",
                            }
                        }
                    }
                },
            },
        },

    });

    View.Game.cbDefineView = function () {

        var simchesskitchessBoardDelta = {
            notationMode: "out",
            notationDebug: true,

            paintOutNotation: function(spec,ctx,channel) {
                NBROWS=this.cbVar.geometry.height;
		        NBCOLS=this.cbVar.geometry.width;
                var cSize = this.cbCSize(spec);
                for (var row = 0; row < NBROWS; row++) {
                    var displayedRow = NBROWS - row - 1;
                    if(this.mViewAs<0)
                        displayedRow=row;
                    var x = -(NBCOLS/2 + spec.margins.x/2) * cSize.cx;
                    var y = (row-NBROWS/2+.5) * cSize.cy;
                    ctx.fillText(displayedRow, x, y);	
                }
                for (var col = 0; col < NBCOLS; col++) {
                    var displayedCol=col;
                    if(this.mViewAs<0)
                        displayedCol = NBCOLS - col -1;
                    var x = (col-NBCOLS/2+.5) * cSize.cx;
                    var y = (NBROWS/2 + spec.margins.y/2) * cSize.cy;
                    ctx.fillText(String.fromCharCode(97 + displayedCol), x , y);
                }
            },
        }
        simchesskitchessBoardDelta3d = $.extend(true, {}, simchesskitchessBoardDelta,
            {
            }
        );

        simchesskitchessBoardDelta2d = $.extend(true, {}, simchesskitchessBoardDelta,
            {
            }
        );

        var simchesskitchessBoard3d = $.extend(true, {}, this.cbGridBoardClassic3DMargin, simchesskitchessBoardDelta3d);
        var simchesskitchessBoard2d = $.extend(true, {}, this.cbGridBoardClassic2DMargin, simchesskitchessBoardDelta2d);

        return {
            coords: {
                "2d": this.cbGridBoard.coordsFn.call(this, simchesskitchessBoard2d),
                "3d": this.cbGridBoard.coordsFn.call(this, simchesskitchessBoard3d),
            },
            boardLayout: [
                ".#.#.#.#.#",
                "#.#.#.#.#.",
                ".#.#.#.#.#",
                "#.#.#.#.#.",
                ".#.#.#.#.#",
                "#.#.#.#.#.",
                ".#.#.#.#.#",
                "#.#.#.#.#.",
                ".#.#.#.#.#",
                "#.#.#.#.#.",
                ".#.#.#.#.#",
                "#.#.#.#.#."
            ],
            board: {
                "2d": {
                    draw: this.cbDrawBoardFn(simchesskitchessBoard2d),
                },
                "3d": {
                    display: this.cbDisplayBoardFn(simchesskitchessBoard3d),
                },
            },
            clicker: {
                "2d": {
                    width: 1120,
                    height: 1120,
                },
                "3d": {
                    scale: [0.72, 0.72, 0.72],
                },
            },
            pieces: this.cbFairyPieceStyle({

                "default": {
                    "2d": {
                        width: 1040,
                        height: 1040,
                    },
                    "3d": {
                        scale: [0.48, 0.48, 0.48],
                        display: this.cbDisplayPieceFn(this.cbFairySimchesskitchessPieceStyle3D)
                    },
                },
                "fr-bishop": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 400,
                    },
                },
                "fr-king": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 500,
                    },
                },
                "fr-knight": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 300,
                    },
                },
                "fr-pawn": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 0,
                    },
                },
                "fr-queen": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 600,
                    },
                },
                "fr-rook": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 200,
                    },
                },
                "fr-prince": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 700,
                    },
                },
                "fr-princess": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 100,
                    },
                },
                "fr-mind": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 800,
                    },
                },
                "fr-env": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 900,
                    },
                },
                "fr-dna": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 1000,
                    },
                },
                "fr-quarks": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 1100,
                    },
                },
                "fr-moon": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 1200,
                    },
                },
                "fr-sun": {
                    "2d": {
                        file: this.mViewOptions.fullPath + "/res/simchess/gamesprites.png",
                        clipx: 1300,
                    },
                },
            }),
        };
    }

    /* Make the knight jump when moving */
    View.Board.cbMoveMidZ = function (aGame, aMove, zFrom, zTo) {

        var geo = aGame.cbVar.geometry;
        var dx = Math.abs(geo.C(aMove.t) - geo.C(aMove.f));
        var dy = Math.abs(geo.R(aMove.t) - geo.R(aMove.f));
        if (("_N_M_E_D_A_L_".indexOf("_" + aMove.a + "_") >= 0) && (aGame.g.distGraph[aMove.f][aMove.t] > 1))
            return Math.max(zFrom, zTo) + 2000;
        else if (("__".indexOf("_" + aMove.a + "_") >= 0) && dx != dy && dx != 0 && dy != 0)
            return Math.max(zFrom, zTo) + 2000;
        else
            return (zFrom + zTo) / 2;
    }


})();
