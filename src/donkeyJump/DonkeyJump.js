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
		this.donkeyImgs = [config.imgRun, config.imgSuperman, config.imgWait, config.imgJump];
		this.cloudImgs = [config.imgCloudMoveable];

		this.donkey = null;
		this.clouds = [];
		//每片云的唯一ID
		this.cloudId = -1;
		//标识是否踩在同一片云上
		this.sameCloudFlag = false;
		//上一次踩到的云ID
		this.lastCloudId = 0;
		//保存当前的视口位置
		this.viewportDistance = 0;

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
			cloud.id = this.cloudId++;
			this.clouds.push(cloud);
			this.stage.addChild(cloud);
		};
	}

	DonkeyJump.prototype.__handleKeyEvent = function() {
		var self = this;

		document.addEventListener('keydown', function(evt) {
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
			//天空处于远方，移动距离较少
			this.bmpSky.y = this.bmpSky.y + moveDistance / 20;
		} 
		if(vpd > 3140) {
			//远山移动距离较小
			this.bmpHill.y = this.bmpHill.y + moveDistance / 15;
		}
		if(vpd > 640) {
			//近山的移动距离偏小
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
		//显示帧率
		this.fpsText.text = 'FPS:' + Math.floor(createjs.Ticker.getMeasuredFPS());

		var hitCloud = null;	//碰撞到云的对象

		for (var i = this.clouds.length; i--; ) {
			var cld = this.clouds[i];
			if (cld.y < 1000) {
				//驴子下落
				if (this.donkey.y > this.donkey.lastY) {
					if (this.donkey.intersects(cld)) {
						this.sameCloudFlag = false;
						hitCloud = cld;
						//判断是否踩在同一片云
						if (cld.id == this.lastCloudId) {
							this.sameCloudFlag = true;
							this.donkey.speedY = -1;
						};
						this.lastCloudId = this.clouds[i].id;
					};
				};
				cld.update();
			} else {
				//超出视口的云在stage中删除
				this.stage.removeChild(cld);
			};
		};

		//驴子下落
		if (this.donkey.y > this.donkey.lastY) {	
			if (hitCloud) {
				this.donkey.jump();
				if (!this.sameCloudFlag) {
					var cloud = new Cloud(this.cloudImgs);
					cloud.x = Math.random() + 480;
					cloud.y = hitCloud.y - 1000;
					cloud.id = this.cloudId++;
					this.clouds.push(cloud);
					this.stage.addChild(cloud);
				}
			};
		//驴子向上跳
		} else {
			if (!this.sameCloudFlag) {
				this.viewportMove();
			};
		}

		//驴子始终显示在最上
		this.stage.addChild(this.donkey);
		
		this.donkey.update();
		
		this.stage.update();
	}

	window.DonkeyJump = DonkeyJump;
})();