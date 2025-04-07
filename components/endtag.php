    <!-- @script -->
    <script src="/75th/assets/js/libs.js"></script>
    <?php 
        $current_url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $home_pages = ['/', '/index.php', '/75th/', '/75th/index.php'];
    ?>
    <?php if (in_array($current_url, $home_pages)): ?>
    <script src="/75th/assets/js/animation.js"></script>
    <?php endif; ?>
    <script src="/75th/assets/js/main.min.js"></script>
</body>

</html>