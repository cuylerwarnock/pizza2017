class Validation {
	constructor(id, re, msg) {
		this.id = id;
		this.re = re;
		this.errorMsg = msg;
		this.nodeMsg - null; //an HTML element to hold the node containing errorMsg
	}

	validate() {
		let input = this.id.value;
		let validResult = this.re.test(input);
		if (!validResult) {
			if (this.nodeMsg == null) {		
				this.id.style.backgroundColor = "red";
				this.nodeMsg = document.createElement("p");
				this.nodeMsg.textContent = this.errorMsg;
				let parent = document.getElementById("signup");
				parent.insertBefore(this.nodeMsg, this.id);
			}
		}

		else {
			if (this.nodeMsg != null) {
				this.id.style.backgroundColor = "white";
				let parent = document.getElementById("signup");
				parent.removeChild(this.nodeMsg);
			}
		}
		return validResult;
	}
}

function validateEmail() {
	let id = document.getElementById("email");
	let re = /\S+@\S+\.\S+/;
	let v = new Validation(id, re, "Invalid Email");
	id.addEventListener("blur", function() { 
		return v.validate()

	});
}

function validatePassword() {
	let id = document.getElementById("pwd");
	let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z].{8,})/;
	let v = new Validation(id, re, "Invalid Password");
	id.addEventListener("blur", function() { 
		return v.validate()

	});
}