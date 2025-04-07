<?php
    $posts = [
        1 => [
            'thumbnail' => '/75th/assets/img/gray.jpg',
            'title' => 'タイトルが入りますタイトルが入ります',
            'date' => '2025.04.10 thu',
            'content_file' => 'content/1.html',
            'related_articles' => [2, 3] // Related to articles 2 and 3
        ],
        2 => [
            'thumbnail' => '/75th/assets/img/gray.jpg',
            'title' => 'タイトルが入りますタイトルが入ります 2',
            'date' => '2025.04.11 fri',
            'content_file' => 'content/2.html',
            'related_articles' => [1]
        ],
        3 => [
            'thumbnail' => '/75th/assets/img/gray.jpg',
            'title' => 'タイトルが入りますタイトルが入ります 3',
            'date' => '2025.04.12 sat',
            'content_file' => 'content/3.html',
            'related_articles' => [1, 2]
        ]
    ];
?>