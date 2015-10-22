$(function () {
    var result = $("#result");
    var link_bloc = result.find(".links");
    var ordered_bloc = result.find(".ordered");
    var result_bloc = result.find("div");
    var textarea = $("#text");

    var extract = function () {
        var list = [];
        var str = $("#text").val();
        var objs = {};
        result_bloc.html("");
        for (var i = 0 ; i < str.length ; ++i) {
            if(/^[\u4e00-\u9faf]+$/.test(str[i])) {
                if (objs[str[i]] == undefined) {
                    objs[str[i]] = 1;
                } else {
                    objs[str[i]] = objs[str[i]] + 1;
                }
            }
        }
        for (i in objs) {
            if (objs.hasOwnProperty(i)) {
                list.push([i, objs[i]]);
            }
        }
        link_bloc.html(list.length+" Kanji found<br />");

        for (i = 0 ; i < list.length ; ++i) {
            link_bloc.append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list[i][0]).
                html(list[i][0]));
        }
        if (list.length > 0) {
            link_bloc.append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list.toString().replace(/,/g, "")).html("Show all"));
        }
        link_bloc.append("<hr />");

        list.sort(function(a, b) {return b[1] - a[1]});
        ordered_bloc.html("Statistics : <br />");
        ordered_bloc.append(list.length+" Kanji<br />");

        for (i = 0 ; i < list.length ; ++i) {
            ordered_bloc.append(list[i][1]+" - ");
            ordered_bloc.append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list[i][0]).
                html(list[i][0]));
            ordered_bloc.append('<small>('+Math.round((list[i][1] * 100) / list.length)+'%)</small><br />');

        }
    };
    textarea.bind("keyup change", extract);
    if (textarea.html() != "") {
       extract();
    }
});