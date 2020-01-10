//(1.)创建基本的svg画布
var width = 400;
var height = 400;
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
//(2.)引入数据
//节点矩阵
var nodes = [
    {name: "桂林"}, {name: "广州"},
    {name: "厦门"}, {name: "杭州"},
    {name: "上海"}, {name: "青岛"},
    {name: "天津"}
];
//连线数组
var edges = [
    {source: 0, target: 1}, {source: 0, target: 2},
    {source: 0, target: 3}, {source: 1, target: 4},
    {source: 1, target: 5}, {source: 1, target: 6}
];
//(3.)创建布局
var force = d3.layout.force()
                        .nodes(nodes)  //指定节点数组
                        .links(edges)  //指定连线数组
                        .size([width, height])  //指定作用域范围
                        .linkDistance(150)  //指定连线长度
                        .charge([-400]);   //相互之间的作用力
//使力学产生作用
force.start();

//(4.)绘制 线，节点，文字
//添加连线
var svg_edges = svg.selectAll("line")
                    .data(edges)
                    .enter()
                    .append("line")
                    .style("stroke", "#ccc")
                    .style("stroke-width", 1);
var color = d3.scale.category20();
//添加节点
var svg_nodes = svg.selectAll("circle")
                    .data(nodes)
                    .enter()
                    .append("circle")
                    .attr("r", 20)
                    .style("fill", function (d, i) {
                        return color(i);
                    })
                    .call(force.drag());  //使节点能都拖拽
//添加描述节点的文字
var svg_texts = svg.selectAll("text")
                    .data(nodes)
                    .enter()
                    .append("text")
                    .style("fill", "black")
                    .attr("dx", 20)
                    .attr("dy", 8)
                    .text(function (d) {
                        return d.name;
                    });
//(5.)由于力是不断变化的， 每一刻都在发生变化， 因此，需要不断更新节点和连线的位置
force.on("tick", function () {
    //更改连线坐标
    svg_edges.attr("x1", function (d) {
        return d.source.x
    }).attr("y1", function (d) {
        return d.source.y;
    }).attr("x2", function (d) {
        return d.target.x;
    }).attr("y2", function (d) {
        return d.target.y;
    })
    //更新节点坐标
    svg_nodes.attr("cx", function (d) {
        return d.x;
    }).attr("cy", function (d) {
        return d.y;
    })
    //更新文字坐标
    svg_texts.attr("x", function (d) {
        return d.x;
    }).attr("y", function (d) {
        return d.y;
    });
})