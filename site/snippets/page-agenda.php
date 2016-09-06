<section class="site-section site-section--agenda">
    <header class="site-section__header">
        <h2 class="site-section__title">
            <?php echo $content->title()->html() ?>
        </h2>
    </header>

    <ol class="events">
        <?php $events = page('agenda')->children(); ?>
        <?php $events = $events->filterBy('archived', '==', '0'); ?>
        <?php foreach($events as $event): ?>
            <?php snippet('event', array('event' => $event)); ?>
        <?php endforeach ?>
    </ol>
</section>
