<section class="site-section site-section--contact">
    <header class="site-section__header">
        <h2 class="site-section__title">
            <?php echo $content->title()->html(); ?>
        </h2>
    </header>

    <div class="contact">
        <div class="contact__column contact__column--address">
            <?php echo $content->address()->kirbytext(); ?>

            <?php if ($content->instagram()->isNotEmpty()): ?>
                <a class="contact__social" href="<?php echo $content->instagram()->toURL(); ?>">
                    <i class="i i--instagram"></i>
                    <b class="i__text-replacement">Instagram</b>
                </a>
            <?php endif; ?>

            <?php if ($content->facebook()->isNotEmpty()): ?>
                <a class="contact__social" href="<?php echo $content->twitter()->toURL(); ?>">
                    <i class="i i--facebook"></i>
                    <b class="i__text-replacement">Twitter</b>
                </a>
            <?php endif; ?>

        </div>

        <div class="contact__column contact__column--board">
            <?php echo $content->board()->kirbytext(); ?>
        </div>

        <div class="contact__column contact__column--team">
            <?php echo $content->team()->kirbytext(); ?>
        </div>
    </div>
</section>
