module.exports = function isPlainObj(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
