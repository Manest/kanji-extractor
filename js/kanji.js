$(function () {
    var list = [];
    $( "#text" ).bind("keyup change", function(e) {
        var str = $(this).val();
        $("#result").html("");
        for(var i = 0 ; i < str.length ; ++i) {
            if(/^[\u4e00-\u9faf]+$/.test(str[i])) {
                if (list.indexOf(str[i]) == -1) {
                    list.push(str[i]);
                }
            }
        }
        for(var i = 0 ; i < list.length ; ++i) {
            $("#result").append($('<a target="_blank">').
                                attr("href", "http://jisho.org/kanji/details/"+list[i]).
                                html(list[i]));
        }
        $("#result").append($('<a target="_blank">').
            attr("href", "http://jisho.org/kanji/details/"+list.toString().replace(/,/g, "")).html("Show all"));

    });

});