Meepo = function(number) {
    this.x = 400 + randomOffset();
    this.y = 300 + randomOffset();
    this.stopChanneling();
    this.channelSound = new Audio("sounds/poof_channel.wav");
    this.poofAppearSound = new Audio("sounds/poof_appear.wav");
    this.channelSound.volume = 0.5;
    this.poofAppearSound.volume = 0.5;
    this.number = number;
}

Meepo.standardImage = new Image();
Meepo.standardImage.src = "images/standard.png";
Meepo.channelingImage = new Image();
Meepo.channelingImage.src = "images/channeling.png";

Meepo.prototype.poof = function(x, y) {
    if (!this.channeling) {
        this.channelSound.play();
        this.poofTargetX = x - 45;
        this.poofTargetY = y - 45;
        this.channelTime = 0;
        this.channeling = true;
    }
}

Meepo.prototype.update = function(deltaTime) {
    if (this.channeling) {
        this.channelTime += deltaTime;
    }
    if (this.channelTime >= 1500) {
        this.teleport();
    }
}

Meepo.prototype.draw = function() {
    var img = this.channeling ? Meepo.channelingImage : Meepo.standardImage;
    meepoContext.drawImage(img, this.x, this.y, 90, 90);
}

Meepo.prototype.teleport = function() {
    var targetMeepo = findClosestMeepoTo(this.poofTargetX, this.poofTargetY);
    this.x = targetMeepo.x + randomOffset();
    this.y = targetMeepo.y + randomOffset();
    this.stopChanneling();
    this.poofAppearSound.play();
}

Meepo.prototype.dagger = function(x, y) {
    this.x = x - 45;
    this.y = y - 45;
}

Meepo.prototype.stopChanneling = function() {
    this.poofTargetX = 0;
    this.poofTargetY = 0;
    this.channeling = false;
    this.channelTime = 0;
}

Meepo.prototype.getDistanceTo = function(x, y)
{
    var xs = 0;
    var ys = 0;

    xs = x - this.x;
    xs = xs * xs;
    ys = y - this.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}




