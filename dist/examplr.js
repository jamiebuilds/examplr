(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.examplr = factory();
})(this, function () {
  'use strict';

  /**
   * @private
   * @param {*} arg
   * @return {*} arg
   */
  function identity(arg) {
    return arg;
  }

  /**
   * Create a new examplr instance.
   *
   * @param {Function} optionsCb Modify the arguments passed to example callbacks.
   * @return {example}
   */
  function examplr() {
    var optionsCb = arguments.length <= 0 || arguments[0] === undefined ? identity : arguments[0];

    var container = document.getElementById('examplr');
    var examples = [];

    var hasOnly = undefined;
    var debouncedTimer = undefined;

    /**
     * Run an example.
     *
     * @private
     * @param {Object} options
     * @param {String} options.name Name of the example
     * @param {Function} options.cb Callback that runs the example
     */
    function runExample(_ref) {
      var name = _ref.name;
      var cb = _ref.cb;

      var h2 = document.createElement('h2');
      var el = document.createElement('div');

      h2.textContent = name;

      container.appendChild(h2);
      container.appendChild(el);

      try {
        cb(optionsCb(el));
      } catch (err) {
        el.innerHTML = '<pre>' + err.stack + '</pre>';
        throw err;
      }
    }

    /**
     * Run all the current examples.
     *
     * @private
     */
    function runExamples() {
      examples.forEach(function (example) {
        if (!hasOnly || example.only) {
          runExample(example);
        }
      });

      examples.length = 0;
    }

    /**
     * Queue the examples to run.
     *
     * @private
     */
    function queueExamples() {
      if (debouncedTimer) {
        clearTimeout(debouncedTimer);
      }
      debouncedTimer = setTimeout(runExamples, 1);
    }

    /**
     * Add a new example to the queue.
     *
     * @private
     * @param {String} name
     * @param {Function} cb
     * @param {Boolean} only
     */
    function pushExample(name, cb, only) {
      if (only) {
        hasOnly = true;
      }
      examples.push({ name: name, cb: cb, only: only });
      queueExamples();
    }

    /**
     * Create an example.
     *
     * @param {String} name Name of the example
     * @param {Function} cb Callback that runs the example
     */
    function example(name, cb) {
      pushExample(name, cb, false);
    }

    /**
     * Create an example that will be the only one to run (unless there are
     * multiple "only" ones to run). This is useful when you want to focus
     * on a particular example.
     *
     * @param {String} name Name of the example
     * @param {Function} cb Callback that runs the example
     */
    example.only = function (name, cb) {
      pushExample(name, cb, true);
    };

    /**
     * Create an example but do not run it (just a noop). This is useful when you
     * want to temporarily disable an example.
     */
    example.skip = function () {};

    return example;
  };

  return examplr;
});
//# sourceMappingURL=examplr.js.map