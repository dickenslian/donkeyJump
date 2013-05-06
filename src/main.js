var resources = [];

window.onload = init;

function init() {
    var manifest = [{
        src: "images/background/sky.jpg",
        id: "imgSky"
    }, {
        src: "images/background/hill.png",
        id: "imgHill"
    }, {
        src: "images/background/hillnear.png",
        id: "imgHillnear"
    }, {
        src: "images/background/house.png",
        id: "imgHouse"
    }, 
    /*
    {
        src: "images/frames/donkey/balloon.png",
        id: "imgBalloon"
    }, {
        src: "images/frames/donkey/dead.png",
        id: "imgDead"
    }, {
        src: "images/frames/donkey/jump.png",
        id: "imgJump"
    }, {
        src: "images/frames/donkey/mj.png",
        id: "imgMj"
    }, {
        src: "images/frames/donkey/plane.png",
        id: "imgPlane"
    }, {
        src: "images/frames/donkey/run.png",
        id: "imgRun"
    }, {
        src: "images/frames/donkey/superman.png",
        id: "imgSuperman"
    }, {
        src: "images/frames/donkey/ufo.png",
        id: "imgUfo"
    }, {
        src: "images/frames/donkey/wait.png",
        id: "imgWait"
    }, 
    */
    {
        src: "images/frames/donkey/run.png",
        id: "imgRun"
    }, {
        src: "images/frames/donkey/superman.png",
        id: "imgSuperman"
    }, {
        src: "images/frames/donkey/wait.png",
        id: "imgWait"
    }, {
        src: "images/frames/donkey/jump.png",
        id: "imgJump"
    }, {
        src: "images/frames/cloud/cloud_moveable.png",
        id: "imgCloudMoveable"
    }, {
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
    // createjs.Sound.play("backgroundMusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);
    var stage = new createjs.Stage("gameCanvas");
    var gameConfig = {};
    gameConfig.stage = stage;

    for (var i = 0; i < resources.length; i++) {
        var item = resources[i]; //loader.getResult(id);
        var id = item.item.id;
        var result = item.result;

        if (id != 'backgroundMusic') {
            gameConfig[id] = result;
        };
    }

    var donkeyJump = new DonkeyJump(gameConfig);
    donkeyJump.init();
    donkeyJump.startGame();
}