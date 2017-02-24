var font;
var vehicles = [];
function preload() {
    font = loadFont('FreeMonoBold.ttf')
}
function setup() {
    createCanvas(1800, 1800);

    // textFont(font);
    // textSize(200);
    // fill(0);
    // text('test', 0, 200);
    var points = font.textToPoints('AYOX', 100, 200, 300);
    points.forEach(function (_point) {
        var vehicle = new Vehicle(_point.x, _point.y);
        vehicles.push(vehicle);
        // stroke(255, 150, 0);
        // strokeWeight(10);
        // point(_point.x, _point.y);
    })
}
function draw() {
    background(66);
    vehicles.forEach(function (_vehicle) {
        _vehicle.behaviors();
        _vehicle.update();
        _vehicle.show();
    })
    frameRate(50);
}
