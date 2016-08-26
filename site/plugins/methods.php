<?php

field::$methods['ef_excerpt'] = function($field) {
    $text = str::excerpt(kirbytext($field->value), 0);
    $length = 80;

    if(str_word_count($text, 0) < $length) {
        return $text;
    }

    $words = str_word_count($text, 2);
    $pos = array_keys($words);
    $text = str::substr($text, 0, $pos[$length] - 2);

    return $text;
};
