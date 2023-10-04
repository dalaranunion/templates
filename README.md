Short library of templates using ReactJS elements (no compile)

Place bellow tags in the  beginning of your document when testing/creating
```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```
Place bellow tags when you are done testing/creating 
```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```
Bellow tag is **necessary** for babel to translate this into workable code.
```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

React Away!!!
