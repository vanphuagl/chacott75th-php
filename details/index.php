<?php
    require_once __DIR__ . '/../data.php';
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

    if (isset($posts[$id])) {
        $thumb_articles = $posts[$id]['thumbnail'];
        $title_articles = $posts[$id]['title'];
        $date_articles = $posts[$id]['date'];
        $content_file = $posts[$id]['content_file'];
        $related_ids = $posts[$id]['related_articles'] ?? [];

        if (file_exists("../$content_file")) {
            $content = file_get_contents("../$content_file");
        } else {
            $content = 'No content found.';
        }
    } else {
        $thumb_articles = '';
        $title_articles = 'No posts found';
        $date_articles = 'No date found';
        $content = 'The article does not exist.';
    }

    // Get list of related posts based on related_ids
    $related_articles = [];
    foreach ($related_ids as $related_id) {
        if (isset($posts[$related_id])) {
            $related_articles[$related_id] = $posts[$related_id];
        }
    }
?>
<?php 
    $title_page = $title_articles; 
    $ogimg_page = $thumb_articles;
?>

<?php require __DIR__ . '/../components/header.php' ?>

    <!-- @main -->
    <main class="detailspage" id="detailspage">
        <!-- detail// -->
        <section class="detail">
            <div class="detail_container">
                <div class="detail_inner">
                    <div class="detail_entry">
                        <div class="detail_heading">
                            <h2><?php echo $title_articles; ?></h2>
                            <p><?php echo $date_articles; ?></p>
                        </div>
                        <figure class="detail_thumb">
                            <img class="lazy" data-src="<?php echo $thumb_articles; ?>" alt="<?php echo $title_articles; ?>" width="980"
                                height="654" loading="lazy" draggable="false">
                        </figure>
                        <div class="detail_content">
                            <?php echo $content; ?>
                        </div>
                    </div>
                    <div class="detail_controls">
                        <a href="/75th/#list">記事一覧に戻る</a>
                    </div>
                </div>
                <?php if (!empty($related_articles)): ?>
                <div class="detail_related">
                    <div class="detail_articles">
                        <?php require __DIR__ . '/../components/related-articles.php' ?>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </section>
        <!-- detail// -->
    </main>
    <!-- @@main -->

<?php require __DIR__ . '/../components/footer.php' ?>

<?php require __DIR__ . '/../components/endtag.php' ?>