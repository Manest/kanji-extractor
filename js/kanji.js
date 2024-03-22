$(function () {
    var result = $("#result");
    var link_bloc = result.find(".links");
    var ordered_bloc = result.find(".ordered");
    var result_bloc = result.find("div");
    var textarea = $("#text");

    var extract = function () {console.log("ok");
        var list = [];
        var src_str = $("#text").val();
        var str = []
        var kanji = {};
        var diff_arr = [];
        var total = 0;
        result_bloc.html("");
        for (var i = 0; i < src_str.length; i++) {
            if (/[\ud842]/.test(src_str[i]) && /[\udf9f]/.test(src_str[i+1])) {
                continue;
            } else if (/[\udf9f]/.test(src_str[i]) && /[\ud842]/.test(src_str[i-1])) {
                str.push(src_str[i-1] + src_str[i]);
            } else {
                str.push(src_str[i])
            }
        }
        for (var i = 0 ; i < str.length ; ++i) {
            if(/^[\u4e00-\u9faf]|[\ud842\udf9f]+$/.test(str[i])) {
                if (kanji[str[i]] == undefined) {
                    kanji[str[i]] = 1;
                    diff_arr.push(str[i]);
                } else {
                    ++kanji[str[i]];
                }
                ++total;
            }
        }
        for (i in kanji) {
            if (kanji.hasOwnProperty(i)) {
                list.push([i, kanji[i]]);
            }
        }
        link_bloc.html(diff_arr.length+" different Kanji found<br />");
        for (i = 0 ; i < diff_arr.length ; i++) {
            link_bloc.append($('<a target="_blank">').
                attr("href", "http://jisho.org/search/"+diff_arr[i]+"%20%23kanji").
                html(diff_arr[i]));
        }
        if (list.length > 0) {
            link_bloc.append($('<a target="_blank">').
                attr("href", "http://jisho.org/search/"+diff_arr).html("Show all"));
        }
        link_bloc.append("<hr />");

        list.sort(function(a, b) {return b[1] - a[1]});
        ordered_bloc.html("Statistics : <br />");
        ordered_bloc.append(total+" Kanji<br />");

        for (i = 0 ; i < list.length ; ++i) {
            ordered_bloc.append(list[i][1]+" - ");
            ordered_bloc.append($('<a target="_blank">').
                attr("href", "http://jisho.org/search/"+list[i][0]+"%20%23kanji").
                html(list[i][0]));
            ordered_bloc.append('<small>('+Math.round((list[i][1] * 100) / total)+'%)</small><br />');
        }
    };
    textarea.on("change keyup", extract);
    if (textarea.html() != "") {
       extract();
    }
});
