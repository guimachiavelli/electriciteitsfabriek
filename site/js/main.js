'use strict';

var cube = {
    POSITIONS: {
        left: -90,
        right: 90,
        top: 90,
        bottom: -90,
    },
    animateClass: 'side--will-animate',
    transitionClass: 'sides--transition',
    visibleClass: 'side--visible',
    activeMenuItemClass: 'menu-item__link--active',

    init: function(menuEl, prismEl) {
        this.menuEl = menuEl;
        this.prismEl = prismEl;
        this.containerEl = prismEl.querySelector('.sides');

        this.menuEl.addEventListener('click', this.turn.bind(this));
    },

    turn: function(e) {
        var target, menuEl;

        if (e.target.nodeName.toLowerCase() !== 'a') {
            return;
        }

        target = this.linkTarget(e.target);
        menuEl = document.querySelector('.menu-item--' + target + ' .menu-item__link');

        e.preventDefault();

        if (menuEl.classList.contains(this.activeMenuItemClass)) {
            return;
        }

        this.animate('#' + target);
        this.toggleActiveMenuItem(target);
    },

    linkTarget: function(target) {
        var href, lastURLFragment;

        href = target.href.split('/');

        lastURLFragment = href.pop();

        return lastURLFragment !== '' ? lastURLFragment : href.pop();
    },

    calculatedTransform: function(target, location) {
        var axis;

        axis = (location === 'left' || location === 'right') ? 'Y' : 'X';

        return 'rotate' + axis + '(' + this.POSITIONS[location] + 'deg)';
    },

    animate: function(target) {
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
    },

    setupAnimation: function(targetEl, location, axis) {
        targetEl.classList.add('side--position-' + location);
        targetEl.classList.add(this.animateClass);
        this.containerEl.classList.add(this.transitionClass);
        this.prismEl.classList.add('cube--transition-' + axis);
    },

    resetAnimation: function(targetEl, currentEl) {
        targetEl.className = targetEl.className.replace(/side--position-.*/, '');
        targetEl.classList.remove(this.animateClass);
        this.containerEl.classList.remove(this.transitionClass);
        this.prismEl.className = this.prismEl.className
                                     .replace(/cube--transition-.*/, '');

        if (currentEl) {
            currentEl.classList.remove(this.visibleClass);
        }

        this.containerEl.style.transform = '';
        targetEl.classList.add(this.visibleClass);
    },

    toggleActiveMenuItem: function(target) {
        var currentItem, targetEl;

        currentItem = document.querySelector('.' + this.activeMenuItemClass);

        targetEl = document
                  .querySelector('.menu-item--' + target + ' .menu-item__link');

        if (currentItem) {
            currentItem.classList.remove(this.activeMenuItemClass);
        }

        targetEl.classList.add(this.activeMenuItemClass);
    }

};

cube.init(document.querySelector('.menu'), document.querySelector('.cube'));
