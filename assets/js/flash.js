(function ($) {
    /**
     * Object Flash
     *
     */
    $.flash = {

	/**
	 * Container
	 */
	target: null,

	/**
	 * Show Error Message
	 *
	 * @param String msg
	 * @param Integer delay
	 */
	error: function (msg, delay) {
	    $.flash.display('alert', msg, delay);
	},

	/**
	 * Show Valid Message
	 *
	 * @param String msg
	 * @param Integer delay
	 */
	valid: function (msg, delay) {
	    $.flash.display('success', msg, delay);
	},

	/**
	 * Show Info Message
	 *
	 * @param String msg
	 * @param Integer delay
	 */
	info: function (msg, delay) {
	    $.flash.display('info', msg, delay);
	},

	/**
	 * Show Warning Message
	 *
	 * @param String msg
	 * @param Integer delay
	 */
	warning: function (msg, delay) {
	    $.flash.display('warning', msg, delay);
	},

	/**
	 *
	 * @param String type
	 * @param String msg
	 * @param Integer delay
	 */
	display: function (type, msg, delay) {
	    var tmp_id = Math.floor(Math.random()*11);
	    if(delay===undefined) {
		delay = 7000;
	    }
	    $.flash.clear();
	    var element	= '<div id="alert-id-'+tmp_id+'" data-alert class="alert-box radius ' + type + '"><i class="icon-warning"></i><i class="icon-check-box"></i><i class="icon-error"></i><i class="icon-info"></i>'+msg+'<a href="#" class="close">&times;</a></div>';
	    var script	= '<script type="text/javascript">if('+delay+' > 0) { $("#alert-id-'+tmp_id+'").delay('+delay+').fadeOut(500); } else { $("#alert-id-'+tmp_id+'").show(); }</script>';
	    $($.flash.target+':first').append(element+script);
	},

	/**
	 * Clear all flash
	 */
	clear: function() {
	    $($.flash.target).empty();
	},

	/**
	 * Show input error
	 * @param JQuery Object object
	 */
	input: function(object, timeout) {
	    var elem	= object;
	    setTimeout(function() {
		elem.attr('data-invalid', '').attr('aria-invalid', 'true').parent('div').addClass('error'); elem.parents('form:first').attr('data-invalid', '');
	    }, (timeout > 0) ? timeout : 700);
	},

	/**
	 * Remove input error
	 * @param JQuery Object object
	 */
	removeInput: function(object, timeout) {
	    var elem	= object;
	    setTimeout(function() {
		elem.removeAttr('data-invalid').removeAttr('aria-invalid').parent('div').removeClass('error');
	    }, (timeout > 0) ? timeout : 700);
	},

	/**
	 * Initialize
	 */
	initialize: function(element) {
	    $.flash.target  = element;
	}

    }

    // Init pulugin
    $.flash.initialize('.flash-message');

})(jQuery);

/***
 * Close message
 */
$(function() {
    $('body').on('click', '.alert-box .close', function(e) {
	e.preventDefault();
	$(this).parents('.alert-box:first').hide();
    })
});