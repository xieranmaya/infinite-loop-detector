# Infinite Loop Detector

## A mini library to detect infinite loop in Javascript

## Usage

```js
var code = `
for (;;) {
  console.log(1)
}`

code = infiniteLoopDetector.wrap(code)
// Can only wrap plain code string, no function or other things, or it will throw
// There is also a `unwrap` method to restore the code to the previous shape

try {
  eval(code)
} catch(e) {
  if (e.type === 'InfiniteLoopError') {
    console.log('infinite loop detected')
  }
}
```
## Related blog post


