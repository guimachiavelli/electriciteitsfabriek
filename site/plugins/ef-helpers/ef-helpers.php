<?php

class EF {

    public static function snippet_if_not_ajax($snippet, $params = null) {
        if (self::is_ajax_request()) {
            return;
        }

        snippet($snippet, $params);
    }

    private static function is_ajax_request() {
        if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
            return false;
        }

        $requested_with = $_SERVER['HTTP_X_REQUESTED_WITH'];
        return !empty($requested_with) &&
               strtolower($requested_with) == 'xmlhttprequest';
    }


    public static function nav_active_class($link, $current) {
        if ($current->isChildOf('agenda')) {
            if ($current->archived() == '1' && $link->slug() == 'archive') {
                return 'menu-item__link--active';
            }

            if ($current->archived() == '0' && $link->slug() == 'agenda') {
                return 'menu-item__link--active';
            }

            return;
        }

        return $link->isOpen() ? 'menu-item__link--active' : '';
    }

    public static function intro_active_class($page) {
        return $page->slug() === 'home' ? 'intro-active' : '';
    }
}
