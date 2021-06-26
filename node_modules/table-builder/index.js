var TableBuilder = (function () {
    var
        TableBuilder,
        mapObj = require('./3thparty/mapobj'),
        toPairs = require('./3thparty/topairs'),
        tag = require('./3thparty/buildtag'),
        isPlainObj = require('./3thparty/isplainobj'),
        lib = require('./lib'),
        id = function id(argument) { return argument; };

    /**
     * @param attributes object
     * example attributes object:
     *
     *  {
     *      'class' : 'table table-striped',
     *      'data-payload' : '#qw-312'
     *  }
     *
     * structured this way so we can more easily add other options in the future without
     * breaking existing implementations
     * @param caption
     */
    TableBuilder = function (attributes, caption) {
        this.attributes = attributes;
        this.headers = null;
        this.data = [];
        this.tableHtml = null;
        this.prisms = {}; // callback pre-processor collection
        this.totals = {}; // callback footer total record processors collections
        this.group = {field: '', fn: id}; // callback data group
        this.caption = caption;
    };

    TableBuilder.prototype.setPrism = function (name, fn__pattern) {
        var setPrism = (function (name) { this.prisms[name] = fn__pattern; }).bind(this);
        [].concat(name).forEach(setPrism);

        return this;
    };

    TableBuilder.prototype.setTotal = function (name, fn) {
        var names = Array.isArray(name) ? name : [name],
            this_ = this;

        names.forEach(function(name) {
            this_.totals[name] = fn;
        });

        return this;
    };

    /**
     *
     * @param field string
     * @param fn function
     * @return {exports}
     */
    TableBuilder.prototype.setGroup = function (field, fn) {
        this.group.field = field;
        this.group.fn = fn || id;

        return this;
    };

    /**
     * @param headers
     * @return {TableBuilder}
     */
    TableBuilder.prototype.setHeaders = function (headers) {
        this.headers = isPlainObj(headers) ? toPairs(headers) : headers;

        return this;
    };

    /**
     * @param {String} header - horisontal header title
     * @param {String[]} headers - vertical headers
     * @return {TableBuilder}
     */
    TableBuilder.prototype.setVertHeaders = function (headerTitle, headers) {
        this.vertHeaders = headers;
        this.headers = [['__vert_header__', headerTitle]].concat(this.headers);

        return this;
    };

    /**
     * @param data
     * @returns {TableBuilder}
     */
    TableBuilder.prototype.setData = function (data) {
        if (!data || !data.length) {
            this.data = [];
            this.tbody = '';
            return this;
        }
        if (!lib.isDataCorrect(data)) {
            throw ('invalid format - data expected to be empty, or an array of arrays.');
        }
        if (!this.headers) {
            throw ('invalid format - headers expected to be not empty.');
        }

        this.data = lib.prismData(data, this.headers, this.prisms);

        this.data = lib.joinVertHeaders(this.data, this.vertHeaders);

        // group data
        data = lib.groupData(this.data, this.group.field, this.caption);
        if (this.group.field) {
            this.headers = lib.deletedByKey(this.headers, this.group.field);
        }

        this.tbody = lib.buildBody(data, this.group.fn, this.totals);

        return this;
    };

    /**
     * Output the built table
     *
     * @return string
     */
    TableBuilder.prototype.render = function () {
        if (!this.data.length) {
            return '';
        }
        this.thead = lib.buildHeaders(this.headers);
        this.tfoot = lib.buildFooter(this.headers, this.data, this.totals);
        var guts = this.thead + this.tbody + this.tfoot;

        // table is already built and the user is requesting it again
        if (this.tableHtml) {
            return this.tableHtml;
        }

        this.tableHtml = tag('table', this.attributes, guts);

        return this.tableHtml;
    };

    return TableBuilder;
}());

if (typeof module !== 'undefined') module.exports = TableBuilder;
else if (typeof window !== 'undefined') window.TableBuilder = TableBuilder;
