var infiniteLoopDetector = (function() {
  var map = {}

  // define an InfiniteLoopError class
  function InfiniteLoopError(msg, type) {
    Error.call(this ,msg)
    this.type = 'InfiniteLoopError'
  }
  
  function infiniteLoopDetector(id) {
    if (id in map) { // 非首次执行，此处可以优化，性能太低
      if (Date.now() - map[id] > 1000) {
        delete map[id]
        throw new Error('Loop runing too long!', 'InfiniteLoopError')
      }
    } else { // 首次运行，记录循环开始的时间。之所有把非首次运行的判断写在前面的if里是因为上面会执行更多次
      map[id] = Date.now()
    }
  }

  infiniteLoopDetector.wrap = function(codeStr) {
    if (typeof codeStr !== 'string') {
      throw new Error('Can only wrap code represented by string, not any other thing at the time! If you want to wrap a function, convert it to string first.')
    }
    // this is not a strong regex, but enough to use at the time
    return codeStr.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, function(loopHead) {
      var id = parseInt(Math.random() * Number.MAX_SAFE_INTEGER)
      return `infiniteLoopDetector(${id});${loopHead}infiniteLoopDetector(${id});`
    })
  }

  infiniteLoopDetector.unwrap = function(codeStr) {
    return codeStr.replace(/infiniteLoopDetector\([0-9]*?\);/g, '')
  }

  return infiniteLoopDetector
}())
