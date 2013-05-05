(function(){
	var Donkey = function(config) {
		this.direction = 0;
		this.curAnimation = 'wait';

		this.initialize(config);
	}

	Donkey.prototype = new createjs.BitmapAnimation();

	Donkey.prototype.BitmapAnimation_initialize = Donkey.prototype.initialize;

	Donkey.prototype.initialize = function (config) {
		var spriteSheet = new createjs.SpriteSheet({
				images : config,
				frames : {width:128, height:128, regX: 64, regY:64},
				animations : {
					run : [0, 12, 'run', 1],
					superman : [13, 24, 'superman', 1],
					wait : [25, 25, false, 1]
				}
			});
		this.BitmapAnimation_initialize(spriteSheet);
		// createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
		this.x = 250;
		this.y = 630;
		this.gotoAndPlay('wait');
	}

	Donkey.prototype.update = function() {
		if (this.direction == 0 && this.curAnimation != 'wait') {
			this.gotoAndPlay('wait');
			this.curAnimation = 'wait';
		} else if (this.direction == -1 && this.curAnimation != 'run_h') {
			this.gotoAndPlay('run_h');
			this.curAnimation = 'run_h';
		} else if (this.direction == 1 && this.curAnimation != 'run') {
			this.gotoAndPlay('run');
			this.curAnimation = 'run';
		};
		if (this.x > 528) {
			this.x = 0;
		} else if (this.x < -128) {
			this.x = 528;
		} else {
			this.x = this.x + this.direction;
		};
		
	}

	window.Donkey = Donkey;
})();