<nav class="menu" role="navigation">
    <ul class="menu-items">
        <?php foreach($pages->visible() as $page): ?>
            <li class="menu-item menu-item--<?php echo $page->slug(); ?>">
                <a class="menu-item__link <?php echo EF::nav_active_class($page); ?>"
                   href="<?php echo $page->url(); ?>">
                    <?php echo $page->title()->html(); ?>
                </a>
            </li>
        <?php endforeach ?>
    </ul>
</nav>
