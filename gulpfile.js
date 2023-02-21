import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: false,
    path: path,
    gulp: gulp,
    plugins: plugins
}

if (app.isBuild == false) {
    app.isDev = true;
    console.log('Запущен в режиме разработки');
}

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss, fixCssRename } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprites } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';


const css = gulp.series(scss, fixCssRename);
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, css, js, images));
const serverAndWatcher = gulp.parallel(server, watcher);
const deployAndZip = gulp.series(reset, mainTasks, zip);
const deployAndFtp = gulp.series(reset, mainTasks, ftp);

const dev = gulp.series(reset, mainTasks, serverAndWatcher);
const build = gulp.series(reset, mainTasks);

function watcher() {
    gulp.watch(app.path.watch.files, copy);
    gulp.watch(app.path.watch.html, html);
    gulp.watch(app.path.watch.scss, css);
    gulp.watch(app.path.watch.js, js);
    gulp.watch(app.path.watch.images, images);
}

if (app.isBuild) {
    console.log('Запущен в режиме сборки');
    gulp.task('default', build);
} else {
    gulp.task('default', dev);
}

export { svgSprites };
gulp.task('svgSprite', svgSprites);

export { deployAndZip };
gulp.task('zip', deployAndZip);

export { deployAndFtp };
gulp.task('ftps', deployAndFtp);

export { fixCssRename };
gulp.task('fixcss', fixCssRename);