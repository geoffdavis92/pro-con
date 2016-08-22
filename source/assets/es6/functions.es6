/**
 * @author Geoff Davis <geoffdavis92@gmail.com>
 * @name params
 * @description Get URL parameters
 * @var {Array} q URL "search" query
 * @var {Object} o Object used to construct key/val pairs
 * @return {Object} Key/value pairs of URL parameters
 */
const params = function params() {
    var q = window.location.search.split('?')[1].split('&'),
        o = {};
    for (k in q) {
        o[q[k].split('=')[0]] = decodeURIComponent(q[k].split('=')[1].replace(/\+/g,' '));
    }
    return o;
}

const scrapeForm = function (formSelector) {
	let formInput = document.querySelectorAll(formSelector + ' input'),
		data = [];
	// console.log(formInput);
	formInput.forEach(function(el,i,arr) {
		if ( el.type != 'submit' ) {
			data.push({
				name: el.id,
				value: el.type != 'radio' && el.value ? el.value : el.type == 'radio' && el.checked ? true : false,
				isRequired: el.required
			});
		}
	});
	return data;
}

const setFormFields = function() {
	document.querySelector('[name="title"]').value = 'Sample Title'
	document.querySelector('[id="alignment-pro"]').checked = true;
	document.querySelector('[name="value"]').value = 1
	document.querySelector('[name="description"]').value = 'sample description';
	return null;
}

const getData = function(endpoint,params={},callback) { 
	endpoint += '?';
	for (let key in params) {
		endpoint += `${key}=${params[key]}&`
	}
	endpoint = endpoint.replace(/\&$/g,'');
	return AJAX.get(endpoint,null,function(data) {
		callback(data);
	});
}

const postData = function(endpoint,params,callback= () => false) {
	// return AJAX.post(endpoint,data,function(data) {
	// 	callback(data)
	// });
	endpoint += '?';
	for (let key in params) {
		endpoint += `${key}=${params[key]}&`
	}
	endpoint = endpoint.replace(/\&$/g,'');
	return AJAX.get(endpoint,null,function(data) {
		callback(data);
	});
}