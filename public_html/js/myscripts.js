jQuery.noConflict();
    var shopping_cart=[];
    var txt_link='quote';
    var link = 'http://magento1.dev/index.php/hello/index/';
    var customerId=null;
    var storeId=null;
    var action=null;
	function display_cart() {
	    var order_body = document.getElementById('order_body');
	    while(order_body.rows.length>0) {
	            order_body.deleteRow(0);
	        }
	    var total_price = 0;
	    for (var product in shopping_cart) {
	        var row=order_body.insertRow();
	        //Create product Infomation
	        var cellNameSKU = row.insertCell(0);
	        var cellWeight = row.insertCell(1);
	        var cellPrice = row.insertCell(2);

	        cellNameSKU.className="product-name h";
	        cellPrice.align="right";
	        //get value into inner HTML
//	        cellSKU.innerHTML = shopping_cart[product].SKU;
	        cellNameSKU.innerHTML = shopping_cart[product].Name+'<br/><small>'+shopping_cart[product].SKU+'</small>';
	        cellWeight.innerHTML = 'Weight: '+shopping_cart[product].Weight;
	        cellPrice.innerHTML = 'Price: '+shopping_cart[product].Price + ' $';
	        total_price+=shopping_cart[product].Price;
	    }
	    $.getJSON(link+txt_link, function(data5) {
	    	$("#cart_total").html(data5); 
	    });
	    //  $("#cart_total").html(total_price+" $");    
	    // console.log(txt_link);
	}

	function add_to_cart(entity_id, name, sku, weight, price) {
        var singleproduct={};
        var customerId = $('#cus-id').val();
		var storeId = $('#store-id').val();
        txt_link += '&productId[]='+entity_id;
        singleproduct.SKU = sku;
        singleproduct.Name = name;
        singleproduct.Weight = parseFloat(weight);
        singleproduct.Price = parseFloat(price);
        shopping_cart.push(singleproduct);
	    display_cart();
	}
	function display_customer(id, name, type, group, email, billing_street, billing_postcode, billing_city, billing_telephone, billing_fax, billing_region, billing_country_code, shipping_street, shipping_postcode, shipping_city, shipping_telephone, shipping_fax, shipping_region, shipping_country_code, taxvat)
	{
	    $('#Cus_id').html(id);
	    $('#Cus_name').html(name);
	    $('#Cus_type').html(type);
	    $('#Cus_group').html(group);
	    $('#Cus_email').html(email);
	    var bill = billing_street + ', ' + billing_city + ', ' + billing_region;
	    $('#Cus_bill').html(bill);
	    $('#Cus_billing_postcode').html(billing_postcode);
	    $('#Cus_billing_telephone').html(billing_telephone);
	    $('#Cus_billing_fax').html(billing_fax);
	    $('#Cus_billing_country_code').html(billing_country_code);
	    var ship = shipping_street + ', ' + shipping_city + ', ' + shipping_region;
	    $('#Cus_ship').html(ship);
	    $('#Cus_shipping_postcode').html(shipping_postcode);
	    $('#Cus_shipping_telephone').html(shipping_telephone);
	    $('#Cus_shipping_fax').html(shipping_fax);
	    $('#Cus_shipping_country_code').html(shipping_country_code);
	    $('#Cus_tax').html(taxvat);
	}
	function display_product(sku, name, type_id, description, color, fit, size, price, weight, img) {
		$('#Pro_sku').html(sku);
		$('#Pro_name').html(name);
		$('#Pro_type_id').html(type_id);
		$('#Pro_description').html(description);
		$('#Pro_color').html(color);
		$('#Pro_fit').html(fit);
		if (size=="78") {
			$('#Pro_size').html("S");
		}
		else if (size=="79") {
			$('#Pro_size').html("M");
		}
		else if (size=="80") {
			$('#Pro_size').html("L");
		}
		else if (size=="77") {
			$('#Pro_size').html("XS");
		}
		else if (size=="81") {
			$('#Pro_size').html("XL");
		}
		else {
			$('#Pro_size').html(size);
		}
		price = parseFloat(price);
		weight = parseFloat(weight);
		$('#Pro_price').html(price);
		$('#Pro_weight').html(weight);
		htmlImg = `<img src="`+img+`" style="width:100%"/>`;
		$('#show-img').html(htmlImg);
	}
	//check if cart empty
