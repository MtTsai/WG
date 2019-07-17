/* bullet */
function Bullet(_x, _y, _color = 0x00ff00) {
    this.color = _color;

    this.image = new PIXI.Graphics();
    this.image.x = _x;
    this.image.y = _y;

    this.set_radius(3);
}

Bullet.prototype.set_radius = function(radius) {
    this.image.clear();
    this.image.beginFill(this.color);
    this.image.drawCircle(0, 0, radius);
    this.image.endFill();
}

Bullet.prototype.explosion = function() {
    var exp = new Explosion();
    var b = this.image;
    
    b.addChild(exp.image);

    exp.image.onComplete = function() {
        b.removeChild(exp.image)
    };
    exp.image.play();
}


/* player */
function Player(_color = 0xff0000) {
    var dog = new PIXI.Sprite(PIXI.loader.resources["images/dog.png"].texture);
    var rect = new_rect(_color, 0, 0, dog.width, dog.height);

    rect.mask = dog

    this.image = new PIXI.Container()
    this.image.addChild(rect)
    this.image.addChild(dog)
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

    this.image.x = - this.image.width / 2
    this.image.y = - this.image.height / 2
    this.image.loop = false;
}

/* utils */
function new_rect(color, x, y, w, h) {
    var rect = new PIXI.Graphics();
    rect.beginFill(color);
    rect.drawRect(x, y, w, h);
    rect.endFill();
    return rect;
}

module.exports = {
    Bullet: Bullet,
    Player: Player,

    Explosion: Explosion,
}
