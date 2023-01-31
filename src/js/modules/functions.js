
export function isWebP() {
    function testWebP(callback) {
        let webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
    }

    testWebP(function (supports) {
        let className = supports ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}