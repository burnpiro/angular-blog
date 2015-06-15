module.exports  = {
    scripts: 'app/**/*.js',
    styles: ['./app/**/*.css', './app/**/*.scss'],
    images: './app/images/**/*',
    index: './app/index.html',
    partials: ['app/**/*.html', '!app/index.html'],
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