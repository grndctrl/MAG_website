<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */
$context = Timber::context();
$timber_post = Timber::query_post();
$context['post'] = $timber_post;

if ($timber_post->post_type == 'project') {
  // $args = array(
  //   'post_type' => 'project'
  // );
  // $context['projects'] = new Timber\PostQuery($args);

  $index = 0;
  $currIndex = 0;
  foreach ($context['projects'] as $project) {
    if ($timber_post->ID == $project->ID) {
      $currIndex = $index;
    }
    
    $index++;
  }

  $prevIndex = $currIndex - 1;
  $nextIndex = $currIndex + 1;

  if ($prevIndex < 0) {
    $prevIndex = sizeof($context['projects']) - 1;
  }

  if ($nextIndex > sizeof($context['projects']) - 1) {
    $nextIndex = 0;
  }
  $context['prev_project'] = $context['projects'][$prevIndex];
  $context['next_project'] = $context['projects'][$nextIndex];
}

$templates = array( 'posts/' . $timber_post->ID . '.html.twig', 'posts/' . $timber_post->post_type . '.html.twig', 'posts/post.html.twig' );



Timber::render($templates, $context);
