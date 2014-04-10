<?php

/*
  Paths
*/
define('_PATH_CONFIG_', 'config');
define('_PATH_ASSETS_', 'assets/'._ENVIRONMENT_);
define('_PATH_ASSETS_IMAGES_', _PATH_ASSETS_.'/images');
define('_PATH_ASSETS_SCRIPTS_', _PATH_ASSETS_.'/scripts');
define('_PATH_ASSETS_STYLES_', _PATH_ASSETS_.'/styles');
define('_PATH_VIEWS_', 'views');

define('_ABSPATH_CONFIG_', dirname(__FILE__).'/'._PATH_CONFIG_);
define('_ABSPATH_ASSETS_', dirname(__FILE__).'/'._PATH_ASSETS_);
define('_ABSPATH_ASSETS_IMAGES_', dirname(__FILE__).'/'._PATH_ASSETS_IMAGES_);
define('_ABSPATH_ASSETS_SCRIPTS_', dirname(__FILE__).'/'._PATH_ASSETS_SCRIPTS_);
define('_ABSPATH_ASSETS_STYLES_', dirname(__FILE__).'/'._PATH_ASSETS_STYLES_);
define('_ABSPATH_VIEWS_', dirname(__FILE__).'/'._PATH_VIEWS_);

define('_URIPATH_CONFIG_', get_template_directory_uri().'/'._PATH_CONFIG_);
define('_URIPATH_ASSETS_', get_template_directory_uri().'/'._PATH_ASSETS_);
define('_URIPATH_ASSETS_IMAGES_', get_template_directory_uri().'/'._PATH_ASSETS_IMAGES_);
define('_URIPATH_ASSETS_SCRIPTS_', get_template_directory_uri().'/'._PATH_ASSETS_SCRIPTS_);
define('_URIPATH_ASSETS_STYLES_', get_template_directory_uri().'/'._PATH_ASSETS_STYLES_);
define('_URIPATH_VIEWS_', get_template_directory_uri().'/'._PATH_VIEWS_);

/*
  Timber
*/
if (class_exists('Timber')) {
  Timber::$dirname = _PATH_VIEWS_;
}
