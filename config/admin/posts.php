<?php

/*
 * Create here your custom post types. You can both use the WordPress register_post_type()
 * function, or the Wordless new_post_type() helper.
 */
function add_custom_post_types() {
  new_post_type("portfolio_work", array('title', 'editor'));
}

/*
 * Create here your custom post types. You can both use the WordPress register_taxonomy()
 * function, or the Wordless new_taxonomy() helper.
 */
function add_custom_taxonomies() {
  new_taxonomy("work_type", array('portfolio_work'));
}

//add_action('init', 'add_custom_post_types');
//add_action('init', 'add_custom_taxonomies');


