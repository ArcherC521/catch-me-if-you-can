/*
 *  CLASS painter on some canvas
 *  constructor
 */
function Painter(canvas) {
    this.canvas = canvas;
}

/*
 *  PROTOTYPE FUNCTION paint
 *  usage:
 *    paint(gridShape, 'contour')
 *    Draw all grids with gray edges.
 *
 *    paint(gridShape, 'fill', x, y, fillStyle)
 *    Fill the grid indicated by given x-index and y-index.
 *
 *    paint(gridShape, 'image', x, y, src)
 *    Paint the image src in the grid indicated by given x-index and y-index.
 */
Painter.prototype.paint = function() {
    var ctx = this.canvas[0].getContext('2d');
    var args = arguments;

    var paintGrid = function(grid) {
        var x = grid.x, y = grid.y, a = args[0].a;

        ctx.beginPath();
        switch (args[0].shape) {
            case '0': // triangle
                var h = a * Math.sqrt(3) / 2;
                var direction = grid.direction;
                ctx.moveTo(x, y-h*direction/2);
                ctx.lineTo(x-a/2, y+h*direction/2);
                ctx.lineTo(x+a/2, y+h*direction/2);
                break;

            case '1': // square
                ctx.moveTo(x-a/2, y-a/2);
                ctx.lineTo(x+a/2, y-a/2);
                ctx.lineTo(x+a/2, y+a/2);
                ctx.lineTo(x-a/2, y+a/2);
                break;
                
            case '2': // hexagon
                var h = a * Math.sqrt(3) / 2;
                ctx.moveTo(x-a/4, y-h/2);
                ctx.lineTo(x+a/4, y-h/2);
                ctx.lineTo(x+a/2, y);
                ctx.lineTo(x+a/4, y+h/2);
                ctx.lineTo(x-a/4, y+h/2);
                ctx.lineTo(x-a/2, y);
        }
        switch (args[1]) {
            case 'contour':
                ctx.closePath();
                ctx.strokeStyle = '#aaa';
                ctx.stroke();
                break;

            case 'fill':
                ctx.fillStyle = args[4];
                ctx.fill();
                break;

            case 'image':
                var img = new Image();
                img.src = args[4];
                img.onload = function() { ctx.drawImage(img, x-16, y-16, 32, 32); };
        }
    };

    if (args.length > 2) paintGrid(id2px(args[0], args[2], args[3]));
    else
        for (var y = 0; id2px(args[0],0,y).y < this.canvas.height()+args[0].a/2; ++y)
            for (var x = 0; id2px(args[0],x,0).x < this.canvas.width()+args[0].a/2; ++x)
                paintGrid(id2px(args[0], x, y));
};

/*
 *  PROTOTYPE FUNCTION clear
 *  Clear the canvas.
 */
Painter.prototype.clear = function() {
    this.canvas[0].getContext('2d').clearRect(0, 0, this.canvas.width(), this.canvas.height());
};
