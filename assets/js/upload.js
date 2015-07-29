(function ($) {
	/**
	 * Object Upload
	 *
	 */
	$.upload = {
		/**
		 * Convert size to bytes.
		 * @param string size
		 * @param boolean decimals
		 * @returns number
		 */
		_sizeToBytes: function (size, decimals) {
			var bytes = decimals ? {'B': 1, 'KB': 1000, 'MB': (1000 * 1000), 'GB': (1000 * 1000 * 1000), 'TB': (1000 * 1000 * 1000 * 1000), 'PB': (1000 * 1000 * 1000 * 1000 * 1000)} : {'B': 1, 'KB': 1024, 'MB': (1024 * 1024), 'GB': (1024 * 1024 * 1024), 'TB': (1024 * 1024 * 1024 * 1024), 'PB': (1024 * 1024 * 1024 * 1024 * 1024)};
			var matches = size.match(/([KMGTP]?B)/);
			size = parseFloat(size) * bytes[matches[1]];
			return size.toFixed(0);
		},
		/**
		 * Convert bytes to human size
		 * @param int bytes
		 * @param boolean decimals
		 * @returns string
		 */
		_bytesToSize: function (bytes, decimals) {
			var thresh = decimals ? 1000 : 1024;
			if (Math.abs(bytes) < thresh) {
				return bytes + ' B';
			}
			var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			var u = -1;
			do {
				bytes /= thresh;
				++u;
			} while (Math.abs(bytes) >= thresh && u < units.length - 1);
			return (decimals) ? bytes.toFixed(0) + ' ' + units[u] : bytes.toFixed(1) + ' ' + units[u];
		},
		/*
		 * Get extensions
		 */
		_extension: function (name) {
			var pattern = /^.+\.([^.]+)$/;
			var ext = pattern.exec(name);
			return ext === null ? "" : ext[1];
		},
		/**
		 * Bind drag
		 */
		_bindDrag: function () {

			$(document).bind('drop dragover', function (e) {
				e.preventDefault();
			});

			$(document).bind('dragover', function (e) {
				var dropZone = $('.file-upload'), foundDropzone, timeout = window.dropZoneTimeout;
				if (!timeout) {
					dropZone.addClass('in');
				} else {
					clearTimeout(timeout);
				}
				var found = false, node = e.target;
				do {
					if ($(node).hasClass('file-upload')) {
						found = true;
						foundDropzone = $(node);
						break;
					}
					node = node.parentNode;
				} while (node !== null);
				dropZone.removeClass('in hover');
				if (found) {
					foundDropzone.addClass('hover');
				}
				window.dropZoneTimeout = setTimeout(function () {
					window.dropZoneTimeout = null;
					dropZone.removeClass('in hover');
				}, 100);
			});
		},
		start: function (input) {
			var form		= input.parents('form').first();
			form.find(':submit').attr('disabled', 'disabled');

			var container	= input.parents('.file-upload:first');
			var button		= container.find('.file-upload-button');
			var bar			= container.find('.file-upload-progress');
			if ((bar.size() > 0)) {
				bar.removeClass('hide').show().find('.progress').removeClass('alert');
				bar.find('.meter:first').css('width', '0%');
				if (button.find('.file-upload-processing').size() > 0) {
					button.addClass('file-upload-uploading');
				}
			} else {
				container.find('span.upload').text('Loading...').addClass('disabled');
			}
			input.prop('disabled', true);
			if (container.find('.js-upload-link').size() > 0) {
				container.find('.js-upload-link').addClass('disabled');
			}
		},
		updateProgressBar: function (input, progress) {
			var container	= input.parents('.file-upload:first');
			var bar			= container.find('.file-upload-progress');
			if (bar.size() > 0) {
				bar.find('.meter:first').css('width', progress + '%');
			} else {
				container.find('span.upload').text('Loading... ' + progress + '%').addClass('disabled');
			}
		},
		//End Progress bar
		endProgressBar: function (input, alert) {
			var form	= input.parents('form').first();
			form.find(':submit').removeAttr('disabled');
			var container = input.parents('.file-upload:first');
			var icon	= (container.attr('data-icon') === undefined) ? 'fa-plus' : container.attr('data-icon');
			var text	= (container.attr('data-text') === undefined) ? 'Upload' : container.attr('data-text')
			var bar		= container.find('.file-upload-progress');
			var button	= container.find('.file-upload-button');
			if (bar.size() > 0) {
				bar.fadeOut(700);
				if (button.find('.file-upload-processing').size() > 0) {
					button.removeClass('file-upload-uploading');
				}
			} else {
				container.find('span.upload').html('<i class="fa ' + icon + ' fa-pd-right"></i>' + text).removeClass('disabled');
			}
			input.prop('disabled', false);
			if (container.find('.js-upload-link').size() > 0) {
				container.find('.js-upload-link').removeClass('disabled');
			}
		},
		bind: function () {
			var files = $('.js-upload');
			files.each(function () {
				var dropZone = $(this).parents('.file-upload:first');
				var accepted = $(this).attr('accept');
				var maxSize = $(this).attr('data-maxsize');
				maxSize = (maxSize === undefined) ? 5000000 : $.upload._sizeToBytes(maxSize, true);
				var humanSize = $.upload._bytesToSize(maxSize, true);

				$(this).fileupload({
					dataType: 'html',
					acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
					maxFileSize: maxSize,
					dropZone: dropZone,
					add: function (e, data) {
						//Validate Type
						var acceptFileTypes = /(\.|\/)(gif|jpe?g|png)$/i;
						//Validate Video
						var acceptVideoTypes = /(\.|\/)?(mkv|flv|ogg|ogv|avi|mov|wmv|mp4|mpeg|mpg|3gp?p|m4v|x-msvideo|quicktime)$/i;
						//Validate Input
						if (data.originalFiles[0]['type'] !== undefined) {
							var dataType = data.originalFiles[0]['type'];
							if (dataType.length === 0) {
								dataType = $.upload._extension(data.originalFiles[0]['name']);
							}
							if (accepted === 'video/*') {
								if (!acceptVideoTypes.test(dataType)) {
									$.flash.error('The video you are attempting to upload is not allowed (.' + dataType + ')');
									return false;
								}
							} else if (accepted === 'image/*') {
								if (!acceptFileTypes.test(dataType)) {
									$.flash.error('The filetype you are attempting to upload is not allowed.');
									return false;
								}
							}
							//Validate Size
							var size = data.originalFiles[0]['size'];
							if (size > maxSize) {
								$.flash.error('The file you are attempting to upload is larger than the permitted size ' + humanSize + '.');
								return false;
							}
						}
						//Start Transmition
						$.upload.start($(this));
						//Send file
						data.submit();
					},
					progressall: function (e, data) {
						//Progress
						var progress = parseInt(data.loaded / data.total * 100, 10);
						$.upload.updateProgressBar($(this), progress);
					},
					fail: function (e, data) {
						//Show error
						$.flash.error('The file could not be uploaded to the server.\nPlease try again');
						$.upload.endProgressBar($(this));

					},
					done: function (e, data) {
						//Container
						var container = $(this).parents('.file-upload:first');
						//Input
						var input = $(this);

						//Result
						try {

							var tmp = data.result.replace('<pre>', '').replace('</pre>', '');
							var r = JSON.parse(tmp);
							if (r.success === true) {
								//Set value "name" into input type hidden
								var form = input.parents('form:first');
								//Get input name
								var iName = (container.attr('data-input') !== undefined) ? container.attr('data-input') : input.attr('data-input');
								//Get input "hidden"
								var iHidden = $("input[name='" + iName + "']", form);
								//Set response
								if (r.data.name !== undefined) {
									iHidden.val(r.data.name);
								} else {
									iHidden.val(r.data.source);
								}
								if (input.attr('after-upload') !== undefined) {
									fn = input.attr('after-upload') + '(r.data, input)';
									eval(fn);
								} else {
									//Show image
									container.find('img').attr('src', r.data.source);
								}
							} else {
								$.flash.error((r.msg !== undefined) ? r.msg : 'The file could not be uploaded to the server.\nPlease try again.');
							}

						} catch (e) {
							$.flash.error('The file could not be uploaded to the server. Please try again.');
						}

						$.upload.endProgressBar($(this));
					}
				});

			});

			$.upload._bindDrag($(this));

		}

	}

	//Bind Upload
	$.upload.bind();

})(jQuery);

$(function () {
	//If button is a link
	$('body').on('click', '.js-upload-link, .file-upload .button', function (e) {
		e.preventDefault();
		var este = $(this);
		var container = este.parents('.file-upload').first();
		var input = container.find('input[type="file"]').click();
	});
});