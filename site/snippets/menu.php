<nav class="menu" role="navigation">
    <ul class="menu-items">
        <?php foreach($pages->visible() as $link): ?>
            <li class="menu-item menu-item--<?php echo $link->slug(); ?>">
                <a class="menu-item__link <?php echo EF::nav_active_class($link, $page); ?>"
                   href="<?php echo $link->url(); ?>">
                    <?php echo $link->title()->html(); ?>
                </a>
            </li>
        <?php endforeach ?>
    </ul>
</nav>
