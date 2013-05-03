var resources = [];

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
    resources.push(event);
}

function startGame() {
    // start the music
    createjs.Sound.play("backgroundMusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);
    var gameConfig = {};
    var stage = new createjs.Stage("gameCanvas");
    gameConfig.stage = stage;

    for (var i = 0; i < resources.length; i++) {
        var item = resources[i]; //loader.getResult(id);
        var id = item.item.id;
        var result = item.result;

        switch (id) {
            case "sky":
                gameConfig.imgSky = result;
                break;
            case "hill":
                gameConfig.imgHill = result;
                break;
            case "hillnear":
                gameConfig.imgHillNear = result;
                break;
            case "house":
                gameConfig.imgHouse = result;
                break;
        }
    }

    var donkeyJump = new DonkeyJump(gameConfig);
    donkeyJump.init();
}