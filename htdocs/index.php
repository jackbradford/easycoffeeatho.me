<?php

ini_set('error_reporting', E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', '/var/www/vhosts/easycoffeeathome.com.dev/error.log');

require_once '/var/www/vhosts/easycoffeeathome.com.dev/vendor/autoload.php';
require_once '/var/www/vhosts/easycoffeeathome.com.dev/src/Controllers/PublicController.php';
require_once '/var/www/vhosts/easycoffeeathome.com.dev/src/Models/Variety.php';
require_once '/var/www/vhosts/easycoffeeathome.com.dev/src/Models/Unit.php';
require_once '/var/www/vhosts/easycoffeeathome.com.dev/src/lib/DataExtractor.php';
require_once '/var/www/vhosts/easycoffeeathome.com.dev/src/lib/RecordProperty.php';
require_once '/var/www/vhosts/easycoffeeathome.com.dev/src/lib/Records.php';

use JackBradford\Disphatch\Router\Router;
use Illuminate\Database\Capsule\Manager as Capsule;

$config = '/var/www/vhosts/easycoffeeathome.com.dev/disphatch.conf.json';
$router = Router::init($config);
$router->routeAndExecuteRequest();
error_log('Done.');

