;require._modules["/sprite.js"] = (function() { var __filename = "/sprite.js"; var __dirname = "/"; var module = { loaded: false, exports: { }, filename: __filename, dirname: __dirname, require: null, call: function() { module.loaded = true; module.call = function() { }; __module__(); }, parent: null, children: [ ] }; var process = { title: "browser", nextTick: function(func) { setTimeout(func, 0); } }; var require = module.require = window.require._bind(module); var exports = module.exports; 
 /* ==  Begin source for module /sprite.js  == */ var __module__ = function() { 
 /* bullet */
function Bullet(_x, _y, _color = 0x00ff00) {
    this.color = _color;

    this.image = new PIXI.Container();
    this.image.x = _x;
    this.image.y = _y;

    // this.bullet = new PIXI.Graphics();
    // this.bullet.beginFill(this.color);
    // this.bullet.drawCircle(0, 0, 1);
    // this.bullet.endFill();
    this.bullet = new PIXI.Sprite(PIXI.loader.resources["images/dog.png"].texture);
    this.bullet.tint = Math.floor(Math.random() * 0x1000000)
    this.image.addChild(this.bullet);

    this.set_radius(3);
}

Bullet.prototype.set_radius = function(radius) {
    this.bullet.height = radius * 2
    this.bullet.width = radius * 2

    this.bullet.radius = radius
}

Bullet.prototype.explosion = function(callback = () => {}) {
    var exp = new Explosion(this.bullet.radius * 4);
    var con10 = this.image;

    // clear bullet first, then explode
    con10.removeChild(this.bullet);
    delete this.bullet

    con10.addChild(exp.image);
    exp.image.onComplete = function() {
        con10.removeChild(exp.image)
        callback()
    };
    exp.image.play();
}

/* rainbow bullet */
function RainbowBullet(_x, _y) {
    this.image = new PIXI.Container();
    this.image.x = _x;
    this.image.y = _y;

    this.bullet = drawRainbowCircle();
    this.image.addChild(this.bullet);

    this.set_radius(3);
}

RainbowBullet.prototype.set_radius = function(radius) {
    this.bullet.height = radius * 2
    this.bullet.width = radius * 2

    this.bullet.radius = radius
}

RainbowBullet.prototype.explosion = function(callback = () => {}) {
    var exp = new Explosion(this.bullet.radius * 4);
    var con10 = this.image;

    // clear bullet first, then explode
    con10.removeChild(this.bullet);
    delete this.bullet

    con10.addChild(exp.image);
    exp.image.onComplete = function() {
        con10.removeChild(exp.image)
        callback()
    };
    exp.image.play();
}

/* 4-leaf clover */
function Clover(_x, _y, _color = 0xff00ff) {
    this.image = new PIXI.Container();
    this.image.x = _x;
    this.image.y = _y;


    this.clover = drawClover();
    this.clover.tint = _color;
    this.image.addChild(this.clover);

    this.set_radius(3)
}

Clover.prototype.set_radius = function(radius) {
    this.clover.height = radius * 2
    this.clover.width = radius * 2
}

/* player */
function Player(_color = 0xff0000, reverse = false) {
    // var dog = new PIXI.Sprite(PIXI.loader.resources["images/dog.png"].texture);
    // var rect = new_rect(_color, 0, 0, dog.width, dog.height);
    // rect.mask = dog
    // this.image = new PIXI.Container()
    // this.image.addChild(rect)
    // this.image.addChild(dog)

    this.image = new PIXI.Sprite(PIXI.loader.resources["images/dog.png"].texture);
    this.image.tint = _color;
    this.image.anchor.set(0.5);

    this.image.scale.x *= (reverse) ? -1 : 1;
}

/* explosion */
function Explosion(radius = 10) {
    var explosionTextures = [],
        i;

    for (i = 0; i < 26; i++) {
         var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i+1) + '.png');
         explosionTextures.push(texture);
    }

    this.image = new PIXI.extras.AnimatedSprite(explosionTextures);

    this.image.loop = false;

    this.set_radius(radius)
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

function drawRainbowCircle() {
    var image = new PIXI.Graphics();

    var totalCount = 360;
    var radius = 65536; // make high resolution
    for (var i = 0;i <= totalCount; i++) {
        var colorArray = hsvToRGB2( i * 360 / totalCount, 1, 1);
        var color = colorArray[0] * 65536 + colorArray[1] * 256 + colorArray[2];
    
        // draw the sector
        image.beginFill(color, 1);
        image.arc( 0, 0, radius, (i) * (Math.PI / 180), (i + 1) * (Math.PI / 180) );
        image.endFill();

        // draw the triangle
        image.beginFill(color, 1);
        image.moveTo(0, 0);
        image.lineTo(Math.sin(i * (Math.PI / 180) * radius),
                     Math.cos(i * (Math.PI / 180) * radius));
        image.lineTo(Math.sin((i + 1) * (Math.PI / 180) * radius),
                     Math.cos((i + 1) * (Math.PI / 180) * radius));
        image.lineTo(0, 0);
        image.endFill();
    }

    return image
}

function drawClover() {
    var image = new PIXI.Graphics();

    image.beginFill(0xffffff);
    image.bezierCurveTo(0, 0, 100, 100, 100, 0).drawCircle(0, 0, 0)
         .bezierCurveTo(0, 0, 100, -100, 100, 0).drawCircle(0, 0, 0)
         .bezierCurveTo(0, 0, 100, -100, 0, -100).drawCircle(0, 0, 0)
         .bezierCurveTo(0, 0, -100, -100, 0, -100).drawCircle(0, 0, 0)
         .bezierCurveTo(0, 0, -100, -100, -100, 0).drawCircle(0, 0, 0)
         .bezierCurveTo(0, 0, -100, 100, -100, 0).drawCircle(0, 0, 0)
         .bezierCurveTo(0, 0, -100, 100, 0, 100).drawCircle(0, 0, 0)
         .bezierCurveTo(0, 0, 100, 100, 0, 100).drawCircle(0, 0, 0)
    image.endFill();

    return image
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
 
 }; /* ==  End source for module /sprite.js  == */ return module; }());;