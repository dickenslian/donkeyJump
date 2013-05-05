(function() {

    var KEYCODE_LEFT = 37;
    var KEYCODE_RIGHT = 39;
    var KEYCODE_A = 65;
    var KEYCODE_D = 68;

	var DonkeyJump = function(config) {
		this.imgSky = config.imgSky;
		this.imgHill = config.imgHill;
		this.imgHillNear = config.imgHillNear;
		this.imgHouse = config.imgHouse;

		// this.donkeyImgs = [config.imgBalloon, config.imgDead, config.imgJump, 
		// 	config.imgMj, config.imgPlane, config.imgRun, config.imgSuperman, config.Ufo, config.wait];
		this.donkeyImgs = [config.imgRun, config.imgSuperman, config.imgWait];
		this.cloudImgs = [config.imgCloudMoveable];

		this.donkey = null;
		this.clouds = [];

		this.refresh = false;
		this.stage = config.stage;
	}

	DonkeyJump.prototype.init = function() {
		this.__createScene();
		this.__createDonkey();
		this.__createClouds();
		this.__handleKeyEvent();
		this.stage.update();
	}

	DonkeyJump.prototype.__createScene = function() {
		this.bmpSky = new createjs.Bitmap(this.imgSky);
		this.bmpHill = new createjs.Bitmap(this.imgHill);
		this.bmpHillNear = new createjs.Bitmap(this.imgHillNear);
		this.bmpHouse = new createjs.Bitmap(this.imgHouse);

		this.bmpSky.y = -2272;
		this.bmpHill.y = 197;
		this.bmpHillNear.y = 187;
		this.bmpHouse.y = 216;


		this.fpsText = new createjs.Text("FPS:", "20px Arial", "#000");

		this.stage.addChild(this.bmpSky, this.bmpHill, this.bmpHillNear, this.bmpHouse, this.fpsText);
	}

	DonkeyJump.prototype.__createDonkey = function() {
		this.donkey = new Donkey(this.donkeyImgs);
		this.stage.addChild(this.donkey);
	}

	DonkeyJump.prototype.__createClouds = function() {
		var cloud = new Cloud(this.cloudImgs);
		this.clouds.push(cloud);
		this.stage.addChild(cloud);
	}

	DonkeyJump.prototype.__handleKeyEvent = function() {
		var self = this;

		document.addEventListener('keydown', function(evt) {
			self.refresh = true;
			switch (evt.keyCode) {
				case KEYCODE_A:
				case KEYCODE_LEFT:
					self.donkey.direction = -1;
					break;
				case KEYCODE_D:
				case KEYCODE_RIGHT:
					self.donkey.direction = 1;
					break;
			};
		});

		document.addEventListener('keyup', function(evt) {
			self.refresh = false;
			switch (evt.keyCode) {
				case KEYCODE_A:
				case KEYCODE_LEFT:
				case KEYCODE_D:
				case KEYCODE_RIGHT:
					self.donkey.direction = 0;
					self.donkey.update();
					self.stage.update();
					break;
			};
		});
	}

	DonkeyJump.prototype.startGame = function() {
		createjs.Ticker.addListener(this);
	    createjs.Ticker.useRAF = true;
	    createjs.Ticker.setFPS(60);
	}

	DonkeyJump.prototype.tick = function() {
		this.fpsText.text = 'FPS:' + Math.floor(createjs.Ticker.getMeasuredFPS());
		if (this.refresh) {
			this.donkey.update();
		};

		for (var i = this.clouds.length; i--; ) {
			this.clouds[i].update();
		};
		this.stage.update();
	}

	window.DonkeyJump = DonkeyJump;
})();