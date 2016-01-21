module.exports  = {
    scripts: ['app/**/*.js', './app/plugins/*.js'],
    styles: ['./app/styles/**/*.scss', '!./app/plugins/**/*'],
    images: './app/images/**/*',
    index: './app/index.html',
    folders: ['./app/plugins/**/*'],
    partials: ['app/**/*.html', '!app/index.html', '!./app/plugins/**/*'],
    distDev: './dist.dev',
    distProd: './dist.prod',
    distScriptsProd: './dist.prod/scripts',
    scriptsDevServer: 'devServer/**/*.js',
    fonts: './app/fonts/**/*.*',
    nodeModules: [
        //'./node_modules/angular/angular.js',
        //'./node_modules/angular-new-router/dist/router.es5.js'
    ],
    bowerComponents: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/lodash/lodash.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-file-upload/angular-file-upload.min.js',
        './bower_components/angular-jwt/dist/angular-jwt.min.js',
        './bower_components/angular-toastr/dist/angular-toastr.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './bower_components/restangular/dist/restangular.min.js',
        './bower_components/jquery.cookie/jquery.cookie.js',
        './bower_components/jquery-placeholder/jquery.placeholder.js',
        './bower_components/fastclick/lib/fastclick.js',
        './bower_components/foundation/js/foundation.min.js',
        './bower_components/modernizr/modernizr.js'
    ]
};