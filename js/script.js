const submitNewWordBtn = $('#submit-new-word');
const newWordModal = $('#new-word-modal');
var triggered = false; // trigger for listeners for edit and delete buttons

const addNewWord = () => {
	const word = $('#newWord').val();
	const dict = $('input[name=dict]:checked').val();
	const gender = $('input[name=gender]:checked').val();
	const pos = $('input[name=pos]:checked').val(); //Position of Speech
	const meaning = $('#meaning').val();

	const submission = {
		word: word,
		dict: dict,
		gender: gender,
		pos: pos,
		meaning: meaning,
	}

	localforage.getItem(dict).then(function(dictionaryDB) {
	    // This code runs once the value (dictionaryDB) has been loaded
	    // from the offline store.

	    // 1. Push new data into old data
	    dictionaryDB.push(submission);

	    // 2. Save new data to localstorage
	    localforage.setItem(dict, dictionaryDB, () => {
	    	console.log("Saved succcessfully!!!");
	    });
	    console.log(dictionaryDB);
	}).catch(function(err) {
	    // This code runs if there were any errors
	    // Data not found => create new
	    let dictionary = [];
	    dictionary.push(submission);
	    localforage.setItem(dict, dictionary, () => {
	    	console.log("First save succcessfully;");
	    });
	    console.error(err);
	});


}

submitNewWordBtn.click(addNewWord);
newWordModal.keypress((event)=>{
	if (event.keyCode === 13) { // Enter
		addNewWord();
	}
});



$(document).ready(function() {

	localforage.getItem('jare-eng').then(function(dictionaryDB) {
	    // This code runs once the value (dictionaryDB) has been loaded
	    // from the offline store.

	    $('#jare-eng-table').DataTable( {
	        "processing": true,
	        "data": dictionaryDB,
	        "columns": [
	            { "data": "word", "title": "Words", "className": "d_word"},
	            { "data": "pos", "title": "POS", "className": "d_pos"},
	            { "data": "gender", "title": "Gender", "className": "d_gender"},
	            { "data": "meaning", "title": "English meaning", "className": "d_meaning"},
	            { "defaultContent": `<i class="fa fa-pencil-square-o edit" aria-hidden="true"></i>
	            <i class="fa fa-times delete" aria-hidden="true"></i>`},
	        ]
	    } );
	    
	}).catch(function(err) {
	    // This code runs if there were any errors
	    // Data not found => create new
	    console.error(err);
	});

	localforage.getItem('eng-jare').then(function(dictionaryDB) {
	    // This code runs once the value (dictionaryDB) has been loaded
	    // from the offline store.

	    $('#eng-jare-table').DataTable( {
	        "processing": true,
	        "data": dictionaryDB,
	        "columns": [
	            { "data": "word", "title": "Words", "className": "d_word"},
	            { "data": "pos", "title": "POS", "className": "d_pos"},
	            { "data": "meaning", "title": "Jarethien words", "className": "d_meaning"},
	            { "defaultContent": `<i class="fa fa-pencil-square-o edit" aria-hidden="true"></i>
	            <i class="fa fa-times delete" aria-hidden="true"></i>`},
	        ]
	    } );
	    
	}).catch(function(err) {
	    // This code runs if there were any errors
	    // Data not found => create new
	    console.error(err);
	});

} )

