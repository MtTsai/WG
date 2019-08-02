let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)

//Create a Pixi Application
let app = new PIXI.Application({width: 1024, height: 768});

var bg = new PIXI.Graphics();
bg.beginFill(0x000000);
bg.drawRect(0, 0, 1024, 768);
bg.endFill();
app.stage.addChild(bg);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.loader
    .add("images/dog.png")
    .add('spritesheet', 'images/mc.json')
    .load(setup)


const sprite = require('sprite');

var player;
function setup() {
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

        player.image.x += (targetX - player.image.x) * 0.0625;
        player.image.y += (targetY - player.image.y) * 0.0625;
    });

    var shot = function(_b) {
        _b.set_radius(0);
        app.stage.addChild(_b.image);

        _b.elapsed = 300;

        _b.ticker = new PIXI.ticker.Ticker();
        _b.ticker.autoStart = false;

        _b.ticker.add(function(delta) {
            // move
            _b.image.x += 1;
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

        var _b = new sprite.Bullet(player.image.x + player.image.width / 2,
                                   player.image.y + player.image.height / 2,
                                   _color);

        shot(_b);
    }
    var shot_rainbow_bullet = function() {
        console.log('shot rainbow');

        var _b = new sprite.RainbowBullet(player.image.x + player.image.width / 2,
                                          player.image.y + player.image.height / 2);

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
    app.stage.on('pointerdown', _ => shot_rainbow_bullet())

    // window.onkeyup = function(e) {}
    window.onkeydown = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
    
        if (key == 32) { // space
            shot_rainbow_bullet()
        }
        if (key == 87) { // W
            shot_bullet()
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

    var c = new sprite.RainbowBullet(200, 200);
    c.set_radius(300);
    app.stage.addChild(c.image);

    window.setTimeout(() => app.stage.removeChild(c.image), 1000)
}

function shrink() {
    // app.renderer.resize(app.view.width * 2, app.view.height * 2);
    player.image.width  /= 2
    player.image.height /= 2

    var c = new sprite.Clover(200, 200);
    c.set_radius(50);
    app.stage.addChild(c.image);

    window.setTimeout(() => app.stage.removeChild(c.image), 1000)
}
