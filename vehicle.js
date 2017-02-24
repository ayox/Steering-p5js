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
    this.R = 255, this.G = 255, this.B = 255;
    this.changedDefaultColor = false;
}
Vehicle.prototype.update = function () {
    this.pos.add(this.velocity);
    this.velocity.add(this.acc);
    this.acc.mult(0);
};
Vehicle.prototype.defaultColor = function () {
    this.R = 255, this.G = 100, this.B = 50;
    this.changedDefaultColor = false;
};
Vehicle.prototype.randomColor = function () {
    if (!this.changedDefaultColor) {
        this.R = random(0, 255), this.G = random(0, 255), this.B = random(0, 255);
        this.changedDefaultColor = true;
    }
};

Vehicle.prototype.show = function () {
    stroke(this.R, this.G, this.B);
    strokeWeight(11);
    point(this.pos.x, this.pos.y);
};

Vehicle.prototype.behaviors = function () {
    this.randomColorByPosition();
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    // var flee = this.flee(mouse);
    // flee.mult(10);
    var chase = this.chase(mouse);
    chase.mult(10);
    arrive.mult(2);
    this.applyForce(arrive);
    // this.applyForce(flee);
    this.applyForce(chase);

};
Vehicle.prototype.applyForce = function (_force) {
    this.acc.add(_force);
};

Vehicle.prototype.flee = function (_target) {
    var desired = p5.Vector.sub(_target, this.pos);
    if (desired.mag() < 50) {
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        // this.randomColor();
        return steer;
    }
    else {
        return createVector(0, 0);
    }
};
Vehicle.prototype.chase = function (_target) {
    var desired = p5.Vector.sub(this.pos, _target);
    if (desired.mag() < 100) {
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        // this.randomColor();
        return steer;
    }
    else {
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
    return arrive;
};
Vehicle.prototype.isInPosition = function () {
    var desired = p5.Vector.sub(this.target, this.pos);
    var distance = desired.mag();
    return (distance < 1);
};
Vehicle.prototype.randomColorByPosition = function () {
    if (this.isInPosition()) this.defaultColor();
    else this.randomColor();
};