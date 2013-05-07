(function() {

    var KEYCODE_LEFT = 37;
    var KEYCODE_RIGHT = 39;
    var KEYCODE_A = 65;
    var KEYCODE_D = 68;

	var DonkeyJump = function(config) {
		this.imgSky = config.imgSky;
		this.imgHill = config.imgHill;
		this.imgHillNear = config.imgHillnear;
		this.imgHouse = config.imgHouse;

		// this.donkeyImgs = [config.imgBalloon, config.imgDead, config.imgJump, 
		// 	config.imgMj, config.imgPlane, config.imgRun, config.imgSuperman, config.Ufo, config.wait];
		this.donkeyImgs = [config.imgRun, config.imgSuperman, config.imgWait, config.imgJump];
		this.cloudImgs = [config.imgCloudMoveable];

		this.donkey = null;
		this.clouds = [];

		this.viewportDistance = 0;

		this.refresh = false;
		this.stage = config.stage;
	}

	DonkeyJump.prototype.init = function() {
		this.__createScene();
		this.__createClouds();
		this.__createDonkey();
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
		var cloud1 = new Cloud(this.cloudImgs);
		cloud1.x = 200;
		cloud1.y = 250;
		var cloud2 = new Cloud(this.cloudImgs);
		cloud2.x = 250;
		cloud2.y = 350;
		var cloud3 = new Cloud(this.cloudImgs);
		cloud3.x = 300;
		cloud3.y = 450;
		var cloud4 = new Cloud(this.cloudImgs);
		cloud4.x = 350;
		cloud4.y = 550;
		var cloud5 = new Cloud(this.cloudImgs);
		cloud5.x = 400;
		cloud5.y = 650;
		this.clouds.push(cloud, cloud1, cloud2, cloud3, cloud4, cloud5);
		this.stage.addChild(cloud, cloud1, cloud2, cloud3, cloud4, cloud5);
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

	DonkeyJump.prototype.viewportMove = function() {
		var moveDistance = 5;
		this.viewportDistance = this.viewportDistance + moveDistance;
		var vpd = this.viewportDistance;

		if (vpd > 9100) {
			this.bmpSky.y = this.bmpSky.y + moveDistance / 20;
		} 
		if(vpd > 3140) {
			this.bmpHill.y = this.bmpHill.y + moveDistance / 15;
		}
		if(vpd > 640) {
			this.bmpHillNear.y = this.bmpHillNear.y + moveDistance / 5;
		};
		this.bmpHouse.y = this.bmpHouse.y + moveDistance;
	}

	DonkeyJump.prototype.tick = function() {
		this.fpsText.text = 'FPS:' + Math.floor(createjs.Ticker.getMeasuredFPS());

		var hitFlag = false;
		// if (this.refresh) {
		// 	this.donkey.update();
		// };

		this.viewportMove();

		for (var i = this.clouds.length; i--; ) {
			if (this.donkey.intersects(this.clouds[i])) {
				hitFlag = true;
			};
			// this.clouds[i].update();
		};

		if (hitFlag) {
			this.donkey.update(1);
		} else {
			this.donkey.update();
		};

		this.stage.update();
	}

	window.DonkeyJump = DonkeyJump;
})();