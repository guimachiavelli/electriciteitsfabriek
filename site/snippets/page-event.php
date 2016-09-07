<section class="site-section site-section--event">
    <header class="site-section__header">
        <h2 class="site-section__title">
            <?php echo $content->title()->html() ?>
        </h2>
    </header>

    <article class="full-event">
        <div class="full-event__column full-event__column--text">
            <header class="full-event__header">
                <time class="full-event__date">
                    <?php echo $content->eventdate(); ?>
                    <?php echo $content->time(); ?>
                </time>
                <h3 class="full-event__title">
                    <?php echo $content->title()->html(); ?>
                </h3>
                <h4 class="full-event__artists">
                    <?php echo $content->artists(); ?>
                </h4>
            </header>

            <div class="full-event__content">
                <?php echo $content->text()->html(); ?>
            </div>
        </div>
        <div class="full-event__column full-event__column--media">
            <?php echo $content->media()->kirbytext(); ?>
        </div>
    </article>
</section>

