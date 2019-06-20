

$( document ).ready(function() {
	$( "select" ).change(function() {
		$("body .system").empty();
		$("body .details").hide();
	  	// console.log($(this).val());
	  	var selectId = $(this).val();
	  	// ajaxFunctionSelectSystem(selectId);
	  	if(selectId != '0'){
	  		ajaxFunctionSelectSystem(selectId);
	  	}
	});

	$('body').on('click', 'ul li', function (){
        $("body .details .image_div").empty();
        $('.details').fadeIn();
        var productId = $(this).attr('data-product-id');
        var groupId = $(this).parent().parent().attr('id');
        // console.log(productId);
        // console.log(groupId);
        ajaxFunctionChooseProduct(productId, groupId);
    });
	$("#myForm").submit(function(e) {
			e.preventDefault();
            data = $("form").serialize();
            $.ajax({
              type: "POST",
              url: "tojson.php", //Relative or absolute path to mailer.php file
              data: data,
              success: function(data) {
                incomingData = JSON.parse(data);
                $.each(incomingData, function(key,value) {
                    $id = value[0];
                    $name = value[1];
                });
                alert('success -> entityTypeId ' + $id +' was updated with name: '+ $name);
              }
            });
            return false;
     });
});


function ajaxFunctionSelectSystem(selectId){
	$.ajax("data/entityGroupsDb2.json", {
	  type: "GET",
	  dataType: "json",
	  success: function(data) {
	    incomingData = data;
		$.each(incomingData, function(key,value) {
            if(value['_systemId'] == selectId){
            	var valueGroupId = value['_groupId'];
            	var innerHtml = "<div id="+valueGroupId+"></div>";
            	$("body .system").append(innerHtml);
            	$("body .system #"+valueGroupId).append( "<div data-group-id="+value['_groupId']+">"+value['_name']+"</div>" );
        		var EntityTypes = value['EntityTypes'];
            	$.each(EntityTypes, function(key,value) {
            		// console.log(value);
        			$("body .system #"+valueGroupId).append( "<ul><li data-product-id="+value['_entityTypeId']+">"+value['_name']+"</li></ul>" );
            	});
            }
		});
	  },
	  error: function(req, status, err) {
	    //console.error("Something went wrong! Status: %s (%s)", status, err);
	  }
	});
}

function ajaxFunctionChooseProduct(productId, groupId){
	$.ajax("data/entityGroupsDb2.json", {
	  type: "GET",
	  dataType: "json",
	  success: function(data) {
	    incomingData = data;
		$.each(incomingData, function(key,value) {
            if(value['_groupId'] == groupId){
            	$('#group').val(value['_name']);
        		var EntityTypes = value['EntityTypes'];
            	$.each(EntityTypes, function(key,value) {
        			if(value['_entityTypeId'] == productId){
        				$('#name').val(value['_name']);
        				$('#id').val(value['_entityTypeId']);
        				var Icon = value['Icon'];
        				// console.log(Icon);
        				$("body .details .image_div").append( "<img src="+ Icon['_iconName']+">" );
        				$.each(Icon, function(key,value) {
        					// console.log(value);
        					// $("body .details .image_div").append( "<img src="+ value['_iconName']+">" );
        				})
        			}
            	});
            }
		});
	  },
	  error: function(req, status, err) {
	    //console.error("Something went wrong! Status: %s (%s)", status, err);
	  }
	});
}
