<li>
    <h3>
        <a href="<?php echo $event->url(); ?>">
            <time>
                <?php echo $event->eventdate(); ?>
            </time>
            <span>
                <?php echo $event->title()->html(); ?>
            </span>
            <span>
                <?php echo $event->artists(); ?>
            </span>
        </a>
    </h3>
</li>
