# Angular Blog

Blog based on Angular 1.4 with ui router. Project has his own gulp build tasks which creates dev dist and prod dist. In contains also browser-sync live reload and own server to serve files without any external server.

## How to install?

#### Requirements

npm

    npm install -g bower gulp



#### And follow instructions

First you need to clone repo

    git clone https://github.com/burnpiro/angular-blog.git

inside ./angular-blog folder run:

install npm packages

    npm install
    bower install

if you want do enable autorebuild please run

    gulp watch-dev


## How about structure

Whole project structure is based on new styleguide from angular team (component based app). It is required (it can be changed) be New Router. See angular website to learn more

##To production build:

Accidently production build was broken (if someone want to fix it feel free to do it :) ) To generate production build please do as follow:

    
    gulp clean-build-app-prod
    gulp build-app-views-prod
    gulp build-app-index-prod
    gulp build-app-scripts-prod
    gulp build-vendor-scripts-prod
    
Then just change config in serverConfig.js and call

    
    node server.js
    
