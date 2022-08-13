import {r as react} from "./common/index-86c632b0.js";
import "./common/_commonjsHelpers-8c19dec8.js";
var useResizeObserver = function(ref, callback) {
  react.useEffect(function() {
    var resizeObserver = new window.ResizeObserver(function(entries) {
      callback(entries[0].contentRect);
    });
    resizeObserver.observe(ref.current);
  }, [ref]);
};
export default useResizeObserver;
