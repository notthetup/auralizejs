(function() {
	var Auralizr = require('../../lib/auralizr.js');
	var auralizr = new Auralizr();

	var impulseResponses = {
		'mausoleum' : 'public/audio/h.wav',
		'basement' : 'public/audio/s1.wav',
		'chapel' : 'public/audio/sb.wav',
		'stairwell' : 'public/audio/st.wav'
	};

	if (auralizr.userMediaSupport){
		var onAuralizrLoad = function (key){
				var element = document.getElementsByClassName(key)[0];
				if (element) {
					enableClickFunctionality(element);
					element.innerHTML = '▶';
				}
			};
		for( var key in impulseResponses){
			auralizr.load(impulseResponses[key], key, onAuralizrLoad);
		}
	}

	function resetAllSpans() {
		var allPlaces =  [].slice.call(document.getElementsByClassName('place'));
		allPlaces.forEach(function(element) {
			element.classList.remove('enabled');
			if (element.innerHTML === '❚❚')
				element.innerHTML = '▶';
		});
	}

	function enableThisSpan(element){
		element.classList.add('enabled');
		element.innerHTML = '❚❚';
	}

	function enableClickFunctionality(element){
		element.addEventListener('click',function(event){

			if (element.innerHTML === '▶'){
				resetAllSpans();
				auralizr.use(this.id);
				if (!auralizr.isRunning){
					auralizr.start();
				}
				enableThisSpan(element);
			}else{
				// Pause
				auralizr.stop();
				resetAllSpans();
			}
		}, false);
	}
})();
