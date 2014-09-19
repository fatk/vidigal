<?php

/*
    Config functions files inclusion
*/

require_once(dirname(__FILE__).'/config.php');

$files = array(
    'admin/login',
    'admin/panel',
    'admin/posts',
    'admin/widgets',
    'hooks',
    'images',
    'shortcodes',
    'menus'
  );

foreach ($files as $file) {
  $path = _ABSPATH_CONFIG_.'/'.$file.'.php';

  if (file_exists($path)) {
    require_once($path);
  }
}

/*
    Theme-wide functions
*/

function _render($tpl, $vars = array()) {
    // Timber installation check.
    if (!class_exists('Timber')){
      echo 'This theme requires the Timber plugin.';
      return;
    }

    $context = array_merge(Timber::get_context(), $vars);

    return Timber::render($tpl, $context);
}

function add_to_context($data){
    global $post;

    // Gets site-wide Options (ACF)
    //$data['options'] = get_fields('options');

    // Share $_GET and $_POST with twig.
    //$data['request'] = array('get' => $_GET, 'post' => $_POST);

    // Add current post to context
    if (is_object($post)) {
        $data['post'] = new TimberPost();
    }

    // Retrieve menus
    $menus = get_registered_nav_menus();
    if (is_array($menus)) {
        $data['menus'] = array();
        foreach ($menus as $slug => $name) {
            $data['menus'][$slug] = new TimberMenu($slug);
        }
    }

    return ($data);
}

add_filter('timber_context', 'add_to_context');
