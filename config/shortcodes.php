<?php

/*
  Add new shortcode uncommenting the line below.
  The first value is the name of shortcode. The second is the function that calls.
*/
function register_shortcodes(){
  add_shortcode('shortcode', 'shortcode_function');
}

//add_action( 'init', 'register_shortcodes');