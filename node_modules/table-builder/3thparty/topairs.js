module.exports = function toPairs(obj) {
    var pairs = [];
    for (var i in obj) {if (obj.hasOwnProperty(i)) {
        pairs.push([i, obj[i]]);
    }}
    return pairs;
};
