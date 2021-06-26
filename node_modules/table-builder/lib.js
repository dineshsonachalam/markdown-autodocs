var isPlainObj = require('./3thparty/isplainobj');
var id = function id(argument) { return argument; };
var toPairs = require('./3thparty/topairs');
var tag = require('./3thparty/buildtag');
var slug = require('./3thparty/slug');

var lib = module.exports = {
    /**
     * finds the tbody data and extracts it to an array if we were passed an object,
     * and then iterates the the row data for links
     *
     * @param data mixed
     * @return bool
     */
    isDataCorrect: function (data) {
        return data instanceof Array && (data.length === 0 || isPlainObj(data[0]));
    },

    isCellValCorrect: function (celldata) {
        // we only accept strings, or numbers as arguments
        return typeof celldata !== 'string' && typeof celldata !== 'number';
    },

    prismData: function (rows, headers, prisms) {
        return rows.map(function (row) {
            return headers.map(function (header) {
                var headerTitle = header[1], columnName = header[0];
                var cellValue = (prisms[columnName] || id)(row[columnName], row);
                return [columnName, isPlainObj(cellValue) ? cellValue : {
                    presentation: cellValue,
                    raw: row[columnName]
                }];
            });
        });
    },

    buildBody: function (rowsGroups, groupValueFn, totalsValueFn) {
        return tag('tbody', {}, rowsGroups.map(function (group) {
            var rows = group[1], groupTitle = group[0];
            if (!rows) return '';
            return lib.buildGroupTitle(rows, groupTitle, groupValueFn, totalsValueFn) + lib.buildRows(rows);
        })
        .join('\n'));
    },

    buildGroupTitle: function buildGroupTitle(rows, groupTitle, groupValueFn, totalsValueFn) {
        if (!groupTitle) return '';

        var groupTitleValue = groupValueFn(groupTitle, rows.length, lib.getTotals(rows[0], rows, totalsValueFn).value());
        var groupTitleCell = tag('td', { class: 'group-name-td', colspan: String(rows[0].length) }, groupTitleValue);

        return tag('tr', {}, groupTitleCell);
    },

    buildRows: function buildRows(rows) {
        return rows.map(function (row) {
            return row.map(function (cell) {
                var cellValue = cell[1], colName = cell[0];
                var className = slug(colName) + '-td ' + (isNaN(+(cellValue.raw)) ? 'td_text' : 'td_num');
                return tag('td', {'class': className}, cellValue.presentation);
            })
            .join('');
        })
        .map(function (tr, i) {
            var trId = rows[i][0][0] === '__vert_header__' && rows[i][0][1];
            var trAttrs = trId ? {'class': slug(trId.raw) + '-tr', 'data-id': slug(trId.raw)} : {};
            return tag('tr', trAttrs, tr);
        })
        .join('\n');
    },

    /**
     * takes an array of and produces <thead><tr><th> ... </th></tr></thead> with one th
     * for each item of the array
     *
     * @param {Object|String[][]} headers - {k:v,,,} or [[k,v],,,]
     */
    buildHeaders: function (headers) {
        var content = headers.map(function (header) {
            var headerContent = header[1], headerKey = header[0];
            return tag('th', {'class': slug(headerKey) + '-th'}, headerContent);
        });
        return '<thead><tr>' + content.join('') + '</tr></thead>';
    },

    buildFooter: function (headers, rows, totalsFn) {
        var content = lib.getTotals(headers, rows, totalsFn).map(function (tdValue) {
            return tag('td', {}, tdValue);
        });
        // check if there is a totals function, only return footer if required
        if (Object.keys(totalsFn) < 1) {
          return '';
        } else {
          return '<tfoot><tr>' + content.join('') + '</tr></tfoot>';
        }
    },

    /**
     *
     * @param headers
     * @param rows
     * @param totalsFnCollection
     */
    getTotals: function (headers, rows, totalsFnCollection) {
        return headers.map(function (header) {
            var columnName = header[0];
            var columnCells = rows.map(function(row) {
                return row.reduce(function (res, cell) { return cell[0] === columnName ? cell[1].raw : res; });
            });
            var calcTotal = function () { return ''; }

            // same totals for all headers
            if (totalsFnCollection['*'] && columnName !== '__vert_header__') calcTotal = totalsFnCollection['*'];
            else if (totalsFnCollection[columnName]) calcTotal = totalsFnCollection[columnName];
            return calcTotal(columnCells, rows)
        });
    },

    /**
     *
     * @param data
     * @param groupingField
     * @param unnamedSubstitution
     */
    groupData: function (data, groupingField, unnamedSubstitution) {
        var groupedData = {};

        if (groupingField) {
            data.forEach(function (item) {
                var group = groupedData[item[groupingField].presentation] || [];
                group.push(item);
                groupedData[item[groupingField].presentation] = group;
                delete item[groupingField];
            });
        } else {
            groupedData[unnamedSubstitution || ''] = data;
        }

        return toPairs(groupedData);
    },

    joinVertHeaders: function joinVertHeaders(data, vertHeaders) {
        if (!vertHeaders) return data;

        var joinVerHeaderToRow = function(row, i) {
            return [['__vert_header__', {
                raw: vertHeaders[i],
                presentation: vertHeaders[i]
            }]].concat(row.slice(1))
        };

        return data.map(joinVerHeaderToRow);
    },

    deletedByKey: function (pairs, key) {
        return pairs.filter(function(tuple) { return tuple[0] !== key; })
    }
};
