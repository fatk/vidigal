<?php

function register_theme_menus() {
  register_nav_menus(
    array(
      'header-menu' => __( 'Header Menu' )
    )
  );
}

add_action( 'init', 'register_theme_menus' );
