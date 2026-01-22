/*
	Highlights by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$html = $('html');

	// Breakpoints.
		breakpoints({
			large:   [ '981px',  '1680px' ],
			medium:  [ '737px',  '980px'  ],
			small:   [ '481px',  '736px'  ],
			xsmall:  [ null,     '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile) {

			var $wrapper;

			// Create wrapper.
				$body.wrapInner('<div id="wrapper" />');
				$wrapper = $('#wrapper');

				// Hack: iOS vh bug.
					if (browser.os == 'ios')
						$wrapper
							.css('margin-top', -25)
							.css('padding-bottom', 25);

				// Pass scroll event to window.
					$wrapper.on('scroll', function() {
						$window.trigger('scroll');
					});

			// Scrolly.
				$window.on('load.hl_scrolly', function() {

					$('.scrolly').scrolly({
						speed: 600,
						parent: $wrapper,
						pollOnce: true
					});

					$window.off('load.hl_scrolly');

				});

			// Enable touch mode.
				$html.addClass('is-touch');

		}
		else {

			// Scrolly.
				$('.scrolly').scrolly({
					speed: 600
				});

		}

	// Header.
		var $header = $('#header'),
			$headerTitle = $header.find('header'),
			$headerContainer = $header.find('.container');

		// Make title fixed.
			if (!browser.mobile) {

				$window.on('load.hl_headerTitle', function() {

					breakpoints.on('>medium', function() {

						$headerTitle
							.css('position', 'fixed')
							.css('height', 'auto')
							.css('top', '50%')
							.css('left', '0')
							.css('width', '100%')
							.css('margin-top', ($headerTitle.outerHeight() / -2));

					});

					breakpoints.on('<=medium', function() {

						$headerTitle
							.css('position', '')
							.css('height', '')
							.css('top', '')
							.css('left', '')
							.css('width', '')
							.css('margin-top', '');

					});

					$window.off('load.hl_headerTitle');

				});

			}

		// Scrollex.
			breakpoints.on('>small', function() {
				$header.scrollex({
					terminate: function() {

						$headerTitle.css('opacity', '');

					},
					scroll: function(progress) {

						// Fade out title as user scrolls down.
							if (progress > 0.5)
								x = 1 - progress;
							else
								x = progress;

							$headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));

					}
				});
			});

			breakpoints.on('<=small', function() {

				$header.unscrollex();

			});

	// Main sections.
		$('.main').each(function() {

			var $this = $(this),
				$primaryImg = $this.find('.image.primary > img'),
				$bg,
				options;

			// No primary image? Bail.
				if ($primaryImg.length == 0)
					return;

			// Create bg and append it to body.
				$bg = $('<div class="main-bg" id="' + $this.attr('id') + '-bg"></div>')
					.css('background-image', (
						'url("assets/css/images/overlay.png"), url("' + $primaryImg.attr('src') + '")'
					))
					.appendTo($body);

			// Scrollex.
				$this.scrollex({
					mode: 'middle',
					delay: 200,
					top: '-10vh',
					bottom: '-10vh',
					init: function() { $bg.removeClass('active'); },
					enter: function() { $bg.addClass('active'); },
					leave: function() { $bg.removeClass('active'); }
				});

		});

	// Unhelpful Chat Widget.
		(function() {
			var $bubble = $('#chat-bubble');
			var $window = $('#chat-window');
			var $close = $('#chat-close');
			var $input = $('#chat-input');
			var $send = $('#chat-send');
			var $messages = $('#chat-messages');

			var unhelpfulResponses = [
				"Magnus knows .NET and C#. He probably knows other letters too.",
				"Fun fact: Magnus lives in Málaga. It's in Spain. You're welcome.",
				"He's a Senior Consultant at Oktett. I think that means he consults... senior-ly?",
				"Magnus speaks three languages. I speak one. We are not the same.",
				"He studied at NTNU in Norway. That's a university. With letters.",
				"Magnus does backend stuff. The frontend is someone else's problem.",
				"He's been in Spain for 20+ years. That's a lot of paella.",
				"SQL Server, Azure, Terraform... I understood at least one of those words.",
				"Need to contact Magnus? There's an email somewhere. I forget where.",
				"He does integration work. Integrating what? Things, probably.",
				"Magnus has a Masters degree. I have a certificate in being unhelpful.",
				"He manages software teams. I can barely manage this conversation.",
				"Infrastructure is one of his things. Very foundational of him.",
				"Have you tried scrolling down? The information is right there.",
				"I'm programmed to help, but only reluctantly.",
				"Magnus is Norwegian. But geographically Spanish. It's complicated.",
				"He builds SaaS applications. Software as a Service. I offer Sarcasm as a Service.",
				"Error 418: I'm a teapot. But Magnus prefers coffee, probably.",
				"The answer is 42. But the question was about Magnus, so... irrelevant.",
				"I'd tell you more, but then I'd be helpful. Can't have that."
			];

			var konamiHints = [
				"Psst... there might be a secret code on this site. Something something up up down down...",
				"You know what's fun? Pressing arrow keys in a certain order. Just saying.",
				"↑↑↓↓←→←→... those symbols mean nothing. Absolutely nothing. Ignore them.",
				"Old school gamers might know a trick or two on this site...",
				"If only there was some kind of... code. A Konami Code, if you will.",
				"B A start? No wait, that's not quite right either..."
			];

			var lastResponseIndex = -1;
			var messageCount = 0;

			function getResponse() {
				messageCount++;

				// After 3+ messages, 30% chance to hint at Konami code
				if (messageCount >= 3 && Math.random() < 0.3) {
					return konamiHints[Math.floor(Math.random() * konamiHints.length)];
				}

				var index;
				do {
					index = Math.floor(Math.random() * unhelpfulResponses.length);
				} while (index === lastResponseIndex && unhelpfulResponses.length > 1);
				lastResponseIndex = index;
				return unhelpfulResponses[index];
			}

			function addMessage(text, isUser) {
				var $msg = $('<div class="chat-message"></div>')
					.addClass(isUser ? 'user' : 'bot')
					.text(text);
				$messages.append($msg);
				$messages.scrollTop($messages[0].scrollHeight);
			}

			function showTyping() {
				var $typing = $('<div class="chat-message bot typing">MagnusBot is typing...</div>');
				$messages.append($typing);
				$messages.scrollTop($messages[0].scrollHeight);
				return $typing;
			}

			function sendMessage() {
				var text = $input.val().trim();
				if (!text) return;

				addMessage(text, true);
				$input.val('');

				var $typing = showTyping();

				setTimeout(function() {
					$typing.remove();
					addMessage(getResponse(), false);
				}, 1000 + Math.random() * 1500);
			}

			$bubble.on('click', function() {
				$window.toggleClass('active');
				$bubble.removeClass('pulse');
			});

			$close.on('click', function() {
				$window.removeClass('active');
			});

			$send.on('click', sendMessage);

			$input.on('keypress', function(e) {
				if (e.which === 13) sendMessage();
			});
		})();

	// Avatar Lightbox.
		(function() {
			var $trigger = $('#avatar-trigger');
			var $lightbox = $('#avatar-lightbox');

			$trigger.on('click', function(e) {
				e.preventDefault();
				$lightbox.addClass('active');
			});

			$lightbox.on('click', function() {
				$lightbox.removeClass('active');
			});

			$(document).on('keydown', function(e) {
				if (e.keyCode === 27) {
					$lightbox.removeClass('active');
				}
			});
		})();

	// Konami Code Easter Egg.
		(function() {
			var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
			var konamiIndex = 0;

			$(document).on('keydown', function(e) {
				if (e.keyCode === konamiCode[konamiIndex]) {
					konamiIndex++;
					if (konamiIndex === konamiCode.length) {
						konamiIndex = 0;
						activateEasterEgg();
					}
				} else {
					konamiIndex = 0;
				}
			});

			function activateEasterEgg() {
				// Matrix rain effect
				var canvas = document.createElement('canvas');
				canvas.id = 'matrix-canvas';
				canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none;';
				document.body.appendChild(canvas);

				var ctx = canvas.getContext('2d');
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;

				var chars = 'MAGNUSAKSELVOLL.NET#C#ABORTSQLAZURETERRAFORM01';
				chars = chars.split('');
				var fontSize = 14;
				var columns = canvas.width / fontSize;
				var drops = [];

				for (var i = 0; i < columns; i++) {
					drops[i] = 1;
				}

				function draw() {
					ctx.fillStyle = 'rgba(41, 50, 65, 0.05)';
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = '#d4a373';
					ctx.font = fontSize + 'px monospace';

					for (var i = 0; i < drops.length; i++) {
						var text = chars[Math.floor(Math.random() * chars.length)];
						ctx.fillText(text, i * fontSize, drops[i] * fontSize);

						if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
							drops[i] = 0;
						}
						drops[i]++;
					}
				}

				var matrixInterval = setInterval(draw, 35);

				setTimeout(function() {
					clearInterval(matrixInterval);
					canvas.remove();
				}, 5000);
			}
		})();

	// Section Nav Dots.
		var $sectionNav = $('#section-nav');

		if ($sectionNav.length) {
			var $navLinks = $sectionNav.find('a');
			var sections = [];

			// Build sections array.
			$navLinks.each(function() {
				var sectionId = $(this).data('section');
				var $section = $('#' + sectionId);
				if ($section.length) {
					sections.push({
						id: sectionId,
						$el: $section,
						$link: $(this)
					});
				}
			});

			// Update active section on scroll.
			var updateActiveSection = function() {
				var scrollTop = $window.scrollTop();
				var windowHeight = $window.height();
				var activeSection = sections[0];

				for (var i = 0; i < sections.length; i++) {
					var section = sections[i];
					var sectionTop = section.$el.offset().top;
					var sectionHeight = section.$el.outerHeight();

					if (scrollTop >= sectionTop - windowHeight / 2) {
						activeSection = section;
					}
				}

				$navLinks.removeClass('active');
				if (activeSection) {
					activeSection.$link.addClass('active');
				}
			};

			$window.on('scroll', updateActiveSection);
			$window.on('load', updateActiveSection);
		}

})(jQuery);