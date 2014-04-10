<?php

function register_widgets(){

  register_sidebar( array(
    'name' => __( 'Sidebar' ),
    'id' => 'main-sidebar',
    'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
    'after_widget' => '</li>',
    'before_title' => '<h3 class="widget-title">',
    'after_title' => '</h3>',
  ) );

}

//add_action( 'widgets_init', 'register_widgets' );