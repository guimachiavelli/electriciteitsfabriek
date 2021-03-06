'use strict';

require('./modernizr.preserve3d');

var Navigo = require('navigo');

var Cube = require('./cube'),
    Beacon = require('./beacon');

var Site = {
    activeMenuItemClass: 'menu-item__link--active',

    init: function() {
        var self = this;

        this.menuEl = document.querySelector('.menu');
        this.menuButton = document.querySelector('.menu__button');
        this.cube = new Cube(document.querySelector('.cube'));
        this.router = new Navigo();
        this.beacon = new Beacon(document.querySelector('.beacon'));

        this.router.on({
            '/agenda/:event': this.navigate.bind(self, 'event'),
            '/agenda': this.navigate.bind(self, 'agenda'),
            '/contact': this.navigate.bind(self, 'contact'),
            '/archive': this.navigate.bind(self, 'archive'),
            '/about': this.navigate.bind(self, 'about'),
        });

        this.menuEl.addEventListener('click', this.onMenuClick.bind(this));
        this.menuButton.addEventListener('click',
                                         this.onMenuButtonClick.bind(this));
        this.bindEventClicks();

        this.intro();
    },

    intro: function() {
        var intro = document.querySelector('.intro'),
            wrapper = document.querySelector('.wrapper'),
            body = document.body,
            menu = this.menuEl,
            mobile = this.beacon.status() === 's',
            self = this;

        if (intro === null) {
            return;
        }

        wrapper.style.transform = 'none';
        intro.style.opacity = 0;

        if (mobile) {
            self.navigate('agenda');
        }

        setTimeout(function(){
            if (!mobile) {
                menu.classList.add('menu--active');
                self.navigate('agenda');
            }

            wrapper.removeChild(intro);
            body.classList.remove('intro-active');
        },  mobile ? 2000 : 2750);
    },

    navigate: function(target, params) {
        var path;

        if (params) {
            //TODO: quick routing fix. remove when we have the final server
            path = window.location.pathname.indexOf('ef') > -1 ? '/ef' : '';
            this.fetch(path + '/agenda/' + params.event,
                       this.navigate.bind(this, target));
            return;
        }

        if (!this.isPageLoaded(target) && target !== 'event') {
            this.fetch(target, this.navigate.bind(this, target));
            return;
        }

        this.cube.turn('#' + target, this.beacon.status(), Modernizr.preserve3d);
        this.toggleActiveMenuItem(target);
    },

    onMenuButtonClick: function(event) {
        event.preventDefault();
        this.menuEl.classList.add('menu--active');
    },


    onMenuClick: function(e) {
        var target, linkEl;

        if (e.target.nodeName.toLowerCase() !== 'button' &&
            this.menuEl.classList.contains('menu--active')) {
            this.menuEl.classList.remove('menu--active');
        }

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

    bindEventClicks: function() {
        var events, i, len;

        events = document.querySelectorAll('.event__link');

        for (i = 0, len = events.length; i < len; i += 1) {
            events[i].addEventListener('click', this.onEventClick.bind(this));
        }
    },

    onEventClick: function(event) {
        var el;

        event.preventDefault();

        el = event.target;

        if (el.nodeName !== 'A') {
            el = this.ancestorLink(el);
        }

        this.router.navigate(el.href, true);
    },

    ancestorLink: function(node) {
        if (node.nodeName === 'A') {
            return node;
        }

        if (!node.parentElement) {
            return null;
        }

        return this.ancestorLink(node.parentElement);
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
        var fragment, el, previousEvent;

        if (request.status < 200 || request.status >= 400) {
            return;
        }

        fragment = document.createElement('div');
        fragment.innerHTML = request.responseText;

        el = fragment.querySelector('.side');
        previousEvent = document.querySelector('#event');

        if (el && el.id === 'event' && previousEvent) {
            this.cube.containerEl.removeChild(previousEvent);
        }

        this.cube.containerEl.appendChild(el);

        if (el && (el.id === 'agenda' || el.id === 'archive')) {
            this.bindEventClicks();
        }

        if (callback && typeof callback === 'function') {
            //console.log('callback');
            callback();
        }
    },

    onPageFetchError: function(error) {
        console.log(error);
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

        if (target !== 'event' && currentItem) {
            currentItem.classList.remove(this.activeMenuItemClass);
        }

        if (targetEl) {
            targetEl.classList.add(this.activeMenuItemClass);
        }
    }
};

Site.init();
