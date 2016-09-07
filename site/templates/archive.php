<?php EF::snippet_if_not_ajax('header'); ?>

<main class="cube" role="main">
    <ul class="sides">
        <li id="archive" data-location="right" class="side side--right side--visible">
            <div class="side__content">
                <?php snippet('page-archive', array('content' => page('archive'))); ?>
            </div>
        </li>
    </ul>
</main>

<?php EF::snippet_if_not_ajax('footer'); ?>
