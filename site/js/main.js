'use strict';

var Navigo = require('navigo');

var Cube = require('./cube');

var Site = {
    activeMenuItemClass: 'menu-item__link--active',

    init: function() {
        this.menuEl = document.querySelector('.menu');
        this.menuEl.addEventListener('click', this.route.bind(this));

        this.cube = new Cube(document.querySelector('.cube'));
    },

    route: function(e) {
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

        this.cube.animate('#' + target);
        this.toggleActiveMenuItem(target);
    },

    linkTarget: function(target) {
        var href, lastURLFragment;

        href = target.href.split('/');

        lastURLFragment = href.pop();

        return lastURLFragment !== '' ? lastURLFragment : href.pop();
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

Site.init();
