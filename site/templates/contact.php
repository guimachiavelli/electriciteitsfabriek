<?php EF::snippet_if_not_ajax('header'); ?>

<main class="cube" role="main">
    <ul class="sides">
        <li id="contact" data-location="top" class="side side--top  side--visible">
            <div class="side__content">
                <?php snippet('page-contact', array('content' => page('contact'))); ?>
            </div>
        </li>
    </ul>
</main>

<?php EF::snippet_if_not_ajax('footer'); ?>
