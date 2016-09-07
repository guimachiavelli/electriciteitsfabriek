<?php EF::snippet_if_not_ajax('header'); ?>

<main class="cube" role="main">
    <ul class="sides">
        <li id="agenda" data-location="left" class="side side--left side--visible">
            <div class="side__content">
                <?php snippet('page-agenda', array('content' => page('agenda'))); ?>
            </div>
        </li>
    </ul>
</main>

<?php EF::snippet_if_not_ajax('footer'); ?>
