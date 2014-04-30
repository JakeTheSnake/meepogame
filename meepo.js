Meepo = function() {
    this.x = 400 + randomOffset();
    this.y = 300 + randomOffset();
    this.color = "";
    this.stopChanneling();
    this.channelSound = new Audio("sounds/poof_channel.wav");
    this.poofAppearSound = new Audio("sounds/poof_appear.wav");
}

Meepo.prototype.poof = function(x, y) {
    if (!this.channeling) {
        this.channelSound.play();
        this.poofTargetX = x;
        this.poofTargetY = y;
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
    meepoContext.beginPath();
    meepoContext.lineWidth = "20";
    meepoContext.strokeStyle = this.channeling ? "red" : "green";
    meepoContext.rect(this.x,this.y, 20, 20);
    meepoContext.stroke();

    meepoContext.beginPath();
    meepoContext.lineWidth = "2";
    meepoContext.strokeStyle = "black";
    meepoContext.rect(this.x - 9, this.y - 9, 38,38);
    meepoContext.stroke();
}

Meepo.prototype.teleport = function() {
    var targetMeepo = findClosestMeepoTo(this.poofTargetX, this.poofTargetY);
    this.x = targetMeepo.x + randomOffset();
    this.y = targetMeepo.y + randomOffset();
    this.stopChanneling();
    this.poofAppearSound.play();
}

Meepo.prototype.dagger = function(x, y) {
    this.x = x - 20;
    this.y = y - 20;
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




