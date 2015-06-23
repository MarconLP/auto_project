	var soundBoardListener = function(events) {
		var speech_recognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;

		if (!speech_recognition)
			return;

		var final_transcript = '';

		var rec = new speech_recognition();

		rec.lang = 'de-DE';
		rec.continuous = true;
		rec.interimResults = true;
		rec.maxAlternatives = 5;

		rec.onend = function() {
			final_transcript = '';
			rec.start();
		};

		rec.onresult = function(event) {
			var interim_transcript = '';

			if (typeof(event.results) == 'undefined')
			{
				rec.abort();
				rec.start();
				return;
			}

			for (var i = event.resultIndex; i < event.results.length; ++i)
			{
				if (event.results[i].isFinal)
					final_transcript += event.results[i][0].transcript;
				else
					interim_transcript += event.results[i][0].transcript;
			}

			var transcript = (final_transcript.length > 0 ? final_transcript : interim_transcript).toLowerCase();
        
        console.log('transcript: ', transcript);

			for (var i = 0, len = events.length; i < len; i++)
			{
				if (events[i].string)
				{
					if (transcript.lastIndexOf(events[i].string) !== -1)
					{
						events[i].fnc();

						rec.abort();
						rec.start();
						return;
					}
				}
				else if (events[i].regex)
				{
					var matches = transcript.match(events[i].regex);

					if (matches === null)
						continue;

					if (matches.length === 1)
					{
						events[i].fnc();

						rec.abort();
						rec.start();
						return;
					}
					else if (matches.length > 1)
					{
						if (events[i].match_sound)
						{
							if (sounds.exists(matches[1]))
							{
								events[i].fnc(matches[1]);

								rec.abort();
								rec.start();
								return;
							}
						}
						else
						{
							events[i].fnc(matches[1]);

							rec.abort();
							rec.start();
							return;
						}
					}
				}
			}
		};

		rec.start();
	};


