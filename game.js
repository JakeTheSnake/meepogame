meepos = [];
meepoCanvas = null;
meepoContext = null;
then = 0;
selectedIndex = 0;
selectedGroup = 0;
groups = [];


hotkeys = {
    tab: 9, 
    one: 49, 
    two: 50, 
    three: 51, 
    four: 52, 
    five: 53, 
    space: 32, 
    w: 87,
    q: 81
}

window.onload = function () {
    then = Date.now();
    meepoCanvas = document.createElement("canvas");
    meepoCanvas.id = "meepo-canvas"
    meepoContext = meepoCanvas.getContext("2d");
    meepoCanvas.width = 800;
    meepoCanvas.height = 600;
    $("#canvas").append(meepoCanvas);
    $("#canvas").css("width", "800");
    $("#canvas").css("background-image", "url('images/jungle.png')");

    meepoContext.font = "30px Arial Black"

    meepos = [new Meepo(), new Meepo(), new Meepo(), new Meepo(), new Meepo()];
    groups = [
        [meepos[0]], 
        [meepos[1], meepos[2], meepos[3], meepos[4]], 
        [meepos[2]], 
        [meepos[3]], 
        [meepos[4]]
    ];

    $(document).on("keydown", function(e) {
        $(document).off("click");
        switch (e.which) {
            case hotkeys.one:
            case hotkeys.two:
            case hotkeys.three:
            case hotkeys.four:
            case hotkeys.five:
                selectedGroup = e.which - hotkeys.one;
                selectedIndex = 0;
                break;
            case hotkeys.w:
                preparePoof();
                break;
            case hotkeys.tab:
                selectedIndex = (selectedIndex + 1) % groups[selectedGroup].length;
                e.preventDefault();
                break;
            case hotkeys.space:
                if (groups[selectedGroup][selectedIndex] === meepos[0]) {
                    prepareBlink();
                }
                e.preventDefault();
                break;
        }
        
    });

    gameLoop();
}

gameLoop = function () {
    var now = Date.now();
    var delta = now - then;
    var i;
    meepoContext.clearRect(0,0,800,600);
    for (i = 0; i < meepos.length; i++) {
        meepos[i].update(delta);
    }
    for (i = 0; i < meepos.length; i++) {
        meepos[i].draw(delta);
    }
    drawGroups();
    requestAnimationFrame(gameLoop);
    then = now;
};

drawGroups = function() {
    meepoContext.fillText((selectedGroup + 1) + ":", 5, 40);
    meepoContext.fillText((selectedIndex + 1), 40, 40);
}

findClosestMeepoTo = function(x, y) {
    var closestMeepo = undefined;
    var lowestDistance = 1000;
    var i;
    for (i = 0; i < meepos.length; i++) {
        var distance = meepos[i].getDistanceTo(x, y);
        if (distance < lowestDistance) {
            closestMeepo = meepos[i];
            lowestDistance = distance;
        }
    }
    return closestMeepo;
};

randomOffset = function() {
    return Math.random()*140 - 70;
};

preparePoof = function() {
    $(document).one("click", function(e) {
        groups[selectedGroup][selectedIndex].poof(e.pageX, e.pageY);
    });
}

prepareBlink = function() {
    $(document).one("click", function(e) {
        meepos[0].dagger(e.pageX, e.pageY);
    });
}