//  $("#frm").submit(function(event) {
//  	die('ssss');
//  	if (shopping_cart.length<1) {
// 		alert("Your shopping cart is empty!");
// 		return false;
// 	}
// 	else {
// 		console.log($(this).serializeArray());
// 		event.preventDefault();
// // 		var $inputs = $('#frm :input');
// //         console.log(inputs);
// // 	    var values = {};
// // 	    $inputs.each(function() {
// // 	        values[this.name] = $(this).val();
// // //	        document.write($(this).val());
// // 	    });
// // 	    console.log(values);
// // 	    var textB = "";
// // 	    textB = '<p><b>Your name: </b>'+ values.first_name+'</p>';
// // //	    $(document.body).append(form);
// // 		$("#invoice").html(textB);
// 		return true;
// 	}
//  });
// SEARCH PRODUCT
$(document).ready(function(){
	$("#searchButton").click(function() {
//		document.getElementById("#seaDiv").style.display="block";
		var searchText = $("#searchText").val();
		// console.log(searchText);
		var searchURL = link+'searchproduct?search='+searchText;
		// console.log(searchURL);
		$.getJSON(searchURL, function(data5) {
        //console.log(data);
	        var textP='';
	      	data5.forEach(function(d){
				textP+=					'<div class="row">';
	        	textP+=						'<div class="col-md-6">';
		        textP+=							`<h4><strong> ${d.name}</strong></h4>`;
				textP+=							`<h4><small>SKU: ${d.sku}</small></h4>`;
				var str = d.description;
				str = str.replace(/\"/g, "&quot;");
				d.description = str;
				textP+=							`<h4><small>${d.description}</small></h4>`;
				textP+=						'</div>';
				textP+=						'<div class="col-md-3" class="img-div" >';
				textP+=							`<img class="small-img" src="${d.img}"/>`;
				textP+=						'</div>'
				textP+=						'<div class="col-md-3">';
				var weight = parseFloat(d.weight);
				textP+=							'<div class="row">';
				textP+=								'Weight: '+weight;
				textP+=							'</div>';
				var price = parseFloat(d.price);
				textP+=							'<div class="row">';
				textP+=								'Price: '+price+ ' $';
				textP+=							'</div>';
				textP+=							'<div class="row">';
				var size="";
				if (d.size=="78") {
					size = "S";
				}
				else if (d.size=="79") {
					size = "M";
				}
				else if (d.size=="80") {
					size="L";
				}
				else if (d.size=="77") {
					size="XS";
				}
				else if (d.size=="81") {
					size="XL";
				}
				else {
					size = d.size;
				}
				textP+=								'Size: '+size;
				textP+=							'</div>';
				textP+=						'</div>';
				textP+=					'</div>';
//				console.log(img);
		        $("#search-panel").html(textP);
			})
	    });
 	});

 	//checkout

	// $("#frm").submit(function(){
	// 	txt_cus_store += '?customer='+customerId+'&storeId='+storeId;
	// 	$("#pro").css('display','block');
	// 	$('#send').hide();
	// 	$('#cartDiv').css('display','block');
 //    	$('html,body').animate({ scrollTop: $(".proDiv").offset().top},'slow');

	// 	// if (shopping_cart.length<1) {
	// 	// 	alert("Your shopping cart is empty!");
	// 	// 	return false;
	// 	// }
	// 	// else {
	// 	// 	var inputs={};
	// 	// 	$.each($('#frm').serializeArray(),function(i, field) {
	// 	// 		inputs[field.name]=field.value;
	// 	// 	});
	// 	// 	console.log(inputs);

	// 	// 	event.preventDefault();
	// 	// }	
	// 	var textB = "<h3>Your invoice information</h3>";
	// 	textB+=		"<p><b>Your name: </b>"+inputs.first_name+"&nbsp"+inputs.last_name+"</p>";
	// 	textB+=		"<p><b>Your email address: </b>"+inputs.email+"</p>";
	// 	textB+=		"<p><b>Your address receive delivery: </b>"+inputs.address+"</p>";
	// 	textB+=		"<p><b>City: </b>"+inputs.city+"</p>";
	// 	textB+=		"<p><b>State: </b>"+inputs.state+"</p>";
	// 	textB+=		"<p><b>Country: </b>"+inputs.country+"</p>";
	// 	textB+=		"<p><b>Your address zip/postal code: </b>"+inputs.zip+"</p>";
	// 	textB+=		"<p><b>Your phone contact number: </b>"+inputs.phone+"</p>";
	// 	textB+=		"<p><b>Payment method: </b>"+inputs.pay+"</p>";
	// 	textB+=		"<p><b>Shipping method: </b>"+inputs.ship+"</p>";
	// 	textB+=		"<h4><b>Your cart: </b>"+"</h4>";
	// 	textB+=		'<ul class="in">';
	// 	var i=0;
	// 	var total_price = 0;
	// 	for (var product in shopping_cart) {
	// 		i++;
	// 		textB+= '<li class="li_item"><p><b>Product '+i+':</b> '+shopping_cart[product].Name+'<br/>';
	// 		textB+= "SKU: "+shopping_cart[product].SKU+"<br/>";
	// 		textB+= "Weight: "+shopping_cart[product].Weight+"<br/>";
	// 		textB+= "Price: "+shopping_cart[product].Price+" $<br/></p></li>";
	// 		total_price+=shopping_cart[product].Price;
	// 	}
	// 	textB+= 	"</ul><p><h4>Total: "+total_price+ " $</h4></p>";
 // 	    $("#invoice").html(textB);
 // 	    $('html,body').animate({ scrollTop: $("#invoice").offset().top},'slow');

 //    });
});


//toggle show function

    $(document).ready(function() {
    	$("#send").click(function() {
    		$("#pro").css('display','block');
    		$("#cartDiv").css('display','block');
    		$("#send").hide();
    		customerId = $("#cus-id").val();
    		storeId = $("#store-id").val();
    		txt_link += '?customerId='+customerId+'&storeId='+storeId;

    	})
    	$(".checkout-btn").click(function(){
    		if (shopping_cart.length<1) {
			alert("Your shopping cart is empty!");
			return false;
		}
		else {
			action='&action=submit';
    		console.log(txt_link);
		    window.open(link+txt_link+action);
		}
    	})
    	$(".cus").click(function() {
    		// CUSTOMER
		    $.getJSON(link+'customer', function(data1) {
		        //console.log(data);
		        var textC='';
		      	data1.forEach(function(d){
					textC+=					'<div class="row">';
		        	textC+=						'<div class="col-md-6">';
			        textC+=							`<h4><strong> ${d.firstname}&nbsp${d.lastname}</strong></h4>`;
					textC+=							`<h4><small>ID: ${d.entity_id}</small></h4>`;
					textC+=						'</div>';
					textC+=						'<div class="col-md-6">';
					textC+=							`<input type="button" class="btn btn-primary btn-sm btn-block" value="Show Info" onclick="display_customer('${d.entity_id}','${d.firstname}&nbsp${d.lastname}','${d.entity_type_id}','${d.group_id}','${d.email}','${d.billing_street}','${d.billing_postcode}','${d.billing_city}','${d.billing_telephone}','${d.billing_fax}','${d.billing_region}','${d.billing_country_code}','${d.shipping_street}','${d.shipping_postcode}','${d.shipping_city}','${d.shipping_telephone}','${d.shipping_fax}','${d.shipping_region}','${d.shipping_country_code}', '${d.taxvat}');"/>`;
					textC+=						'</div>';
					textC+=					'</div>';

			        $("#cus-panel").html(textC);
				})
		    });
    		$(".cusDiv").toggle();
    		$('html,body').animate({ scrollTop: $(".cusDiv").offset().top},'slow');

    	});
    	$(".pro").click(function() {
    		$(".proDiv").toggle();
    		$("#info").css('display','block');
    		$.getJSON(link+'customer', function(data1) {
		        //console.log(data);
		        var textC='';
		      	data1.forEach(function(d){
					textC += `<option value=${d.entity_id} data-tokens="${d.title}">${d.firstname}&nbsp${d.lastname} - ${d.email}</option>`;
			        $("#cus-id").html(textC);
				})
		    });
		    $.getJSON(link+'store', function(data3) {
		        //console.log(data);
		        var textS='';
		      	data3.forEach(function(d){
					textS+=	`<option value=${d.storeId} data-tokens="${d.storeName}">${d.storeName}</option>`;
			        $("#store-id").html(textS);
				})
		    });
			// PRODUCT
				$.getJSON(link+'product', function(data2) {
			        //console.log(data);
			        var textP='';
			      	data2.forEach(function(d){
						textP+=					'<div class="row">';
			        	textP+=						'<div class="col-md-6">';
				        textP+=							`<h4><strong> ${d.name}</strong></h4>`;
						textP+=							`<h4><small>SKU: ${d.sku}</small></h4>`;
						textP+=						'</div>';
						textP+=						'<div class="col-md-2">';
						var weight = parseFloat(d.weight);
						textP+=							'<div class="row">';
						textP+=								'Weight: '+weight;
						textP+=							'</div>';
						var price = parseFloat(d.price);
						textP+=							'<div class="row">';
						textP+=								'Price: '+price+ ' $';
						textP+=							'</div>';
						textP+=						'</div>';
						textP+=						'<div class="col-md-2">';
						var str = d.description;
						str = str.replace(/\"/g, "&quot;");
						d.description = str;
						textP+=							`<input type="button" class="btn btn-info btn-sm btn-block" value="Info" onclick="display_product('${d.sku}','${d.name}','${d.type_id}','${d.description}','${d.color}','${d.fit}','${d.size}','${d.price}','${d.weight}','${d.img}');"/>`;
						textP+=						'</div>';			
						textP+=						'<div class="col-md-2">';
						textP+=							`<input type="button" class="btn btn-primary btn-sm btn-block" value="Add to cart" onclick="add_to_cart('${d.entity_id}','${d.name}','${d.sku}','${d.weight}','${d.price}');"/>`;
						textP+=						'</div>';
						textP+=					'</div>';
				        $("#pro-panel").html(textP);
					})
			    });
			    //get payment list
			    $.getJSON(link+'payment', function(data) {
			        var textP='';
			      	data.forEach(function(d){
						switch (d.status) {
							case "1": 
								textP += `<option value=${d.code} data-tokens="${d.title}">${d.title}</option>`; break;
							default: 
								textP += `<option value=${d.code} data-tokens="${d.title}" disabled="1">${d.title}</option>`; break;
						}
				        $("#payment").html(textP);
					})
		    	});
		    	//get shipping list
			    $.getJSON(link+'shipping', function(data) {
			        var textP='';
			      	data.forEach(function(d){
						switch (d.status) {
							case "1": 
								textP += `<option value=${d.code} data-tokens="${d.title}">${d.title}</option>`; break;
							default: 
								textP += `<option value=${d.code} data-tokens="${d.title}" disabled="1">${d.title}</option>`; break;
						}
				        $("#shipping").html(textP);
					})
		    	});

    		//show country
    		$.getJSON(link+'country', function(data) {
			        //console.log(data);
			        var textP='';
			      	data.forEach(function(d){
						textP+=					`<option value=${d.id} data-tokens="${d.name}">${d.name}</option>`;
				        $("#country").html(textP);
					})
			    });

    		});

    	$(".pay").click(function() {
    		//PAYMENT METHOD
			$.getJSON(link+'payment', function(data3) {
		        //console.log(data);
		        var textPa='';
		      	data3.forEach(function(d){
					textPa+=					'<div class="row">';
		        	textPa+=						'<div class="col-md-9">';
			        textPa+=							`<h4><strong> ${d.title}</strong></h4>`;
					textPa+=							`<h4><small>Code: ${d.code}</small></h4>`;
					textPa+=						'</div>';
					textPa+=						'<div class="col-md-3">';
					textPa+=							'<div class="row">';
					var enable='';
					switch (d.status) {
						case "1": 
							enable = 'Yes'; break;
						case "0": 
							enable = 'No'; break;
						case null: 
							enable = 'Unavailable'; break;
					}
					textPa+=								'Enable: '+enable;
					textPa+=							'</div>';
					textPa+=						'</div>';
					textPa+=					'</div>';
			        $("#pay-panel").html(textPa);
				})
		    });
    		$(".payDiv").toggle();
    		$('html,body').animate({ scrollTop: $(".payDiv").offset().top},'slow');
    	});
    	$(".checkout-btn").click(function() {
    		if (shopping_cart.length<1) {
			alert("Your shopping cart is empty!");
			return false;
		}
    		$("#pro").css('display','none');
    		$("#clear_cart").hide();
    		$(".checkout-btn").hide();
    		//
    	});
    	$(".ship").click(function() {
    		//SHIPPING METHOD
			$.getJSON(link+'shipping', function(data4) {
		        //console.log(data);
		        var textS='';
		      	data4.forEach(function(d){
					textS+=					'<div class="row">';
		        	textS+=						'<div class="col-md-9">';
			        textS+=							`<h4><strong> ${d.title}</strong></h4>`;
					textS+=							`<h4><small>Code: ${d.code}</small></h4>`;
					textS+=						'</div>';
					textS+=						'<div class="col-md-3">';
					textS+=							'<div class="row">';

					var enable='';
					switch (d.status) {
						case "1": 
							enable = 'Yes'; break;
						default: 
							enable = 'No'; break;
					}
					textS+=								'Enable: '+enable;
					textS+=							'</div>';
					textS+=						'</div>';
					textS+=					'</div>';
			        $("#ship-panel").html(textS);
				})
		    });
    		$(".shipDiv").toggle();
    		$('html,body').animate({ scrollTop: $(".shipDiv").offset().top},'slow');
    	});
    	$("#searchButton").click(function() {
    		$(".seaDiv").css('display','block');
    	});
    	$("#clear_cart").click(function() {
    		shopping_cart=[];
    		display_cart();
    	});
    });

