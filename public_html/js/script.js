
var hauteur = $(window).height();

  var largeur = hauteur*9/16;
document.getElementById('canvas').setAttribute("width", largeur + "px");
document.getElementById('canvas').setAttribute("height", hauteur + "px");
ctx = document.getElementById('canvas').getContext('2d');
ctx.fillStyle = "green";
ctx.fillRect(0,0,largeur, hauteur);
ctx.fill();