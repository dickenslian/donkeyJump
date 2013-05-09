
//保存已加载资源的信息
var resources = [];

window.onload = init;

function init() {
    //需要加载的资源列表
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
    }, {
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

    //使用PreloadJS加载资源
    var preload = new createjs.LoadQueue(false);
    //加载SoundJS组件
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("fileload", handleFileLoad);
    preload.addEventListener("complete", startGame);
    preload.loadManifest(manifest);
}

function handleFileLoad(event) {
    //每成功加载一个资源，就放到resources数组中
    resources.push(event);
}

function startGame() {
    //播放游戏背景音乐
    createjs.Sound.play("backgroundMusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);

    var stage = new createjs.Stage("gameCanvas");
    var gameConfig = {};
    gameConfig.stage = stage;

    for (var i = 0; i < resources.length; i++) {
        var item = resources[i]; 
        var id = item.item.id;
        var result = item.result;

        if (id != 'backgroundMusic') {
            //所有图片的列表
            gameConfig[id] = result;
        };
    }

    var donkeyJump = new DonkeyJump(gameConfig);
    donkeyJump.init();
    donkeyJump.startGame();
}