let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)

//Create a Pixi Application
let app = new PIXI.Application({width: 1024, height: 768});

var bg;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.loader
    .add("images/dog.png")
    .add("images/land.jpg")
    .add('spritesheet', 'images/mc.json')
    .load(setup)


const sprite = require('sprite');

class Ripple {
  constructor(x, y, stage) {
    this.sprite = new PIXI.Sprite.fromImage("images/ripple.png");
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
    this.sprite.scale.set(4);
    stage.addChild(this.sprite);
    this.filter = new PIXI.filters.DisplacementFilter(this.sprite);
  }

  update() {
    this.sprite.scale.x += 1.5;
    this.sprite.scale.y += 1.5;
  }
}

var player;
function setup() {
    /* Background */
    bg = new PIXI.Container();
    app.stage.addChild(bg);

    land = new PIXI.Sprite(PIXI.loader.resources["images/land.jpg"].texture);
    app.renderer.resize(land.width, land.height);


    /* refraction filter */
    var displace = PIXI.Sprite.fromImage("images/ink.png");
    var filter = new PIXI.filters.DisplacementFilter(displace);
    filter.autoFit = true;
    displace.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    displace.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    displace.scale.y = 1;
    displace.scale.x = 1;
    bg.addChild(displace);

    bg.addChild(land);

	let ripples = [];
	app.ticker.add(() => {
		ripples.forEach(ripple => ripple.update());
	});

	let show_ripple = function (x, y) {
        console.log('shot ripple');
	    ripples.push(new Ripple(x, y, bg));
	    bg.filters = [...ripples.map(f => f.filter)];
	};

    /* Play */
    player = new sprite.Player();

    app.stage.addChild(player.image);

    console.log("PIXI.loader.load()");

    app.ticker.add(function(delta) {
        var mouseX = app.renderer.plugins.interaction.mouse.global.x;
        var mouseY = app.renderer.plugins.interaction.mouse.global.y;

        if (mouseX < 0 || mouseY < 0) {
            mouseX = mouseY = 384;
        }

        var targetX = mouseX - player.image.width / 2;
        var targetY = mouseY - player.image.height / 2;

        player.image.x += (mouseX - player.image.x) * 0.0625;
        player.image.y += (mouseY - player.image.y) * 0.0625;
    });

    var shot = function(_b) {
        _b.set_radius(0);
        app.stage.addChild(_b.image);

        _b.elapsed = 300;

        _b.ticker = new PIXI.ticker.Ticker();
        _b.ticker.autoStart = false;

        _b.ticker.add(function(delta) {
            // move
            _b.image.x += (_b.elapsed / 100 < 1) ? (1) : (_b.elapsed / 100);
            // enlarge
            _b.set_radius((300 - _b.elapsed) / 10)

            _b.elapsed -= delta;
            if (_b.elapsed < 0) {
                _b.ticker.stop()

                // clear bullet first, then explosion
                _b.explosion(function() {
                    app.stage.removeChild(_b.image);
                    delete _b;
                })
                console.log('remove Bullet');
            }

        });

        _b.ticker.start();
    };

    var shot_bullet = function(_color) {
        console.log('shot');

		show_ripple(player.image.x, player.image.y)

        var _b = new sprite.Bullet(player.image.x,
                                   player.image.y,
                                   _color);

        shot(_b);
    }
    var shot_rainbow_bullet = function(ev) {
        console.log('shot rainbow');

        var _b = new sprite.RainbowBullet(player.image.x,
                                          player.image.y);

        shot(_b);
    }


    player.image.interactive = true;

    // For both
    // .on('pointerdown', onDragStart)
    // .on('pointerup', onDragEnd)
    // .on('pointerupoutside', onDragEnd)
    // .on('pointermove', onDragMove);
    
    // For mouse-only events
    // .on('mousedown', onDragStart)
    // .on('mouseup', onDragEnd)
    // .on('mouseupoutside', onDragEnd)
    // .on('mousemove', onDragMove);
    
    // For touch-only events
    // .on('touchstart', onDragStart)
    // .on('touchend', onDragEnd)
    // .on('touchendoutside', onDragEnd)
    // .on('touchmove', onDragMove);
    // player.image.on('pointerdown', function() {})
    // player.image.click = _ => shot_bullet(0x00ff00);

    app.stage.interactive = true;
    // app.stage.click = _ => shot_bullet(0xffffff);
    app.stage.on('pointerdown', _ => shot_bullet())

    // window.onkeyup = function(e) {}
    window.onkeydown = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
    
        if (key == 32) { // space
            shot_bullet()
        }
        if (key == 87) { // W
            shot_rainbow_bullet()
        }
    }
}

function enlarge() {
    // app.renderer.resize(app.view.width * 2, app.view.height * 2);
    player.image.width  *= 2
    player.image.height *= 2

    var b = new sprite.Bullet(200, 200);
    app.stage.addChild(b.image);

    b.explosion(function() {
        app.stage.removeChild(b.image);
        delete b;
    })
}

function shrink() {
    // app.renderer.resize(app.view.width * 2, app.view.height * 2);
    player.image.width  /= 2
    player.image.height /= 2

    var c = new sprite.Clover(200, 200);
    c.set_radius(10);
    app.stage.addChild(c.image);

    window.setTimeout(() => app.stage.removeChild(c.image), 1000)
}