$('table').on('click', '.edit', (event) => {
	var currentTable = $(event.target).closest('table').attr('id').split('-table')[0];
	var currentWord = $(event.target).closest('tr')[0].firstChild.outerText;

	localforage.getItem(currentTable).then(function(dictionaryDB) {
		var wordData;
	    // This code runs once the value (dictionaryDB) has been loaded
	    // from the offline store.

	    // 1. Use for loop to get the word's data

	    for (var i of dictionaryDB) {
	    	if(i.word == currentWord) {
	    		wordData = i;
	    	}
	    }


	    // 2. Set them to form's content


	    
	    var formAlert = '<form id="edit"><fieldset class="form-group"><label for="newWord">Add word</label>'+
        			'<input type="text" name="word" class="form-control" id="newWord" placeholder="New word" value='+ wordData.word +'>'+
        			'</fieldset><fieldset class="form-group"><label>to</label><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="dict" id="jare-eng" value="jare-eng"'+
					(wordData.dict=='jare-eng'? ' checked': '')
					+'>'+
					'Jarethien-English Dictionary</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="dict" id="eng-jare" value="eng-jare"'+
					(wordData.dict=='eng-jare'? ' checked': '')
					+'>'+
					'English-Jarethien Dictionary</label></div></fieldset><fieldset class="form-group"><label>Gender</label>'+
					'<div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="gender" id="neuter" value="neuter"'+
					(wordData.gender=='neuter'? ' checked': '')
					+'>'+
					'Neuter</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="gender" id="masculine" value="masculine"'+
					(wordData.gender=='masculine'? ' checked': '')
					+'>'+
					'Masculine</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="gender" id="feminine" value="feminine"'+
					(wordData.gender=='feminine'? ' checked': '')
					+'>'+
					'Feminine</label></div></fieldset><fieldset class="form-group"><label>Type</label>'+
					'<div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="pos" id="noun" value="noun"'+
					(wordData.pos=='noun'? ' checked': '')
					+'>'+
					'Noun</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="pos" id="verb" value="verb"'+
					(wordData.pos=='verb'? ' checked': '')
					+'>'+
					'Verb</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="pos" id="adjective" value="adjective"'+
					(wordData.pos=='adjective'? ' checked': '')
					+'>'+
					'Adjective</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="pos" id="adverb" value="adverb"'+
					(wordData.pos=='adverb'? ' checked': '')
					+'>'+
					'Adverb</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="pos" id="adposition" value="adposition"'+
					(wordData.pos=='adposition'? ' checked': '')
					+'>'+
					'Adposition</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="pos" id="pronoun" value="pronoun"'+
					(wordData.pos=='pronoun'? ' checked': '')
					+'>'+
					'Pronoun</label></div><div class="form-check"><label class="form-check-label">'+
					'<input type="radio" class="form-check-input" name="pos" id="other" value="other"'+
					(wordData.pos=='other'? ' checked': '')
					+'>'+
					'Other</label></div></fieldset><fieldset class="form-group"><label for="meaning">Meaning</label>'+
					'<input type="text" name="meaning" class="form-control" id="meaning" placeholder="Word meaning" value="'+wordData.meaning+'">'+
					'</fieldset></form>';
		bootbox.dialog({
			title: "Edit ...",
		    message: formAlert,
		    buttons: {
		        cancel: {
		            label: '<i class="fa fa-times"></i> Cancel'
		        },
		        confirm: {
		            label: '<i class="fa fa-check"></i> Confirm',
		            callback: function (result) {
				        console.log('This was logged in the callback: ' + result);
				        // 1. GET data from edit form, save into an object
				        const fieldsets = $('#edit')[0].children;
				        const newWordData = {};
				        for (var i of fieldsets) {
				        	newWordData[i.elements[0].name] = i.elements[0].value;
				        }

				        // 2. Find old word in db, replace with new one
				        localforage.getItem(currentTable).then(function(dictionaryDB) {
				        	console.log(dictionaryDB)
						    for (var i of dictionaryDB) {
						    	if(i.word == currentWord) {
						    		console.log(i, currentWord)
						    		i.word = newWordData.word;
						    		i.gender = newWordData.gender;
						    		i.pos = newWordData.pos;
						    		i.meaning = newWordData.meaning;
						    		i.dict = newWordData.dict;
						    		break;
						    	}
						    }
							console.log(dictionaryDB)
				        	// 3. Save db
				        	localforage.setItem(currentTable, dictionaryDB, () => {
						    	console.log("Saved succcessfully!!!");
						    });

						}).catch(function(err) {
						    console.error(err);
						});

				    }
		        }
		    }
		})
	}).catch(function(err) {
	    console.error(err);
	});

	
});

$('table').on('click', '.delete', (event) => {
	var currentTable = $(event.target).closest('table').attr('id').split('-table')[0];
	var currentWord = $(event.target).closest('tr')[0].firstChild.outerText;

	localforage.getItem(currentTable).then(function(dictionaryDB) {
		var wordData;
	    // This code runs once the value (dictionaryDB) has been loaded
	    // from the offline store.

	    // 1. Use for loop to get the word's data

	    for (var i in dictionaryDB) {
	    	if(dictionaryDB[i].word == currentWord) {
	    		dictionaryDB.splice(i, 1);
	    		break;
	    	}
	    }
	    console.log(dictionaryDB)

		localforage.setItem(currentTable, dictionaryDB, () => {
	    	console.log("Delete succcessfully!!!");

	    	localforage.getItem(currentTable).then(function(DB){
		    	console.log(DB)
		    })

	    });

	    

	}).catch(function(err) {
		console.error(err);
	});
});