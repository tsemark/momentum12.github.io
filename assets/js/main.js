/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Testimonial Carousel functionality
	document.addEventListener('DOMContentLoaded', function() {
		let slideIndex = 1;
		const slides = document.getElementsByClassName("testimonial-slide");
		const dots = document.getElementsByClassName("dot");
		const prev = document.querySelector(".prev");
		const next = document.querySelector(".next");

		// Initialize
		showSlides(slideIndex);

		// Next/previous controls
		if(prev) prev.addEventListener('click', () => plusSlides(-1));
		if(next) next.addEventListener('click', () => plusSlides(1));

		// Dot controls
		Array.from(dots).forEach((dot, index) => {
			dot.addEventListener('click', () => currentSlide(index + 1));
		});

		function plusSlides(n) {
			showSlides(slideIndex += n);
		}

		function currentSlide(n) {
			showSlides(slideIndex = n);
		}

		function showSlides(n) {
			if (n > slides.length) {slideIndex = 1}
			if (n < 1) {slideIndex = slides.length}

			Array.from(slides).forEach(slide => slide.style.display = "none");
			Array.from(dots).forEach(dot => dot.classList.remove("active"));

			slides[slideIndex-1].style.display = "block";
			dots[slideIndex-1].classList.add("active");
		}

		// Auto advance slides every 5 seconds
		setInterval(() => plusSlides(1), 5000);
	});

	// Make form functions globally accessible
	window.openForm = function() {
		document.getElementById('formPopup').style.display = 'flex';
	}

	window.closeForm = function() {
		document.getElementById('formPopup').style.display = 'none';
	}

	window.submitForm = function(event) {
		event.preventDefault();
		
		const firstName = document.getElementById('firstName').value;
		const lastName = document.getElementById('lastName').value;
		const countryCode = document.getElementById('countryCode').value;
		const phone = document.getElementById('phone').value;

		// Create the email content
		const formData = new FormData();
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('phone', `${countryCode}${phone}`); // Combine country code with phone
		
		// Replace 'your-email@example.com' with your actual email address
		fetch('https://formsubmit.co/your-email@example.com', {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (response.ok) {
				alert('Thank you! We will contact you soon.');
				closeForm();
				document.getElementById('contactForm').reset();
			} else {
				throw new Error('Something went wrong');
			}
		})
		.catch(error => {
			alert('There was an error submitting your form. Please try again.');
			console.error('Error:', error);
		});
	}

	// Close popups when clicking outside
	window.onclick = function(event) {
		const formPopup = document.getElementById('formPopup');
		if (event.target === formPopup) {
			closeForm();
		}
	}

})(jQuery);