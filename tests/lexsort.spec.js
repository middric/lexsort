var lexsort = require('../lexsort');

describe('lexsort', function () {
    it('can sort an array of strings', function () {
        var result = lexsort.sort(['c', 'b', 'a']);
        expect(result).toEqual(['a', 'b', 'c']);
    });

    it('can sort ignoring "the"', function () {
        var result = lexsort.sort(['the zebra', 'the aardvark', 'monkey']);
        expect(result).toEqual([
            'the aardvark',
            'monkey',
            'the zebra'
        ]);
    });

    it('can ignore all articles in english', function () {
        var defaults = lexsort.getArticles();
        lexsort.setArticles(['the', 'an', 'a'])
        var result = lexsort.sort(['the zebra', 'an aardvark', 'a monkey']);
        expect(result).toEqual([
            'an aardvark',
            'a monkey',
            'the zebra'
        ]);
        lexsort.setArticles(defaults)
    });

    it('can accept user defined articles to ignore', function () {
        expect(lexsort.getArticles()).toEqual(['the']);
        lexsort.setArticles(['a', 'an', 'the', 'y', 'yr', 'na']);
        expect(lexsort.getArticles()).toEqual(['a', 'an', 'the', 'y', 'yr', 'na']);
    });

    it('uses user defined articles', function () {
        var result = lexsort.sort(['y zebra', 'yr aardvark', 'na monkey']);
        expect(result).toEqual([
            'yr aardvark',
            'na monkey',
            'y zebra'
        ]);
    });

    it('can sort an array of objects', function () {
        var result = lexsort.sort([
            { name: 'the zebra' },
            { name: 'an aardvark' },
            { name: 'a monkey' }
        ], 'name');

        expect(result).toEqual([
            { name: 'an aardvark' },
            { name: 'a monkey' },
            { name: 'the zebra' }
        ]);
    });

    it('can sort an array using a getter function', function () {
        var result = lexsort.sort([
            { name: 'the zebra' },
            { name: 'an aardvark' },
            { name: 'a monkey' }
        ], function(a) {
            return a.name;
        });

        expect(result).toEqual([
            { name: 'an aardvark' },
            { name: 'a monkey' },
            { name: 'the zebra' }
        ]);
    });

    it('ignores non alpha characters at the beginning of a string', function () {
        var result = lexsort.sort(['   the zebra', '...the aardvark', '!@£monkey']);
        expect(result).toEqual([
            '...the aardvark',
            '!@£monkey',
            '   the zebra'
        ]);
    });

    it('treats non alphanumeric characters as spaces within the string', function () {
        lexsort.setArticles(['the']);
        var result = lexsort.sort([
            'e-monkey',
            'the/zebra',
            'e@aardvark'
        ]);

        expect(result).toEqual([
            'e@aardvark',
            'e-monkey',
            'the/zebra'
        ]);
    });

    it('should place completed titles above longer titles with matching start', function () {
        lexsort.setArticles(['the']);
        var result = lexsort.sort([
            'I am a long title which should be below',
            'I am a long title'
        ]);

        expect(result).toEqual([
            'I am a long title',
            'I am a long title which should be below'
        ]);
    });

    it('should place completed words above longer words with matching start', function () {
        lexsort.setArticles(['the']);
        var result = lexsort.sort([
            'abc',
            'a b c'
        ]);

        expect(result).toEqual([
            'a b c',
            'abc'
        ]);
    });
});
