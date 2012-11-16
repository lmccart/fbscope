// Make the paper scope global, by injecting it into window:
paper.install(window);

// Only executed our code once the DOM is ready.
window.onload = function() {
    paper.setup('myCanvas');

    // Create two drawing tools.
    // tool1 will draw straight lines,
    // tool2 will draw clouds.

    // Both share the mouseDown event:
    var path;
    function onMouseDown(event) {
        path = new Path();
        path.strokeColor = 'black';
        path.add(event.point);
    }

    tool1 = new Tool();
    tool1.onMouseDown = onMouseDown;

    tool1.onMouseDrag = function(event) {
        path.add(event.point);
    }

    tool2 = new Tool();
    tool2.minDistance = 20;
    tool2.onMouseDown = onMouseDown;

    tool2.onMouseDrag = function(event) {
        // Use the arcTo command to draw cloudy lines
        path.arcTo(event.point);
    }
    
    view.onFrame = function(event) {
        // On each frame, rotate the path by 3 degrees:
        if (path) path.rotate(3);
    }
}