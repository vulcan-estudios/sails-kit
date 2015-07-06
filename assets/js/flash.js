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
	    $.flash.display('error', msg, delay);
	},

	/**
	 * Show Valid Message
	 *
	 * @param String msg
	 * @param Integer delay
	 */
	valid: function (msg, delay) {
	    $.flash.display('valid', msg, delay);
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
	    var element	= '<div id="alert-id-'+tmp_id+'" data-alert class="alert-box radius ' + type + '">'+msg+'<a href="#" class="close">&times;</a></div>';
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
	 * Initialize
	 */
	initialize: function(element) {
	    $.flash.target  = element;
	}

    }

    // Inicializa el plugin
    $.flash.initialize('.flash-message');

})(jQuery);