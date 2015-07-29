// Foundation JavaScript
bindElements();

function bindElements() {
    $("body").css("cursor", "wait");
    $(".js-load").css("cursor", "wait");
    setTimeout(function() {
        $(document).foundation('reflow');
        $(document).foundation({
            abide: {
                //validate_on_blur: false,
                patterns: {
                    pint: /^[0-9]+$/,
                    zip: /(^\d{5}$)|(^\d{5}-\d{4}$)/
                }
            }
        });
        $("body").css("cursor", "default");
        $(".js-load").css("cursor", "");
    }, 900);
}

/*********************
 * BIND SORTABLE
 ********************/
function bindSortable(id, callback, handle) {
    var list	= document.getElementById(id);
    var handle	= (handle === undefined)  ? '.button-drag' : handle;
    Sortable.create(list, {
        animation: 300,
        handle: handle,
        onUpdate: function (evt){
            fn = callback+'(id)';
            eval(fn);
        }
    });
}