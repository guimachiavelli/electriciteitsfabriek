'use strict';

function Beacon(el) {
    this.el = el;
    this.computedStyles = window.getComputedStyle(this.el, ':before');
}

Beacon.prototype.status = function() {
    if (this.computedStyles.length < 1) {
        return null;
    }

    return this.computedStyles.getPropertyValue('content').replace(/"/g, '');
};

module.exports = Beacon;
