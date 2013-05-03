(function() {
	var DonkeyJump = function(config) {
		this.imgSky = config.imgSky;
		this.imgHill = config.imgHill;
		this.imgHillNear = config.imgHillNear;
		this.imgHouse = config.imgHouse;
		this.stage = config.stage;
	}

	DonkeyJump.prototype.init = function() {
		this.__createScene();
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
		this.stage.addChild(this.bmpSky, this.bmpHill, this.bmpHillNear, this.bmpHouse);
	}

	window.DonkeyJump = DonkeyJump;
})();