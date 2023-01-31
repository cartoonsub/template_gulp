import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff from 'gulp-ttf2woff';

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'fonts',
                message: '<%= error.message %>',
        })))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'fonts',
                message: '<%= error.message %>',
        })))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
    //Файл стилей подключения шрифтов
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    //Проверяем, существуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function(err, fontsFiles){
        if (!fontsFiles) {
            console.log('Файлы шрифтов не найдены');
            return;
        }

        //Проверяем, существует ли файл стилей для подключения шрифтов
        if (fs.existsSync(fontsFile)) {
            console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
            return;
        }

        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
            //Записываем подключения шрифтов в файл стилей
            let fontFileName = fontsFiles[i].split('.')[0];
            if (newFileOnly == fontFileName) {
                continue;
            }

            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            switch (fontWeight.toLocaleLowerCase()) {
                case 'thin':
                    fontWeight = 100;
                    break;
                case 'extralight':
                    fontWeight = 200;
                    break;
                case 'light':
                    fontWeight = 300;
                    break;
                case 'medium':
                    fontWeight = 500;
                    break;
                case 'semibold':
                    fontWeight = 600;
                    break;
                case 'bold':
                    fontWeight = 700;
                    break;
                case 'extrabold':
                    fontWeight = 800;
                    break;
                case 'heavy':
                    fontWeight = 800;
                    break;
                default:
                    fontWeight = 400;
            }

            fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontFileName;
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}