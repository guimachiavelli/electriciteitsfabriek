<div class="text">
    <h1><?php echo $content->title()->html() ?></h1>
    <?php echo $content->text()->kirbytext() ?>
</div>

<ul class="">
    <?php $events = page('agenda')->children(); ?>
    <?php $events = $events->filterBy('archived', '==', '0'); ?>
    <?php foreach($events as $event): ?>
        <?php snippet('event', array('event' => $event)); ?>
    <?php endforeach ?>
</ul>
