var imgs = [];

window.onload = init;

function init() {
    var manifest = [{
        src: "images/background/sky.jpg",
        id: "sky"
    }, {
        src: "images/background/hill.png",
        id: "hill"
    }, {
        src: "images/background/hillnear.png",
        id: "hillnear"
    }, {
        src: "images/background/house.png",
        id: "house"
    },  {
        src: "audio/ogg_background.mp3|audio/ogg_background.wav",
        id: "backgroundMusic"
    }];

    var preload = new createjs.LoadQueue(false);

    preload.installPlugin(createjs.Sound);
    preload.addEventListener("fileload", handleFileLoad);
    preload.addEventListener("complete", startGame);
    preload.loadManifest(manifest);
}

function handleFileLoad(event) {
    imgs.push(event);
}

function startGame() {
    // start the music
    createjs.Sound.play("backgroundMusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);
    var stage = new createjs.Stage("gameCanvas");
    for (var i = 0; i < imgs.length; i++) {
        var item = imgs[i]; //loader.getResult(id);
        var id = item.item.id;
        var result = item.result;

        switch (id) {
            case "sky":
                var bmpSky = new createjs.Bitmap(result);
                break;
            case "hill":
                var bmpHill = new createjs.Bitmap(result);
                break;
            case "hillnear":
                var bmpNearHill = new createjs.Bitmap(result);
                break;
            case "house":
                var bmpHouse = new createjs.Bitmap(result);
                break;
        }

    }

    bmpSky.y = -2272;
    bmpHill.y = 197;
    bmpNearHill.y = 187;
    bmpHouse.y = 216;
    stage.addChild(bmpSky, bmpHill, bmpNearHill, bmpHouse);
    stage.update();
}