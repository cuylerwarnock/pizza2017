let pizzas = [
	{name: "Pepperoni", img: "pepperoniPizza.jpg", price: 8.99},
	{name: "Chicken Alfredo", img: "chickenAlfredoPizza.jpg", price: 9.99},
	{name: "Works", img: "worksPizza.jpg", price: 10.99}		
];

let desserts = [
	{name: "Cookie Pizza", img: "cookiePizza.jpg", price: 6.99},
	{name: "Cinnamon Sticks", img: "cinnamonSticks.jpg", price: 3.99}
];

let drinks = [
	{name: "Pepsi", img: "pepsi.jpg", price: 2.49},
	{name: "Mountain Dew", img: "mountainDew.jpg", price: 2.49}
]

let arr = [];
/*
for (var item of pizzas) 
	arr.push(item);

for (var item of desserts)
	arr.push(item);

for (var item of drinks)
	arr.push(item);
*/

$(document).ready(function() {
	var jqxhr=$.ajax("/getMenuItems")
	.done(function(docs) {
		for(doc of docs)
			arr.push(doc);
		showMenu();
	})
	.fail(function() {
		alert("Try Again!");
	})
})


function showMenu() {
	for (var item of arr) {
		pizzaDiv.innerHTML += `<div class="row">
			<div class="col-md-3 text-center">
				<h3>${item.name}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<img src="./images/${item.img}" class="pizza" alt="Pepporoni Pizza"> <br> 
			</div>
			<div class="col-md-3 text-center">
				<h3>${item.price}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<button class="btn btn-primary">Order</button>
			</div>
			</div>`;
	}

	/*
	var pizzaDiv = document.getElementById("pizzaDiv");
	var dessertDiv = document.getElementById("dessertDiv");
	var drinkDiv = document.getElementById("drinkDiv");

	for (var item of pizzas) {
		pizzaDiv.innerHTML += `<div class="row">
			<div class="col-md-3 text-center">
				<h3>${item.name}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<img src="./images/${item.img}" class="pizza" alt="Pepporoni Pizza"> <br> 
			</div>
			<div class="col-md-3 text-center">
				<h3>${item.price}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<button class="btn btn-primary">Order</button>
			</div>
			</div>`;
	}

	for (var item of desserts) {
		dessertDiv.innerHTML += `<div class="row">
			<div class="col-md-3 text-center">
				<h3>${item.name}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<img src="./images/${item.img}" class="pizza" alt="Pepporoni Pizza"> <br> 
			</div>
			<div class="col-md-3 text-center">
				<h3>${item.price}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<button class="btn btn-primary">Order</button>
			</div>
			</div>`;
	}

	for (var item of drinks) {
		drinkDiv.innerHTML += `<div class="row">
			<div class="col-md-3 text-center">
				<h3>${item.name}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<img src="./images/${item.img}" class="pizza" alt="Pepporoni Pizza"> <br> 
			</div>
			<div class="col-md-3 text-center">
				<h3>${item.price}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<button class="btn btn-primary">Order</button>
			</div>
			</div>`;
	}
	*/
}

function addToCart(pId) {
	let cartJ = localStorage.getItem("cart");
	let cart;
	if (cartJ ==null) 
		cart = [];
	else
		cart = cartJ.split(",");
	cart.push(pId);
	
	let number = localStorage.getItem("number");
	if (number == null)
		number = 0;
	document.getElementById("numItems").innerHTML = `${++number}`;
	localStorage.setItem("cart", cart.toString());
	localStorage.setItem("number",number);
}

function registerButtonEvents() {
	let buttons = document.getElementsByTagName("button");
	for(let i=0; i<arr.length; i++) {
		buttons[i].addEventListener("click", function () {
			addToCart(i);
		});
	}
	let number = localStorage.getItem("number");
	if (number == null)
		number = 0;
	document.getElementById("numItems").innerHTML = number;
}

function clearCart() {
	localStorage.removeItem("number");
	localStorage.removeItem("cart");
}

function showCart() {
	let cartJ = localStorage.getItem("cart");
	let info="";
	let item;
	let total=0;
	if (cartJ == null)
		document.getElementById("myCart").innerHTML="<h2>You have no items in the cart.</h2>";
	else{
		cart = cartJ.split(",");
		for (i in cart) {
			item = arr[cart[i]];
			if (cart.length != 0) 
				total += item.price;
			else
				total = 0;
			info += `<div class="row">
			<div class="col-md-3 text-center">
				<h3>${item.pizzaName}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<img src="./images/${item.imageName}" class="pizza" alt="Pepporoni Pizza"> <br> 
			</div>
			<div class="col-md-3 text-center">
				<h3>${item.price}</h3>
			</div> 
			<div class="col-md-3 text-center">
				<button class="btn btn-primary" onclick="remove(${i});">remove</button>
			</div>
			</div>`;
		}
		total = total.toFixed(2);
		info += `<h3>Total: ${total}`;
		document.getElementById("myCart").innerHTML = info;
	}
	document.getElementById("numItems").innerHTML = localStorage.getItem("number");
}

function remove(i) {
	var cart = localStorage.getItem("cart");
	cart = cart.split(",");
	cart.splice(i,1);
	if (cart.length == 0)
		clearCart();
	else {
		localStorage.setItem("cart",cart);
		localStorage.setItem("number",cart.length);
		}
	showCart();
}

function sendOrder() {
	cartArr = JSON.parse("["+localStorage.getItem("cart")+"]");
	var itemIds=[];
	if (cartArr === null)
		document.getElementById("cart").value="No item!";
	else
	{
		for (index of cartArr)
			itemIds.push(arr[index]._id);
		var phone=$("#phone").value;
		var order={"phone":phone, "itemIds":itemIds};
		$.ajax({
			mehtod:"post",
			url:"processOrders",
			data: order
		})
		.done(function(result){
			$("#cart").html("your order has been placed!" + result);
		})
	}
}