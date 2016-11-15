'use strict';

var Prism = function(prismEl) {
    if (!prismEl) {
        return;
    }

    this.el = prismEl;
    this.containerEl = prismEl.querySelector('.sides');
};

Prism.prototype.POSITIONS = {
    left: -90,
    right: 90,
    top: 90,
    bottom: -90
};

Prism.prototype.animateClass = 'side--will-animate';
Prism.prototype.transitionClass = 'sides--transition';
Prism.prototype.visibleClass = 'side--visible';

Prism.prototype.turn = function(target, status, noTransform) {
    var immediate;

    immediate = status === 's' || noTransform ? true : false;

    this.animate(target, immediate);
};

Prism.prototype.calculatedTransform = function(target, location) {
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

Prism.prototype.animate = function(target, immediate) {
    var targetEl, currentEl, location, axis, timeout;

    timeout = immediate === true ? 1 : 700;

    targetEl = document.querySelector(target);
    currentEl = document.querySelector('.' + this.visibleClass);

    location = targetEl.getAttribute('data-location');
    axis = (location === 'left' || location === 'right') ?
           'horizontal' : 'vertical';

    this.setupAnimation(targetEl, location, axis);

    this.setTransform(this.containerEl, this.calculatedTransform(targetEl,
                                                                 location));

    setTimeout(this.resetAnimation.bind(this, targetEl, currentEl), timeout);
};

Prism.prototype.setTransform = function(node, value) {
    var property = 'Transform';
    node.style['webkit' + property] = value;
    node.style['moz' + property] = value;
    node.style['ms' + property] = value;
    node.style['o' + property] = value;
    node.style[property.toLowerCase()] = value;
};

Prism.prototype.setupAnimation = function(targetEl, location, axis) {
    targetEl.classList.add('side--position-' + location);
    targetEl.classList.add(this.animateClass);
    this.containerEl.classList.add(this.transitionClass);
    this.el.classList.add('cube--transition-' + axis);
};

Prism.prototype.resetAnimation = function(targetEl, currentEl) {
    targetEl.className = targetEl.className.replace(/side--position-.*/, '');
    targetEl.classList.remove(this.animateClass);
    this.containerEl.classList.remove(this.transitionClass);
    this.el.className = this.el.className
                                 .replace(/cube--transition-.*/, '');

    if (currentEl) {
        currentEl.classList.remove(this.visibleClass);
    }

    this.setTransform(this.containerEl, '');
    targetEl.classList.add(this.visibleClass);
};

module.exports = Prism;
