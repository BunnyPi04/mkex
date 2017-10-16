jQuery.noConflict();
    var shopping_cart=[];

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
	    $("#cart_total").html(total_price+" $");    
	}

	function add_to_cart(name, sku, weight, price) {
	        var singleproduct={};
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
function checkcart() {
	if (shopping_cart.length<1) {
		alert("Your shopping cart is empty!");
		return false;
	}
	else {
		var $inputs = $('#frm :input');
        console.log(inputs);
	    var values = {};
	    $inputs.each(function() {
	        values[this.name] = $(this).val();
//	        document.write($(this).val());
	    });
	    console.log(values);
	    var textB = "";
	    textB = '<p><b>Your name: </b>'+ values.first_name+'</p>';
//	    $(document.body).append(form);
		$("#invoice").html(textB);
		return true;
	}
 }

// SEARCH PRODUCT
$(document).ready(function(){
	$("#searchButton").click(function() {
//		document.getElementById("#seaDiv").style.display="block";
		var searchText = $("#searchText").val();
		console.log(searchText);
		var searchURL = 'http://magento1.dev/index.php/hello/index/searchproduct?search='+searchText;
		console.log(searchURL);
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
	$("#frm").submit(function(){
		alert('ssss');
        var $inputs = $('#frm :input');
        console.log(inputs);
	    var values = {};
	    $inputs.each(function() {
	        values[this.name] = $(this).val();
//	        document.write($(this).val());
	    });
	    console.log(values);
	    var textB = "";
	    textB = '<p><b>Your name: </b>'+ values.first_name+'</p>';
//	    $(document.body).append(form);
		$("#invoice").html(textB);
    });
});


//toggle show function

    $(document).ready(function() {
    	$(".cus").click(function() {
    		// CUSTOMER
		    $.getJSON('http://magento1.dev/index.php/hello/index/customer', function(data1) {
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

			// PRODUCT
				$.getJSON('http://magento1.dev/index.php/hello/index/product', function(data2) {
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
						textP+=							`<input type="button" class="btn btn-primary btn-sm btn-block" value="Add to cart" onclick="add_to_cart('${d.name}','${d.sku}','${d.weight}','${d.price}');"/>`;
						textP+=						'</div>';
						textP+=					'</div>';
				        $("#pro-panel").html(textP);
					})
			    });
			    //get payment list
			    $.getJSON('http://magento1.dev/index.php/hello/index/payment', function(data) {
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
			    $.getJSON('http://magento1.dev/index.php/hello/index/shipping', function(data) {
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
    		$(".proDiv").toggle();
    		$('html,body').animate({ scrollTop: $(".proDiv").offset().top},'slow');

    		//show country
    		$.getJSON('http://magento1.dev/index.php/hello/index/country', function(data) {
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
			$.getJSON('http://magento1.dev/index.php/hello/index/payment', function(data3) {
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
    	$(".ship").click(function() {
    		//SHIPPING METHOD
			$.getJSON('http://magento1.dev/index.php/hello/index/shipping', function(data4) {
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

