'use strict';

var Cube = function(prismEl) {
    if (!prismEl) {
        return;
    }

    this.el = prismEl;
    this.containerEl = prismEl.querySelector('.sides');
};

Cube.prototype.POSITIONS = {
    left: -90,
    right: 90,
    top: 90,
    bottom: -90
};

Cube.prototype.animateClass = 'side--will-animate';
Cube.prototype.transitionClass = 'sides--transition';
Cube.prototype.visibleClass = 'side--visible';

Cube.prototype.turn = function(target) {
    this.animate(target);
};

Cube.prototype.calculatedTransform = function(target, location) {
    var axis, origin;

    axis = (location === 'left' || location === 'right') ? 'Y' : 'X';

    // XXX: translate the element because
    //      transform-origin-z does not work in safari
    switch (location) {
        case 'left':
            origin = 'translateZ(50vw) translateX(50vw)';
            break;
        case 'right':
            origin = 'translateZ(50vw) translateX(-50vw)';
            break;
        case 'top':
            origin = 'translateZ(50vh) translateY(50vh)';
            break;
        case 'bottom':
            origin = 'translateZ(50vh) translateY(-50vh)';
            break;
    }

    return origin + ' rotate' + axis + '(' + this.POSITIONS[location] + 'deg)';
};

Cube.prototype.animate = function(target) {
    var targetEl, currentEl, location, axis;

    targetEl = document.querySelector(target);
    currentEl = document.querySelector('.' + this.visibleClass);

    location = targetEl.getAttribute('data-location');
    axis = (location === 'left' || location === 'right') ?
           'horizontal' : 'vertical';

    this.setupAnimation(targetEl, location, axis);

    this.containerEl.style.transform = this.calculatedTransform(targetEl,
                                                                location);

    setTimeout(this.resetAnimation.bind(this, targetEl, currentEl), 700);
};

Cube.prototype.setupAnimation = function(targetEl, location, axis) {
    targetEl.classList.add('side--position-' + location);
    targetEl.classList.add(this.animateClass);
    this.containerEl.classList.add(this.transitionClass);
    this.el.classList.add('cube--transition-' + axis);
};

Cube.prototype.resetAnimation = function(targetEl, currentEl) {
    targetEl.className = targetEl.className.replace(/side--position-.*/, '');
    targetEl.classList.remove(this.animateClass);
    this.containerEl.classList.remove(this.transitionClass);
    this.el.className = this.el.className
                                 .replace(/cube--transition-.*/, '');

    if (currentEl) {
        currentEl.classList.remove(this.visibleClass);
    }

    this.containerEl.style.transform = '';
    targetEl.classList.add(this.visibleClass);
};

module.exports = Cube;
