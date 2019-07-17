let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)

//Create a Pixi Application
let app = new PIXI.Application({width: 1024, height: 768});

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

    player.image.interactive = true;
    player.image.on('mousedown', function() {
        console.log('shot');

        var _b = new sprite.Bullet(player.image.x + player.image.width / 2,
                                   player.image.y + player.image.height / 2,
                                   0x0000ff);

        app.stage.addChild(_b.image);

        _b.elapsed = 300;

        _b.ticker = new PIXI.ticker.Ticker();
        _b.ticker.autoStart = false;

        _b.ticker.add(function(delta) {
            _b.image.x += 1;
            _b.elapsed -= delta;

            if (_b.elapsed < 0) {
                app.stage.removeChild(_b.image);
                _b.ticker.stop()
                delete _b
                console.log('remove Bullet');
            }

        });

        _b.ticker.start();
    });
}

var b;
function enlarge() {
    // app.renderer.resize(app.view.width * 2, app.view.height * 2);
    player.image.width  *= 2
    player.image.height *= 2

    b = new sprite.Bullet(200, 200);
    app.stage.addChild(b.image);

    b.explosion();
}

function shrink() {
    // app.renderer.resize(app.view.width * 2, app.view.height * 2);
    player.image.width  /= 2
    player.image.height /= 2

    b.set_radius(50);

    b.explosion();
}
