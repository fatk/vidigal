<?php

/*
 * Enable WordPress post thumbnail uncommenting the line below and specifing the post types
 */
function add_thumbnails_support() {
  add_theme_support('post-thumbnails', array('page', 'post'));
}

//add_action('after_setup_theme', 'add_thumbnails_support');

/*
 * Add additional image sizes here
 */
function add_custom_image_sizes() {
  add_image_size("social-share", 1200, 630, true);
  add_image_size("gallery-large", 1200, 800, false);
  add_image_size("gallery-medium", 440, 290, true);
  add_image_size("gallery-thumb", 100, 60, true);
}

add_action('after_setup_theme', 'add_custom_image_sizes');
