#!/bin/bash

set -e

unset GIT_DIR

./node_modules/bower/bin/bower --allow-root --config.interactive=false install

if [ "$NODE_ENV" == "production" ]; then
    ./node_modules/gulp/bin/gulp.js clean
    ./node_modules/gulp/bin/gulp.js build:dist
fi
