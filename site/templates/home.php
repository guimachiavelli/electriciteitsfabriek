<?php EF::snippet_if_not_ajax('header'); ?>

<main class="cube" role="main">
    <ul class="sides">
        <li class="side side--front side--visible"></li>

        <li id="agenda" data-location="left" class="side side--left">
            <?php snippet('page-agenda', array('content' => page('agenda'))); ?>
        </li>

        <li id="about" data-location="bottom" class="side side--bottom">
            <?php snippet('page-default', array('content' => page('about'))); ?>
        </li>

        <li id="contact" data-location="top" class="side side--top">
            <?php snippet('page-contact', array('content' => page('contact'))); ?>
        </li>

        <li id="archive" data-location="right" class="side side--right">
            <?php snippet('page-archive', array('content' => page('archive'))); ?>
        </li>
    </ul>
</main>

<?php EF::snippet_if_not_ajax('footer'); ?>
