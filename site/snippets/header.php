<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">

        <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
        <meta name="description" content="<?php echo $site->description()->html() ?>">
        <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

        <?php echo css('assets/css/styles.css'); ?>
    </head>

        <body class="no-js <?php echo EF::intro_active_class($page); ?>">
        <script>
            document.body.classList.remove('no-js');
            document.body.classList.add('js');
        </script>

        <header class="site-header" role="banner">
            <a class="site-title" href="<?php echo url() ?>">
                De Electriciteitsfabriek
            </a>

            <?php snippet('menu') ?>
        </header>

        <div class="wrapper">
