(function() {

	var Cloud = function(config) {
		this.type = 'moveable';
		this.direction = 1;

		this.collisionX = -128;
		this.collisionY = -64;
		this.collisionWidth = 160;
		this.collisionHeight = 15;

		this.initialize(config);
	}

	Cloud.prototype = new createjs.BitmapAnimation();

	Cloud.prototype.BitmapAnimation_initialize = Cloud.prototype.initialize;

	Cloud.prototype.initialize = function(config) {
		var spriteSheet = new createjs.SpriteSheet({
				images : config,
				frames : {width:256, height:128, regX: 128, regY:64},
				animations : {
					move : [0, 1, 'move', 100]
				}
			});
		this.BitmapAnimation_initialize(spriteSheet);
		this.x = 128;
		this.y = 150;
		this.gotoAndPlay('move');
	}

	Cloud.prototype.update = function() {
		if (this.type == 'moveable') {
			this.x = this.x + this.direction;
			if (this.x > 400) {
				this.direction = -1;
			} else if(this.x < 128) {
				this.direction = 1;
			};
		};
	}

	window.Cloud = Cloud;
})();