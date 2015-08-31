$(document).ready(function(){
	/* =========================
	   ScrollReveal
	   (on scroll fade animations)
	============================*/
	var revealConfig = { vFactor: 0.20 }
	window.sr = new scrollReveal(revealConfig);


	/* =========================
	   Detect Mobile Device
	============================*/
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};


	/* =================================
	   AjaxChimp JS
	   (Integrate subscribe form w/ Mailchimp)
	====================================*/
	$('.the-subscribe-form').ajaxChimp({
		callback: mailchimpCallback,
	    url: 'http://bookle.us11.list-manage.com/subscribe/post?u=bf479c994f6d8fd0d64cbe3e9&amp;id=a3f9cb3468'
	});

	// callback function when the form submitted, show the notification box
	function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('#subscribe-success-notification').addClass('show-up');
        }
        else if (resp.result === 'error') {
             $('#subscribe-error-notification').addClass('show-up');
        }
    }

    /* ==================================
	   Hero Form Validation
	=====================================*/
	$('#hero-submit').click(function(e){

        // Stop form submission & check the validation
        e.preventDefault();

        // Variable declaration
        var error = false;
        var fname = $('#hero-fname').val();
        var email = $('#hero-email').val();
        var username = $('#hero-username').val();

     	// Form field validation
        if(fname.length == 0){
            var error = true;
            $('#hero-fname').parent('div').addClass('field-error');
        }else{
            $('#hero-fname').parent('div').removeClass('field-error');
        }
        if(email.length == 0 || email.indexOf('@') == '-1'){
            var error = true;
            $('#hero-email').parent('div').addClass('field-error');
        }else{
            $('#hero-email').parent('div').removeClass('field-error');
        }
        if(username.length == 0){
            var error = true;
            $('#hero-username').parent('div').addClass('field-error');
        }else{
            $('#hero-username').parent('div').removeClass('field-error');
        }

        if(error == true){
        	$('#hero-error-notification').addClass('show-up');
        }else{
           $('#hero-error-notification').removeClass('show-up');
        }

        if(error == false){
            $.post("hero-form.php", $("#register-form").serialize(),function(result){
                if(result == 'sent'){
                    $('#hero-success-notification').addClass('show-up');
                    $('#hero-submit').addClass('disabled');
                }
            });
        }
    });


	// Function to close the Notification
    $('a.notification-close').click(function(){
	    $(this).parent('div').fadeOut(200);
    });


});



