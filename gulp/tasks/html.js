import fileinclude from "gulp-file-include";
import webHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(fileinclude())
        .pipe(app.plugins.replace('@img/', 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webHtmlNoSvg(),
            )
        )
        .pipe(
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': 'v',
                    'cover': 0,
                    'to': ['css', 'js']
                },
                output: {
                    'file': 'gulp/version.json',
                }
            })
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream());
}
