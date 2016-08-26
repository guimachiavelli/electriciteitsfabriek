<div class="text">
  <h2><?php echo $content->title()->html() ?></h2>
  <?php echo $content->text()->kirbytext() ?>
</div>

<ul class="">
    <?php $events = page('agenda')->children(); ?>
    <?php $events = $events->filterBy('archived', '==', '1'); ?>
    <?php foreach($events as $event): ?>
        <?php snippet('archived-event', array('event' => $event)); ?>
  <?php endforeach ?>
</ul>

