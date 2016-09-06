<section class="site-section site-section--default">
    <header class="site-section__header">
        <h2 class="site-section__title">
            <?php echo $content->title()->html(); ?>
        </h2>
    </header>

    <div class="site-section__default-content">
        <?php echo $content->text()->kirbytext(); ?>
    </div>
</section>
