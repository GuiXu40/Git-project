//获取字幕
function get_subtitles(){
    //获取字幕所在的div
    var eles=document.getElementsByClassName("phrases");
    // console.log(eles[0])
    //循环遍历,去除字幕
    for(let j=0,len1=eles.length;j<len1;j++){
        for(let i=0,len=eles[j].childNodes.length;i<len;i++){
            //将每一句字幕都加入到字母数组中,便于服务器处理
            // console.log(eles[j].childNodes[i].innerHTML);
            subtitles.push(eles[j].childNodes[i].innerHTML);
        }
    }
    console.log(subtitles);
}

//添加渲染图谱的div
function presenting_map(){
    //获取呈现专有名词的div
    var rc=document.getElementsByClassName("rc-VideoHighlights")[0];
    //获取呈现图谱的div
    var manage=document.getElementsByClassName("rc-VideoHighlightingManager")[0];
    //创建新元素
    var container=document.createElement("div");
    var header1=document.createElement("div");
    var mapContainer=document.createElement("div");
    var mapHref=document.createElement("div");
    var map=document.createElement("div");
    var mapHeader=document.createElement("div");
    var mapBody=document.createElement("div");
    //设置样式
    container.setAttribute('style', `
        width: 100%;
        height: 200px;
        box-shadow: 0 0 5px 5px rgba(67, 67, 77, 0.2);
        border-radius: 5px;
    `);
    container.id="container";
    header1.setAttribute('style', `
        height: 25px;
        line-height: 25px;
        text-align: center;
        width: 100%;
        font-weight: 550;
        border-bottom: 1px solid #aaa;
    `);
    header1.id="header1";
    mapContainer.setAttribute('style', `
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    `);
    mapContainer.id="mapContainer";
    map.setAttribute('style', `
        min-height: 500px;
        max-width: 640px;
        margin-left: 37px;
        margin-top: -150px;
        width: 100%;
        box-shadow: 0 0 5px 5px rgba(76,172,172,0.5);
        border-radius: 5px;
    `);
    map.id="map";
    mapHeader.setAttribute('style', `
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color: #aaa;
    `);
    mapHeader.id="mapHeader"
    mapBody.setAttribute('style', `
    `);
    mapBody.id="mapBody";
    mapHref.setAttribute('style', `
        padding: 2px 5px 2px 5px;
    `);
    mapHref.innerHTML="专有名词"
    mapHref.className="mapHref";
    //向网站中添加元素
    mapContainer.appendChild(mapHref);
    container.appendChild(header1);
    container.appendChild(mapContainer);
    map.appendChild(mapHeader);
    map.appendChild(mapBody);
    if(rc && manage){
        manage.appendChild(map)
        rc.appendChild(container);
    }
    //给元素添加事件
    mapHref.onclick=function(){
    map.scrollIntoView()
        mapHeader.innerHTML=mapHref.innerHTML;
    }
}

//删除元素
function removeEles(){
    let container=document.getElementById("container");
    let map=document.getElementById("map");
    if(container && map){
        removeElement(container);
        removeElement(map);
    }
    console.log("删除成功");
}
function removeElement(_element){
    var _parentElement = _element.parentNode;
    if(_parentElement){
           _parentElement.removeChild(_element);
    }
}
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
var subtitles = new Array();
var main=function(){
    // get_subtitles();
    presenting_map();
    listening_route();
    console.log("test");
}
setTimeout(main, 10000);