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
		this.cloudName = -1;
		this.sameCloudFlag = false;
		this.lastCloudName = 0;

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
		for (var i = 0; i < 4; i++) {
			var cloud = new Cloud(this.cloudImgs);
			cloud.x = 128 + 353 * Math.random();
			cloud.y = -200 - i * 250;
			cloud.name = this.cloudName++;
			this.clouds.push(cloud);
			this.stage.addChild(cloud);
		};
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
		if (vpd > 400) {
			for (var i = this.clouds.length; i--; ) {
				this.clouds[i].y += 9;
			};
		};
		this.bmpHouse.y = this.bmpHouse.y + moveDistance;
	}

	DonkeyJump.prototype.tick = function() {
		this.fpsText.text = 'FPS:' + Math.floor(createjs.Ticker.getMeasuredFPS());

		var hitFlag = false
		    hitCloud = null;

		for (var i = this.clouds.length; i--; ) {
			var cld = this.clouds[i];
			if (cld.y < 1000) {
				if (this.donkey.y > this.donkey.lastY) {
					if (this.donkey.intersects(cld)) {
						this.sameCloudFlag = false;
						hitFlag = true;
						hitCloud = cld;
						if (cld.name == this.lastCloudName) {
							this.sameCloudFlag = true;
							this.donkey.speedY = -1;
						};
						this.lastCloudName = this.clouds[i].name;
					};
				};
				cld.update();
			} else {
				this.stage.removeChild(cld);
			};
		};

		if (this.donkey.y > this.donkey.lastY) {	
			//向下落
			if (hitFlag) {
				this.donkey.jump();
				if (!this.sameCloudFlag) {
					var cloud = new Cloud(this.cloudImgs);
					cloud.x = Math.random() + 480;
					cloud.y = hitCloud.y - 1000;
					cloud.name = this.cloudName++;
					this.clouds.push(cloud);
					this.stage.addChild(cloud);
				}
			};
		} else {
			//向上跳
			if (!this.sameCloudFlag) {
				this.viewportMove();
			};
		}

		this.stage.addChild(this.donkey);
		
		this.donkey.update();
		
		this.stage.update();
	}

	window.DonkeyJump = DonkeyJump;
})();