module.exports = (function Slug () {
    var map = {"ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"","б":"b","ю":"yu"}
    return function(word) {
        return word.split('').map(function(char){
            var lo = char.toLowerCase();
            return lo in map ? map[lo] : (lo >= 'a' && lo <= 'z' || lo >= '0' && lo <= '9' ? lo : '-');
        }).join('').replace(/-+/g, '-');
    }
})();
