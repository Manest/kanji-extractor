$(function () {
    var result = $("#result");
    var link_bloc = result.find(".links");
    var ordered_bloc = result.find(".ordered");
    var result_bloc = result.find("div");
    var textarea = $("#text");

    var extract = function () {console.log("ok");
        var list = [];
        var str = $("#text").val();
        var kanji = {};
        var diff_str = "";
        var total = 0;
        result_bloc.html("");
        for (var i = 0 ; i < str.length ; ++i) {
            if(/^[\u4e00-\u9faf]+$/.test(str[i])) {
                if (kanji[str[i]] == undefined) {
                    kanji[str[i]] = 1;
                    diff_str += str[i];
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
        link_bloc.html(diff_str.length+" different Kanji found<br />");
        for (i = 0 ; i < diff_str.length ; i++) {
            link_bloc.append($('<a target="_blank">').
                attr("href", "http://jisho.org/search/"+diff_str[i]+"%20%23kanji").
                html(diff_str[i]));
        }
        if (list.length > 0) {
            link_bloc.append($('<a target="_blank">').
                attr("href", "http://jisho.org/search/"+diff_str).html("Show all"));
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