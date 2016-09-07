'use strict';

var Navigo = require('navigo');

var Cube = require('./cube');

var Site = {
    activeMenuItemClass: 'menu-item__link--active',

    init: function() {
        this.menuEl = document.querySelector('.menu');
        this.cube = new Cube(document.querySelector('.cube'));
        this.router = new Navigo();
        var self = this;

        this.router.on({
            '/agenda': this.navigate.bind(self, 'agenda'),
            '/contact': this.navigate.bind(self, 'contact'),
            '/archive': this.navigate.bind(self, 'archive'),
            '/about': this.navigate.bind(self, 'about'),

            '*': function(params) {
                console.log();
            }
        });

        this.menuEl.addEventListener('click', this.onMenuClick.bind(this));
    },

    onMenuClick: function(e) {
        var target, linkEl;

        if (e.target.nodeName.toLowerCase() !== 'a') {
            return;
        }

        target = this.linkTarget(e.target);
        linkEl = document.querySelector('.menu-item--' + target + ' .menu-item__link');

        e.preventDefault();

        if (linkEl.classList.contains(this.activeMenuItemClass)) {
            return;
        }

        this.router.navigate(target);
    },

    navigate: function(target) {
        if (!this.isPageLoaded(target)) {
            this.fetch(target, this.navigate.bind(this, target));
            return;
        }

        this.cube.turn('#' + target);
        this.toggleActiveMenuItem(target);
    },

    isPageLoaded: function(target) {
        return document.querySelector('#' + target) !== null;
    },

    fetch: function(target, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', target, true);
        request.setRequestHeader('X-REQUESTED-WITH', 'XMLHttpRequest');
        request.onload = this.onPageFetchSuccess.bind(this, request, callback);
        request.onerror = this.onPageFetchError;

        request.send();
    },

    onPageFetchSuccess: function(request, callback) {
        var fragment;

        if (request.status < 200 && request.status >= 400) {
            return;
        }

        fragment = document.createElement('div');
        fragment.innerHTML = request.responseText;
        this.cube.containerEl.appendChild(fragment.querySelector('.side'));

        if (callback && typeof callback === 'function') {
            console.log('callback');
            callback();
        }
    },

    onPageFetchError: function() {

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
