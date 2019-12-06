<?php
/**
 * Template Name: Page
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

global $paged;
if (!isset($paged) || !$paged){
    $paged = 1;
}

$context = Timber::context();
$timber_post = new Timber\Post();
$context['post'] = $timber_post;

if ($timber_post->post_name == 'projecten') {
  $args = array(
    'post_type' => 'project',
    'posts_per_page' => 8,
    'paged' => $paged
  );
  $context['projects'] = new Timber\PostQuery($args);
}

$templates = array( 'pages/' . $timber_post->post_name . '.html.twig', 'pages/page.html.twig' );

Timber::render($templates, $context);