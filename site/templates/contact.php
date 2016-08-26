<?php EF::snippet_if_not_ajax('header'); ?>

<main class="main" role="main">
    <?php snippet('page-contact', array('content' => $page)); ?>
</main>

<?php EF::snippet_if_not_ajax('footer'); ?>
