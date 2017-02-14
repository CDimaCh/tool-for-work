$(document).ready(function () {

	$('#iteration').val('25');
	
    $('#push').on('click', function (e) {
		
		$('#content > div').remove();
		getImages();
		//$('#link').val('');
		//$('#iteration').val('');
    });
	
	$('#link').keyup(function(){
    if(event.keyCode==13)
       {
			$('#content > div').remove();
			getImages();
       }
	});
	
	function getImages(){
		// enter url from input
        var url = $('#link').val();//"http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05233978.png";//location.href
        // enter iteration from input
        var iteration = $('#iteration').val();//25;

        var staticUrlPart = url.substr(0, url.lastIndexOf('/') + 1);
        var fullName = url.substr(url.lastIndexOf('/') + 1).split('.');
        var fileName = fullName[0];
        var extension = fullName[1];
        var array = fileName.split('');
        var tempArray = fileName.split('');
        var resultFileNames = [];

        var getNumber = function (index, isPositive) {
            var number = parseInt(array[index]);

            if (!isNaN(number)) {
                var oldValue = array[index];

                if (isPositive)
                    array[index] = ++number;
                else
                    array[index] = --number;

                if ((array[index] == 10 && isPositive) || (array[index] < 0 && !isPositive)) {
                    array[index] = isPositive ? 0 : 9;
                    var result = getNumber(index - 1, isPositive);
                    if (!result) {
                        array[index] = oldValue;
                        return;
                    }
                }
                return true;
            } else {
                return false;
            }
        }

        for (var i = 0; i < iteration; i++) {
            var result = getNumber(array.length - 1, true);
            if (!result)
                break;
				
			var tempUrl = array.join('');
			if (extension)
			tempUrl += "." + extension;
            resultFileNames.push(staticUrlPart + tempUrl);
        }

        array = tempArray;

        for (var i = 0; i < iteration; i++) {
            var result = getNumber(array.length - 1, false);
            if (!result)
                break;
			
			var tempUrl = array.join('');
			if (extension)
			tempUrl += "." + extension;
            resultFileNames.push(staticUrlPart + tempUrl);
        }
		console.log(resultFileNames);
			
		$.each(resultFileNames, function(data){
			$('#content').append($('<div>',{class: "thumbnail col-xs-12 col-sm-6 col-md-3"})
							.append($("<a>", {href: resultFileNames[data]})
								.append($("<img>", {src: resultFileNames[data]}))));
		});
		
		$("img").load(function() {
			$('img').error(function() {
				$(this).parent().parent().remove();
			});
			var width = $(this).prop('naturalWidth');
			var height = $(this).prop('naturalHeight');
			$(this).parent().append($("<p>", {html: width+"X"+height}));
			if (width&&height <= 1000){
				$(this).parent().parent().remove();
			}
		});
	}
});

