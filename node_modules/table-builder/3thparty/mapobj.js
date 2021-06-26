module.exports = function mapObj(obj, map) {
    var res = [];
    for(var i in obj) { if (obj.hasOwnProperty(i)) {
        res.push(map(obj[i], i));
    }}
    return res;
};
