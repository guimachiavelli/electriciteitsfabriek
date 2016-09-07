<?php EF::snippet_if_not_ajax('header'); ?>

<main class="cube" role="main">
    <ul class="sides">
        <?php $direction = $page->archived() == '1' ? 'right' : 'left'; ?>
        <li id="event"
            data-location="<?php echo $direction ?>"
            class="side side--<?php echo $direction; ?> side--visible">
            <div class="side__content">
                <?php snippet('page-event', array('content' => $page)); ?>
            </div>
        </li>
    </ul>
</main>

<?php EF::snippet_if_not_ajax('footer'); ?>
