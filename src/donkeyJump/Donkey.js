(function() {

	var Donkey = function(config) {
		this.direction = 0;
		this.curAnimation = 'wait';

		this.lastX = 0;
		this.lastY = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.acceX = 0;
		this.acceY = 0;

		this.collisionX = -14;
		this.collisionY = 29;
		this.collisionWidth = 28;
		this.collisionHeight = 15;

		this.lastTime = 0;

		this.stateUpdate = function(){};
		this.__superJumpHeight = 0;

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
					superman : [13, 24, 'superman', 2],
					wait : [25, 25, false, 1],
					jump : [26, 59, 'jump', 2]
				}
			});
		this.BitmapAnimation_initialize(spriteSheet);
		// createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
		this.x = 250;
		this.y = 630;
		// this.gotoAndPlay('wait');
		this.stateUpdate = this.superman;
	}

	Donkey.prototype.intersects = function (targetBitmapAnimation) {
        if ((targetBitmapAnimation.x + targetBitmapAnimation.collisionX) < (this.x + this.collisionX + this.collisionWidth) && 
        	(this.x + this.collisionX) < (targetBitmapAnimation.x + targetBitmapAnimation.collisionX + targetBitmapAnimation.collisionWidth) && 
        	(targetBitmapAnimation.y + targetBitmapAnimation.collisionY) < (this.y + this.collisionY + this.collisionHeight))
            return (this.y + this.collisionY) < (targetBitmapAnimation.y + targetBitmapAnimation.collisionY + targetBitmapAnimation.collisionHeight);
        else
            return false;
    };

	Donkey.prototype.update = function(force) {
		// if (this.direction == 0 && this.curAnimation != 'wait') {
		// 	this.gotoAndPlay('wait');
		// 	this.curAnimation = 'wait';
		// } else if (this.direction == -1 && this.curAnimation != 'run_h') {
		// 	this.gotoAndPlay('run_h');
		// 	this.curAnimation = 'run_h';
		// } else if (this.direction == 1 && this.curAnimation != 'run') {
		// 	this.gotoAndPlay('run');
		// 	this.curAnimation = 'run';
		// };
		
		var ongoingTime = createjs.Ticker.getTime(true),
			deltaTime = ongoingTime - this.lastTime;

		if (this.x > 400 + 128) {
			this.x = 0;
		} else if (this.x < -128) {
			this.x = 400 + 128;
		} else {
			this.x = this.x + this.direction * 3;
		};
		this.lastX = this.x;
		this.lastY = this.y;
		this.speedX = this.speedX + this.acceX * deltaTime;
		this.speedY = this.speedY + this.acceY * deltaTime;
		this.x = this.x + this.speedX * deltaTime;
		this.y = this.y + this.speedY * deltaTime;

		this.stateUpdate();

		this.lastTime = ongoingTime;
	}

	Donkey.prototype.superman = function() {
		if(this.__superJumpHeight > 200) {
            this.__superJumpHeight = 0;
            this.stateUpdate = this.__jump;
            return false;
        } else {
            this.__superJumpHeight += (this.lastY - this.y);
        }

		if (this.curAnimation != 'superman') {
			this.speedY = -0.1;
			this.acceY = 0;
			this.gotoAndPlay('superman');
			this.curAnimation = 'superman';
		};
	}

	Donkey.prototype.jump = function() {
		if (this.speedY != -1) {
			this.curAnimation = '';
			this.__jump();
		};
	}

	Donkey.prototype.__jump = function() {
		if (this.curAnimation != 'jump') {
			this.speedY = -1;
			this.acceY = 1 / 600;
			this.gotoAndPlay('jump');
			this.curAnimation = 'jump';
		};
	}

	window.Donkey = Donkey;
})();