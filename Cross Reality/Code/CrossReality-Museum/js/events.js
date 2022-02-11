var camera;
var cursorElement;

var newspaperShown = false;
var whaleInMovement = false;
var ticksSinceWhaleInMovement = 0;
var whaleMovementFactor = 0.001;

AFRAME.registerComponent('cursor-listener', {
    init: function () {
        cursorElement = this.el;
        this.el.addEventListener('click', function (evt) {
            if(checkdistance(camera.object3D.position.x, camera.object3D.position.z, evt.target.object3D.position.x, evt.target.object3D.position.z) < 1.5){
                if(evt.target.id == "newspaper"){
                    if(!newspaperShown) {
                        document.getElementById("newspaper-popup").setAttribute('visible', true);
                        newspaperShown = true;
                    }
                }
            }
            
            if(evt.target.id == "whale"){
                if(!whaleInMovement){
                    whaleInMovement = true;
                }
            }
        });
    }
});

/**
 * Liest mit jedem Tick die neue Position der Kamera aus und speichert sie
 */
AFRAME.registerComponent('position-reader', {
    tick: function () {
        camera = this.el;
        
    }
});

/**
 * Hier könnt ihr Bedingungen reinschreiben, die in einer Dauerschleife (Ticks) abgefragt werden sollen,
 * um bspw. Pop-Ups wieder verschwinden zu lassen, Animationen aufhören zu lassen, kp
 */
AFRAME.registerComponent('check-interaction', {
    tick: function(){
    
        if(newspaperShown){
            
            let newspaperElement = document.getElementById("newspaper-popup");
            if(checkdistance(camera.object3D.position.x, camera.object3D.position.z, newspaperElement.object3D.position.x, newspaperElement.object3D.position.z) > 3){
                document.getElementById("newspaper-popup").setAttribute('visible', false);
                newspaperShown = false;
            }

        }
        if(whaleInMovement){
            
            let whaleElement = document.getElementById("whale");
            
            whaleElement.object3D.rotation.x += whaleMovementFactor;
            
            if(whaleElement.object3D.rotation.x >= (-1.39626)){
                whaleMovementFactor = -0.001;
            }
            if(whaleElement.object3D.rotation.x <= (-1.74533)){
                whaleMovementFactor = 0.001;
            }
            
            ticksSinceWhaleInMovement++;
            
            if(ticksSinceWhaleInMovement > 1500 && (whaleElement.object3D.rotation.x <= -1.55334 && whaleElement.object3D.rotation.x >= -1.58825)){
                whaleInMovement = false;
                whaleElement.object3D.rotation.x = -1.5707963267948966;
                ticksSinceWhaleInMovement = 0;
            }
        }
    }
});

function checkdistance(x1, y1, x2, y2){
    var a = x1 - x2;
    var b = y1 - y2;
    
    var c = Math.sqrt( a*a + b*b );
    
    return c;
}