import replace from 'gulp-replace'; // Замена строк
import plumber from 'gulp-plumber'; // Предотвращает остановку gulp при ошибке
import notify from 'gulp-notify'; // Выводит ошибки в консоль
import browserSync from 'browser-sync'; // Перезагрузка браузера
import newer from 'gulp-newer'; // Проверяет, был ли изменен файл
import gulpIf from 'gulp-if';

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: gulpIf
}