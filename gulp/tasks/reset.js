import {deleteAsync} from 'del';
export const reset = () => {
    return deleteAsync(app.path.clean, '!app.path.buildFolder');
}

// #todo - удаление всех файлов это неправильно, синхронизация логичнее
// #todo - так же модуль удаляет папку целиком, а не только файлы