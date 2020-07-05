#!/bin/bash

# This script is responsible for deploying the app to the production
# server after a push via git.


# TODO:
# The index.php file needs to be updated
# The disphatch config file needs to be updated.
#   -paths
#   -dev mode

cd /var/www/vhosts/easycoffeeathome.com
sass --update /var/www/vhosts/easycoffeeathome.com/htdocs/css/scss/style.scss:/var/www/vhosts/easycoffeeathome.com/htdocs/css/style.css
sudo cp /var/www/vhosts/easycoffeeathome.com/config/easycoffeeathome.com.conf /etc/apache2/sites-available/easycoffeeathome.com.conf
sudo cp /var/www/vhosts/easycoffeeathome.com/config/easycoffeeathome.com-le-ssl.conf /etc/apache2/sites-available/easycoffeeathome.com-le-ssl.conf
sudo systemctl restart apache2
npm run build-prod

