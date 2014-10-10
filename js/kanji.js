$(function () {
    $( "#text" ).bind("keyup change", function(e) {
        var list = [];
        var str = $(this).val();
        var objs = {};
        $("#result div").html("");
        for(var i = 0 ; i < str.length ; ++i) {
            if(/^[\u4e00-\u9faf]+$/.test(str[i])) {
                if (objs[str[i]] == undefined) {
                    //list.push(str[i]);
                    objs[str[i]] = 1;
                } else {
                    objs[str[i]] = objs[str[i]] + 1;
                }
            }
        }

        for (var i in objs) {
            list.push([i, objs[i]])
        }
        $("#result .links").append(list.length+" Kanji found<br />");

        for(var i = 0 ; i < list.length ; ++i) {
            $("#result .links").append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list[i][0]).
                html(list[i][0]));
        }
        if (list.length > 0) {
            $("#result .links").append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list.toString().replace(/,/g, "")).html("Show all"));
        }
        $("#result .links").append("<hr />");

        list.sort(function(a, b) {return b[1] - a[1]})
        $("#result .links").append("Number of each kanji:");

        for(var i = 0 ; i < list.length ; ++i) {
            $("#result .ordered").append(list[i][1]+' - ');
            $("#result .ordered").append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list[i][0]).
                html(list[i][0]+"<br />"));
        }
    });

});