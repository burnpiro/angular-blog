module.exports  = {
    scripts: ['app/**/*.js', '!./app/plugins/**/*'],
    styles: ['./app/**/*.css', './app/**/*.scss', '!./app/plugins/**/*'],
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
        './node_modules/angular/angular.js',
        './node_modules/angular-new-router/dist/router.es5.js'
    ]
};