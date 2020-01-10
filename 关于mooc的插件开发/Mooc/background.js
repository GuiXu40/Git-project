//监听页面路由变化
function listening_route(){
    window.addEventListener('popstate', function(event) {
        removeEles();
        console.log("pop");
        setTimeout(presenting_map,5000);
    })
    var _wr = function(type) {
        var orig = history[type];
        return function() {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    }
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    window.addEventListener('replaceState', function(e) {
        removeEles();
        setTimeout(presenting_map,5000);
        console.log("replace");
    });
    window.addEventListener('pushState', function(e) {
        removeEles();
        setTimeout(presenting_map,5000);
        console.log("push");
    });
    window.addEventListener('hashchange',function(event){
        console.log("hash");
    })
}