

// function loadHTMLTable(data){
//     const table = document.querySelector('')
// }

$('#left_nav .leftmenu-inner ul li a').click(function(){
    var _link = $(this).attr('_link');
    $('#main').attr('src', _link);
});

$('#user_collapse ul li a').click(function(){
    var _link = $(this).attr('_link');
    if (_link == "/main.html") {
        window.location.reload();
    }
    $('#main').attr('src', _link);
});

