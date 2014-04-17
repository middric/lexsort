lexsort
=======
![](https://travis-ci.org/middric/lexsort.svg?branch=master)

Sort an array of strings, taking into account definite and indefinite articles. Basically, sort some strings and ignore any instance of the words: 'a', 'an', and 'the' at the beginning of the string.

Configurable so that the user can define the relevant articles for their language.



## Install
```
npm install lexsort
```

## Examples
```js
lexsort.sort(['the zebra', 'the aardvark', 'monkey']); //=> ['the aardvark', 'monkey', 'the zebra']

lexsort.sort([
    { name: 'the zebra' },
    { name: 'an aardvark' },
    { name: 'a monkey' }
], 'name'); //=> ['an aardvark', 'a monkey', 'the zebra']

lexsort.sort([
    { name: 'the zebra' },
    { name: 'an aardvark' },
    { name: 'a monkey' }
], function(a) {
    return a.name;
}); //=> ['an aardvark', 'a monkey', 'the zebra']

lexsort.setArticles(['the', 'a', 'an']);
lexsort.sort(['the zebra', 'an aardvark', 'a monkey']); //=> ['an aardvark', 'a monkey', 'the zebra']

```
