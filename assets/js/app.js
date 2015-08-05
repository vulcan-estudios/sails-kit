// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(function() {
	bindSortable('doc-sortable', 'orderTest');
});
function orderTest(i) {
	console.log(i);
}