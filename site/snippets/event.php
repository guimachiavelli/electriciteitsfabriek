<li class="event">
    <header class="event__header">
        <a class="event__link" href="<?php echo $event->url(); ?>">
            <time class="event__date">
                <?php echo $event->eventdate(); ?>
                <?php echo $event->time(); ?>
            </time>
            <h3 class="event__title">
                <?php echo $event->artists(); ?>:
                <?php echo $event->title()->html(); ?>
            </h3>
        </a>
    </header>

    <p class="event__excerpt">
        <?php if ($event->customexcerpt()->empty()): ?>
            <?php echo $event->text()->ef_excerpt(); ?>
        <?php else: ?>
            <?php echo $event->customexcerpt()->ef_excerpt(); ?>
        <?php endif; ?>
        <a class="event__more" href="<?php echo $event->url(); ?>">more</a>
    </p>
</li>
