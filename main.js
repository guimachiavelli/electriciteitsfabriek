'use strict';

var cube = {
    POSITIONS: {
        left: -90,
        right: 90,
        top: 90,
        bottom: -90,
    },

    init: function() {
        var menu = document.querySelector('.menu');
        menu.addEventListener('click', this.turn.bind(this));
    },

    turn: function(e) {
        var target, locations, self = this;

        if (e.target.nodeName.toLowerCase() !== 'a') {
            return;
        }

        target = e.target.hash;

        if (target.indexOf('#') !== 0) {
            return;
        }

        e.preventDefault();

        locations = this.animationPath(document.querySelector(target));
        console.log(locations);

        locations.forEach(function(location, index) {
            setTimeout(function() {
                self.animate(location);
            }, index * 500);
        });
    },

    animationPath: function(target) {
        var currentPosition, path, axis;


        currentPosition = document.querySelector('.sides').style.transform;
        path = target.getAttribute('data-location');
        axis = path === 'left' || path === 'right' ? 'Y' : 'X';

        if (window.location.search.indexOf('two-steps') < 0) {
            return ['rotate' + axis + '(' + this.POSITIONS[path] + 'deg)'];
        }

        if (!currentPosition) {
            return ['rotate' + axis + '(' + this.POSITIONS[path] + 'deg)'];
        }

        currentPosition = currentPosition.indexOf('X') > -1 ? 'x' : 'y';


        if (currentPosition === 'y' && (path === 'top' || path === 'bottom')) {
            return ['rotateY(0deg)', 'rotateX(' + this.POSITIONS[path] + 'deg)'];
        }

        if (currentPosition === 'x' && (path === 'left' || path === 'right')) {
            return ['rotateX(0deg)', 'rotateY(' + this.POSITIONS[path] + 'deg)'];
        }


        return ['rotate' + axis + '(' + this.POSITIONS[path] + 'deg)'];
    },

    animate: function(location) {
        var cube;

        cube = document.querySelector('.sides');
        cube.style.transform = location;

    }

};

cube.init();
