<li class="event event--archived">
    <header class="event__header">
        <a class="event__link event__link--archived" href="<?php echo $event->url(); ?>">
            <time class="event__date">
                <?php echo $event->eventdate(); ?>
            </time>
            <h3 class="event__title event__title--archived">
                <?php echo $event->title()->html(); ?>
            </h3>
            <h4 class="event__author">
                <?php echo $event->artists(); ?>
            </h4>
        </a>
    </header>
</li>
