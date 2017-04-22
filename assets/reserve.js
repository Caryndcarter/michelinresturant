
	
	function Reservation (custName, phone, email, dinerNum) {
		this.custName = custName,
		this.phone = phone,
		this.email = email,
		this.dinerNum = dinerNum,
		this.add = function () {

			var sqlStatement = "INSERT INTO reservations (cust_name, cust_phone, cust_email, diner_number) VALUES ('" + custName + "', '" + phone + "', " + email + ", " + dinerNum + ")";

			connection.query(sqlStatement6, function (err,response) {

				if(err) {
					console.log(err);
				} 
		
			}); 
		}
		
	}

	$(".submit").on("click", function(){

		var newReservation = {
			customerName: $('#res_name').val().trim(),
			phoneNumber: $('#res_phone').val().trim(),
			customerEmail: $('#res_email').val().trim(),
			dinerNumber: $('#res_diners').val().trim(),
		};

		
		var custReservation = new Reservation(
			newReservation.customerName, 
			newReservation.phoneNumber, 
			newReservation.customerEmai, 
			newReservation.dinerNumber
		);

		custReservation.add();

		// This line is the magic. It's very similar to the standard ajax function we used.
		// Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
		// The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
		// depending on if a tables is available or not.

		// Here we get the location of the root page.
		// We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
		var currentURL = window.location.origin;

	    $.post(currentURL + "/api/tables", newReservation,
	    function(data){

	    	// If a table is available... tell user they are booked.
	    	if(data == true){
	    		alert("Yay! You are officially booked!")
	    	}

	    	// If a table is available... tell user they on the waiting list.
	    	if(data == false){
	    		alert("Sorry you are on the wait list")
	    	}

	    	// Clear the form when submitting
    		$('#reserve_name').val("");
			$('#reserve_phone').val("");
			$('#reserve_email').val("");
			$('#reserve_uniqueID').val("");

	    });

return false;

});
