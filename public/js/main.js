let form = document.querySelector('form');
let input = document.querySelector('form input');
let icon = document.querySelector('#icon');
let messagesBox1 = document.querySelector('#message-1');
let messagesBox2 = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = input.value;

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
				messagesBox1.innerHTML = data.error;
			} else {
				console.log(response.status);
				console.log(data);
				icon.src = data.icon;
				messagesBox1.innerHTML = data.location;
				messagesBox2.innerHTML = data.forecast;
			}
		});
	});
});
