A jquery header slider [npm based](https://www.npmjs.com/package/jq-header-slider) package to slide contents of the header ;)

## installation

```
npm i jq-header-slider
```

And:

```
window.header_slider = require('jq-header-slider');
```

## Usage

To use this library after including it run the following code

```
window.header_slider($('.card-text').first(), {
        color: '#3c7dff',          // Headers Color.
        change_rate: 13,           // How large color has to be changed.
        change_sign: -1,           // +1 or -1.
        closed_by_default: false,  // If headers must be closed by default or not.
});
```

## Author

[X4748](https://tridectet.ir/u/x4748)
