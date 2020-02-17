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

$args = array(
    'post_type' => 'project',
    'posts_per_page' => 8,
    'paged' => $paged
  );
$paged_projects = new Timber\PostQuery($args);
$context['paged_projects'] = $paged_projects;
$context['paged'] = $paged;

$timber_post = new Timber\Post();
$context['post'] = $timber_post;

$templates = array( 'pages/' . $timber_post->post_name . '.html.twig', 'pages/page.html.twig' );

Timber::render($templates, $context);