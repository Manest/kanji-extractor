$(function () {
    $( "#text" ).bind("keyup change", function(e) {
        var list = [];
        var str = $(this).val();
        var objs = {};
        $("#result div").html("");
        for(var i = 0 ; i < str.length ; ++i) {
            if(/^[\u4e00-\u9faf]+$/.test(str[i])) {
                if (list.indexOf(str[i]) == -1) {
                    //list.push(str[i]);
                    objs[str[i]] = 1;
                } else {
                    ++objs[str[i]];
                }
            }
        }

        for (var i in objs) {
            list.push([i, objs[i]])
        }

        for(var i = 0 ; i < list.length ; ++i) {
            $("#result .links").append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list[i][0]).
                html(list[i][0]));
        }
        if (list.length > 0) {
            $("#result .links").append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list.toString().replace(/,/g, "")).html("Show all"));
        }

        list.sort(function(a, b) {return a[1] - b[1]})

        for(var i = 0 ; i < list.length ; ++i) {
            $("#result .ordered").append($('<a target="_blank">').
                attr("href", "http://jisho.org/kanji/details/"+list[i][0]).
                html(list[i][1]+" - "+list[i][0]+"<br />"));
        }
    });

});