meepos = [];
meepoCanvas = null;
meepoContext = null;
then = 0;
selectedIndex = 0;
selectedGroup = 0;
groups = [];

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

    meepos = [new Meepo(1), new Meepo(2), new Meepo(3), new Meepo(4), new Meepo(5)];
    groups = [
        [meepos[0]], 
        [meepos[1], meepos[2], meepos[3], meepos[4]], 
        [meepos[2]], 
        [meepos[3]], 
        [meepos[4]]
    ];

    $(document).on("keydown", function(e) {
        $("#canvas").off("click");
        var keyName = "";
        switch (e.which) {
            case hotkeys.one:
            case hotkeys.two:
            case hotkeys.three:
            case hotkeys.four:
            case hotkeys.five:
                selectedGroup = e.which - hotkeys.one;
                selectedIndex = 0;
                keyName = String.fromCharCode(e.which);
                break;
            case hotkeys.w:
                preparePoof();
                 keyName = String.fromCharCode(e.which);
                break;
            case hotkeys.tab:
                selectedIndex = (selectedIndex + 1) % groups[selectedGroup].length;
                 keyName = "TAB";
                e.preventDefault();
                break;
            case hotkeys.space:
                keyName = "BLINK";
                if (groups[selectedGroup][selectedIndex] === meepos[0]) {
                    prepareBlink();
                }
                e.preventDefault();
                break;
        }
        $("#command-log").prepend(keyName + "<br/>");
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
    meepoContext.fillText((selectedGroup + 1) + ":", 720, 570);
    meepoContext.fillText((selectedIndex + 1), 760, 570);
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

poofSelectedMeepo = function(e) {
    groups[selectedGroup][selectedIndex].poof(e.pageX, e.pageY);
    e.preventDefault();
    $("#command-log").prepend("Poof meepo #" + groups[selectedGroup][selectedIndex].number + ".");
}

blinkSelectedMeepo = function(e) {
    meepos[0].dagger(e.pageX, e.pageY);
    e.preventDefault();
    $("#command-log").prepend("Blink selected meepo.<br/>");
}

prepareBlink = function() {
    $("#canvas").one("click", blinkSelectedMeepo);
}

preparePoof = function() {
    $("#canvas").one("click", poofSelectedMeepo);
}

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
