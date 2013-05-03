(function(){
	var Donkey = function(config) {
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
		this.x = 100;
		this.y = 100;
		this.gotoAndPlay('wait');
	}

	window.Donkey = Donkey;
})();