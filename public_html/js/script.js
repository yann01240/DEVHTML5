var largeur = $(window).width();
var hauteur = $(window).height();

$('canvas').attr('width', largeur + "px");
$('canvas').attr('height', hauteur + "px");
$('canvas').drawRect({
    strokeStyle: 'black',
    x: 0, y: 0,
    width: largeur,
    height: hauteur,
    fromCenter: false
});

cercles = [];
//[70, 0, 50, false, 2], [250, 0, 75, false, 3], [500, 0, 100, false, 1]
var a = 0;
var score = 0;
var inter2 = setInterval(function () {
    cercles[a] = [];
    cercles[a][0] = Math.round(Math.random() * largeur);
    cercles[a][1] = Math.round(Math.random() * 1000) * -1;
    cercles[a][2] = Math.round(Math.random() * 50) + 10;
    cercles[a][3] = false;
    cercles[a][4] = Math.round(Math.random() * 2) + 1;
    cercles[a][5] = Math.round(Math.random() * 255);
    cercles[a][6] = Math.round(Math.random() * 255);
    cercles[a][7] = Math.round(Math.random() * 255);
    a++;
}, 500);


$('canvas').on('click', function (event) {
    select(event);
});
$(window).keypress(function (event) {
    key(event);
});

function key(event) {
    if (event.which === 32 && score > 10) {
        score=score-10;
        for (var i = 0; i < cercles.length; i++) {
            if (cercles[i][1] > 0 && cercles[i][1] < hauteur) {
                cercles[i][3] = true;
                score++;
            }
        }
        $('canvas').clearCanvas();
        $('canvas').drawRect({
            strokeStyle: 'black',
            x: 0, y: 0,
            width: largeur,
            height: hauteur,
            fromCenter: false
        });
        clearInterval(inter);
        $('canvas').drawText({
            fillStyle: 'red',
            strokeStyle: 'orange',
            strokeWidth: 2,
            x: largeur/2, y: hauteur/2,
            fontSize: 200,
            fontFamily: 'Verdana, sans-serif',
            text: 'BOOM'
        });
        setTimeout(function () {
            start();
        }, 100);
    } else if (event.which === 13){
        alert(score);
    }
}

function select(event) {
    for (var i = 0; i < cercles.length; i++) {
        if (Math.sqrt((Math.pow(Math.abs(event.clientX - cercles[i][0]), 2) + Math.pow(Math.abs(event.clientY - cercles[i][1]), 2))) < cercles[i][2]) {
            cercles[i][3] = true;
            score++;
        }
    }
}
function start() {
    inter = setInterval(function () {
        $('canvas').clearCanvas();
        $('canvas').drawRect({
            strokeStyle: 'black',
            x: 0, y: 0,
            width: largeur,
            height: hauteur,
            fromCenter: false
        });
        for (var i = 0; i < cercles.length; i++) {
            cercles[i][1] += cercles[i][4];
            if (cercles[i][3] === false) {
                $('canvas').drawArc({
                    fillStyle: 'rgba(' + cercles[i][5] + ', ' + cercles[i][6] + ', ' + cercles[i][7] + ', 0.5)',
                    x: cercles[i][0], y: cercles[i][1],
                    radius: cercles[i][2]
                });
            }
        }
    }, 10);
}
start();