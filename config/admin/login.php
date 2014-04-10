<?php

/*
 * Change login page style adding your custom css
 */
function add_login_form_styles() {
  echo <<<HTML
    <style>

    </style>

HTML;
}
//add_action("login_head", "add_login_form_styles");


/*
 * Change title for login screen uncommenting the line below
 */
// add_filter('login_headertitle', create_function(false,"return get_bloginfo('site');"));

/*
 * Change url for login screen uncommenting the line below
 */
// add_filter('login_headerurl', create_function(false,"return home_url();"));