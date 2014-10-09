$(function () {
    var list = [];
    $( "#text" ).change(function() {
        var str = $(this).val();
        for(var i = 0 ; i < str.length ; ++i) {
            if(/^[\u4e00-\u9faf]+$/.test(str[i])) {
                if (list.indexOf(str[i]) == -1) {
                    list.push(str[i]); 
                }
            }
        }
        console.log(list);
    });

});