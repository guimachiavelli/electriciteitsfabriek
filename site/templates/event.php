<?php EF::snippet_if_not_ajax('header'); ?>

  <main class="" role="main">

    <header class="">
      <h1><?php echo $page->title()->html() ?></h1>
    </header>

    <div>
      <?php echo $page->text()->kirbytext() ?>
    </div>

    <div>
      <?php echo $page->media()->kirbytext() ?>
    </div>

  </main>

<?php EF::snippet_if_not_ajax('footer'); ?>
