var gulp = require('gulp');

// Minimal development build.
gulp.task('build', ['index.html', 'js', 'css', 'bower-components:assets:link', 'assets:link']);

// CI testing build, with coverage maps.
gulp.task('build:coverage', ['index.html', 'js:coverage', 'css', 'bower-components:assets:link', 'assets:link']);

// Production build before critical CSS.
gulp.task('build:dist:base', ['index.html:dist', 'js:dist', 'css:dist', 'bower-components:assets:copy', 'assets:copy']);

// Final production build
gulp.task('build:dist', ['css:critical:replace']);
