<?php EF::snippet_if_not_ajax('header'); ?>

<main class="cube" role="main">
    <ul class="sides">
        <li id="event" data-location="bottom" class="side side--bottom side--visible">
            <div class="side__content">
                <?php snippet('page-event', array('content' => $page)); ?>
            </div>
        </li>
    </ul>
</main>

<?php EF::snippet_if_not_ajax('footer'); ?>
