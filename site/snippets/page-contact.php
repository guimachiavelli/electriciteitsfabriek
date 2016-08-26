<div class="text">
    <h1><?php echo $content->title()->html() ?></h1>
    <?php echo $content->address()->kirbytext() ?>

    <?php if ($content->instagram()->isNotEmpty()): ?>
        <a href="<?php echo $content->instagram()->toURL(); ?>">
            Instagram
        </a>
    <?php endif; ?>

    <?php if ($content->twitter()->isNotEmpty()): ?>
        <a href="<?php echo $content->twitter()->toURL(); ?>">
            Twitter
        </a>
    <?php endif; ?>
</div>

<div class="text">
    <?php echo $content->board()->kirbytext() ?>
</div>

<div class="text">
    <?php echo $content->team()->kirbytext() ?>
</div>
