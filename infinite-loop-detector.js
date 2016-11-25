var infiniteLoopDetector = (function() {
  var map = {}

  function infiniteLoopDetector(id) {
    if (id in map) { // 非首次执行
      if (Date.now() - map[id] > 1000) {
        delete map[id]
        throw {
          type: 'InfiniteLoopError',
          message: 'Loop runing too long!',
        }
        // throw new Error('Loop runing too long!')
      }
    } else { // 首次运行，记录循环开始的时间。之所有把非首次运行的判断写在前面的if里是因为上面会执行更多次
      map[id] = Date.now()
    }
  }

  infiniteLoopDetector.wrap = function(code) {
    return code.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, function(line) {
      var id = parseInt(Math.random() * Number.MAX_SAFE_INTEGER)
      return `infiniteLoopDetector(${id});${line}infiniteLoopDetector(${id});`
    })
  }

  infiniteLoopDetector.unwrap = function(codeStr) {
    return codeStr.replace(/infiniteLoopDetector\([0-9]*?\);/g, '')
  }

  return infiniteLoopDetector
}())
