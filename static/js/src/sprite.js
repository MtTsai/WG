/* bullet */
function Bullet(_x, _y, _color = 0x00ff00) {
    this.color = _color;

    this.image = new PIXI.Graphics();
    this.image.x = _x;
    this.image.y = _y;

    this.image.clear();
    this.image.beginFill(this.color);
    this.image.drawCircle(0, 0, 1);
    this.image.endFill();

    this.set_radius(3);
}

Bullet.prototype.set_radius = function(radius) {
    this.image.height = radius * 2
    this.image.width = radius * 2
}

Bullet.prototype.explosion = function(callback = () => {}) {
    var exp = new Explosion();
    var b = this.image;
    
    b.addChild(exp.image);

    exp.image.onComplete = function() {
        b.removeChild(exp.image)
        callback()
    };
    exp.image.play();
}

function RainbowBullet(_x, _y) {
    this.image = new PIXI.Graphics();
    this.image.x = _x;
    this.image.y = _y;

    var totalCount = 360;
    var radius = 1;
    for(var i = 0;i< totalCount; i++){
    	var colorArray = hsvToRGB2( i * 360 / totalCount, 1, 1);
    	var color = colorArray[0] * 65536 + colorArray[1] * 256 + colorArray[2];
    
    	var arcGraphic = new PIXI.Graphics();
        
    		// draw the sector
    		arcGraphic.beginFill(color, 1);
    		arcGraphic.arc( 0, 0, radius, (0) * (Math.PI / 180), (1) * (Math.PI / 180) );
    		arcGraphic.endFill();
    
    		// draw the triangle
    		arcGraphic.beginFill(color, 1);
    		arcGraphic.moveTo(0, 0);
    		arcGraphic.lineTo(0, radius);
    		arcGraphic.lineTo(Math.sin((Math.PI / 180) * (radius / Math.PI)),
                              Math.cos((Math.PI / 180) * radius));
    		arcGraphic.lineTo(0, 0);
    		arcGraphic.endFill();
    
    		arcGraphic.rotation = i * (Math.PI / 180);
    		this.image.addChild(arcGraphic);
    }

    this.base = this.image.height / 2

    this.set_radius(3);
}

RainbowBullet.prototype.set_radius = function(radius) {
    this.image.height = radius * this.base
    this.image.width = radius * this.base
}

RainbowBullet.prototype.explosion = function(callback = () => {}) {
    var exp = new Explosion();
    var b = this.image;

    b.addChild(exp.image);

    exp.image.onComplete = function() {
        b.removeChild(exp.image)
        callback()
    };
    exp.image.play();
}

function Clover(_x, _y, _color = 0xff00ff) {
    this.image = new PIXI.Graphics();

    this.image.beginFill(0xffffff);
    this.image
        .bezierCurveTo(0, 0, 100, 100, 100, 0).drawCircle(0, 0, 0)
        .bezierCurveTo(0, 0, 100, -100, 100, 0).drawCircle(0, 0, 0)
        .bezierCurveTo(0, 0, 100, -100, 0, -100).drawCircle(0, 0, 0)
        .bezierCurveTo(0, 0, -100, -100, 0, -100).drawCircle(0, 0, 0)
        .bezierCurveTo(0, 0, -100, -100, -100, 0).drawCircle(0, 0, 0)
        .bezierCurveTo(0, 0, -100, 100, -100, 0).drawCircle(0, 0, 0)
        .bezierCurveTo(0, 0, -100, 100, 0, 100).drawCircle(0, 0, 0)
        .bezierCurveTo(0, 0, 100, 100, 0, 100).drawCircle(0, 0, 0)
    this.image.endFill();
    this.image.tint = _color

    this.image.x = _x
    this.image.y = _y

    this.set_radius(3)
}

Clover.prototype.set_radius = function(radius) {
    this.image.height = radius * 2
    this.image.width = radius * 2
}

/* player */
function Player(_color = 0xff0000) {
    // var dog = new PIXI.Sprite(PIXI.loader.resources["images/dog.png"].texture);
    // var rect = new_rect(_color, 0, 0, dog.width, dog.height);
    // rect.mask = dog
    // this.image = new PIXI.Container()
    // this.image.addChild(rect)
    // this.image.addChild(dog)

    this.image = new PIXI.Sprite(PIXI.loader.resources["images/dog.png"].texture);
    this.image.tint = 0xff00ff;
}

/* explosion */
function Explosion() {
    var explosionTextures = [],
        i;

    for (i = 0; i < 26; i++) {
         var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i+1) + '.png');
         explosionTextures.push(texture);
    }

    this.image = new PIXI.extras.AnimatedSprite(explosionTextures);

    this.image.loop = false;

    this.set_radius(4)
}

Explosion.prototype.set_radius = function(radius) {
    this.image.height = radius * 2
    this.image.width = radius * 2
    this.image.x = - this.image.width / 2
    this.image.y = - this.image.height / 2
}

/* utils */
function new_rect(color, x, y, w, h) {
    var rect = new PIXI.Graphics();
    rect.beginFill(color);
    rect.drawRect(x, y, w, h);
    rect.endFill();
    return rect;
}

function hsvToRGB2(hue, saturation, value) {
	var hi;
	var f;
	var p;
	var q;
	var t;

	while (hue < 0) {
	hue += 360;
	}
	hue = hue % 360;

	saturation = saturation < 0 ? 0
	: saturation > 1 ? 1
	: saturation;

	value = value < 0 ? 0
	: value > 1 ? 1
	: value;

	value *= 255;
	hi = (hue / 60 | 0) % 6;
	f = hue / 60 - hi;
	p = value * (1 -           saturation) | 0;
	q = value * (1 -      f  * saturation) | 0;
	t = value * (1 - (1 - f) * saturation) | 0;
	value |= 0;

	switch (hi) {
	case 0:
	  return [value, t, p];
	case 1:
	  return [q, value, p];
	case 2:
	  return [p, value, t];
	case 3:
	  return [p, q, value];
	case 4:
	  return [t, p, value];
	case 5:
	  return [value, p, q];
	}
}

module.exports = {
    Bullet: Bullet,
    RainbowBullet: RainbowBullet,
    Clover: Clover,
    Player: Player,

    Explosion: Explosion,
}
