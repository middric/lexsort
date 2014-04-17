if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    var removeArticles = function(string) {
            if (!articleRegex) {
                articleRegex = new RegExp(
                    '^(' + articles.join('|') + ') (.*)', 'gi'
                );
            }
            return string.replace(/^[^a-z0-9]*/gi, '').replace(articleRegex, '$2');
        },
        articles = ['a', 'an', 'the'],
        articleRegex;

    return {
        getArticles: function () {
            return articles;
        },
        setArticles: function (values) {
            articles = values;
            articleRegex = null;
        },
        sort: function(strings, key) {
            var result = strings.sort(function(a, b) {
                var cleanA, cleanB;
                if (typeof key === 'function') {
                    a = key(a);
                    b = key(b);
                } else if (typeof key === 'string') {
                    a = a[key];
                    b = b[key];
                }
                cleanA = removeArticles(a);
                cleanB = removeArticles(b);

                if (cleanA < cleanB) {
                    return -1;
                } else if (cleanA === cleanB) {
                    return 0;
                }
                return 1;
            });

            return result;
        }
    };
});
