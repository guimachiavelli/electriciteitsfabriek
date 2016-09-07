<?php EF::snippet_if_not_ajax('header'); ?>

<main class="cube" role="main">
    <ul class="sides">
        <li class="side side--front side--visible"></li>

        <li id="agenda" data-location="left" class="side side--left">
            <div class="side__content">
                <?php snippet('page-agenda', array('content' => page('agenda'))); ?>
            </div>
        </li>

        <li id="about" data-location="bottom" class="side side--bottom">
            <div class="side__content">
                <?php snippet('page-default', array('content' => page('about'))); ?>
            </div>
        </li>

        <li id="contact" data-location="top" class="side side--top">
            <div class="side__content">
                <?php snippet('page-contact', array('content' => page('contact'))); ?>
            </div>
        </li>

        <li id="archive" data-location="right" class="side side--right">
            <div class="side__content">
                <?php snippet('page-archive', array('content' => page('archive'))); ?>
            </div>
        </li>
    </ul>
</main>

<?php EF::snippet_if_not_ajax('footer'); ?>
