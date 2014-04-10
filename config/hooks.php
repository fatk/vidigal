<?php

// This function include screen.css in wp_head() function
function register_styles() {
    wp_register_style("joyride-fonts", 'http://fonts.googleapis.com/css?family=Ubuntu:400,700,400italic', false, false);
    wp_enqueue_style("joyride-fonts");

    wp_register_style("screen", _URIPATH_ASSETS_STYLES_.'/css/screen.css', false, false);
    wp_enqueue_style("screen");
}

add_action('wp_enqueue_scripts', 'register_styles');

// This function include jquery and application.js in wp_footer() function
function register_scripts() {
    wp_register_script("application", _URIPATH_ASSETS_SCRIPTS_.'/main.js', array(), false, true);
    wp_enqueue_script("application");
    wp_register_script("modernizr", '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.7.1/modernizr.min.js' , array(), true, false);
    wp_enqueue_script("modernizr");
}

function deregister_scripts() {
    wp_deregister_script('jquery');
    wp_register_script("jquery", '', array());
}

add_action('wp_enqueue_scripts', 'register_scripts');
add_action('wp_enqueue_scripts', 'deregister_scripts');

function register_devscripts() {
    $baseUrl = _URIPATH_ASSETS_SCRIPTS_;

    echo <<<HTML
<script src="{$baseUrl}/vendor/requirejs/require.js"></script>
<script>require.config({baseUrl:'{$baseUrl}'});</script>

HTML;
}

if (_ENVIRONMENT_ === 'dev') {
    add_action('wp_footer', 'register_devscripts');
}

// Cleans up the <head>
function remove_head_links() {
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'start_post_rel_link', 10, 0 );
    remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
    remove_action('wp_head', 'parent_post_rel_link', 10, 0);
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
}

add_action('init', 'remove_head_links');

// Removes Wordpress version query parameter from styles and scripts
function remove_wp_ver_css_js($src) {
    return remove_query_arg('ver', $src);
}

add_filter( 'style_loader_src', 'remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'remove_wp_ver_css_js', 9999 );
