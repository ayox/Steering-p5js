/**
 * Created by aymen on 24/02/2017.
 */
function Vehicle(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.acc = createVector();
    this.velocity = p5.Vector.random2D();
    this.r = 8;
    this.maxSpeed = 20;
    this.maxForce = 0.3;
    this.R = 255;
    this.G = 255, this.B = 255
}
Vehicle.prototype.update = function () {
    this.pos.add(this.velocity);
    this.velocity.add(this.acc);
    this.acc.mult(0);
};
Vehicle.prototype.defaultColor = function () {
    this.R = 255, this.G = 255, this.B = 255;
};
Vehicle.prototype.randomColor = function () {
    this.R = random(0, 255), this.G = random(0, 255), this.B = random(0, 255);
};

Vehicle.prototype.show = function () {
    stroke(this.R, this.G, this.B);
    strokeWeight(11);
    point(this.pos.x, this.pos.y);
};

Vehicle.prototype.behaviors = function () {
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);
    flee.mult(10);
    arrive.mult(3);
    this.applyForce(arrive);
    this.applyForce(flee);

};
Vehicle.prototype.applyForce = function (_force) {
    this.acc.add(_force);
};

Vehicle.prototype.flee = function (_target) {
    var desired = p5.Vector.sub(_target, this.pos);

    if (desired.mag() < 50) {
        this.randomColor();
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }
    else {
        setTimeout(function () {
            this.defaultColor();
        }, 5000);
        return createVector(0, 0);
    }
};
Vehicle.prototype.arrive = function (_target) {
    var desired = p5.Vector.sub(_target, this.pos);
    var distance = desired.mag();
    var speed = this.maxSpeed;
    if (distance < 100) {
        speed = map(distance, 0, 100, 0, this.maxSpeed)
    }
    desired.setMag(speed);
    var arrive = p5.Vector.sub(desired, this.velocity);
    arrive.limit(this.maxForce);
    this.defaultColor();
    return arrive;
};