const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

$(document).ready(function () {
	$("#id").on('change', function () {
		$(".data").hide();
		$("#" + $(this).val()).fadeIn(700);
	}).change();
});

function displayData(element) {
	var mailRow = element.parentNode;
	var tema = mailRow.children[0].innerText;
	var fname = mailRow.children[1].innerText;
	var lname = mailRow.children[2].innerText;
	var mail = mailRow.children[3].innerText;
	var msg = mailRow.children[4].innerText;

	document.getElementById('panel').style.display = "block";
	document.getElementById('panel').children[1].innerHTML = tema;
	document.getElementById('panel').children[2].innerHTML = fname;
	document.getElementById('panel').children[2].innerHTML = lname;
	document.getElementById('panel').children[3].innerHTML = mail;
	document.getElementById('panel').children[4].innerHTML = msg;
}

function closeMsg() {
	document.getElementById('panel').style.display = "none";
}
