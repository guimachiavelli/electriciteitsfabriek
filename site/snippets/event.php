<li>
    <h3>
        <a href="<?php echo $event->url(); ?>">
            <time>
                <?php echo $event->eventdate(); ?>
                <?php echo $event->time(); ?>
            </time>
            <span>
                <?php echo $event->artists(); ?>:
                <?php echo $event->title()->html(); ?>
            </span>
        </a>
    </h3>

    <p>
        <?php echo $event->text()->ef_excerpt(); ?>
        <a href="<?php echo $event->url(); ?>">more</a>
    </p>
</li>
