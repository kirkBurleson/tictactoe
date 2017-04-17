(function() {
	const ds = [9,9,9,9,9,9,9,9,9,9];
	const imageUrls = ["url(o.png)", "url(x.png)"];
	const msg = ["O Wins!", "X Wins!"];
	let turn = 1; // 1 = 'x', 0 = 'o'
	let gameover = false;

	(document.getElementById("sq1")).addEventListener("click", clicked, false);
	(document.getElementById("sq2")).addEventListener("click", clicked, false);
	(document.getElementById("sq3")).addEventListener("click", clicked, false);
	(document.getElementById("sq4")).addEventListener("click", clicked, false);
	(document.getElementById("sq5")).addEventListener("click", clicked, false);
	(document.getElementById("sq6")).addEventListener("click", clicked, false);
	(document.getElementById("sq7")).addEventListener("click", clicked, false);
	(document.getElementById("sq8")).addEventListener("click", clicked, false);
	(document.getElementById("sq9")).addEventListener("click", clicked, false);

	document.addEventListener("keydown", pressed, false);

	function pressed(key) {
		let code = key.keyCode;

		if (code < 97 || code > 105) {
			return;
		}

		// number pad only
		if (code > 96 && code < 100) {
			const element = document.getElementById("sq" + (+(key.key) + 6));
			 return clicked(null, +(key.key) + 6, element);
		}

		if (code > 102 && code < 106) {
			const element = document.getElementById("sq" + (+(key.key) - 6));
			return clicked(null, +(key.key) - 6, element);
		} 
		
		clicked(null, +(key.key), document.getElementById("sq" + key.key));
	}

	function clicked(event, numberPressed, box) {
		let id = numberPressed || +this.id[2];
		
		if (gameover === true) {
			return;
		}
		
		if (ds[id] === 9) {
			let player = (turn === 1) ? turn : 0;

			box ? (box.style.background = imageUrls[player]) : (this.style.background = imageUrls[player]);

			ds[id] = player;
			isGameOver(player);
			turn = +(!turn);
		}
	}

	function isGameOver(player) {
		const one = ds[1];
		const two = ds[2];
		const three = ds[3];
		const four = ds[4];
		const five = ds[5];
		const six = ds[6];
		const seven = ds[7];
		const eight = ds[8];
		const nine = ds[9];
		const diag1 = (one + five + nine);
		const diag2 = (seven + five + three);
		const h1 = (one + two + three);
		const h2 = (four + five + six);
		const h3 = (seven + eight + nine);
		const v1 = (one + four + seven);
		const v2 = (two + five + eight);
		const v3 = (three + six + nine);
		const total = player * 3;

		if (diag1 === total || diag2 === total || h1 === total || h2 === total || h3 === total || v1 === total || v2 === total || v3 === total) {
			(document.getElementById("msg")).innerText = msg[player];
			gameover = true;
		}

		// stalemate
		if (one !== 9 && two !== 9 && three !== 9 && four !== 9 && five !== 9 && six !== 9 && seven !== 9 && eight !== 9 && nine !== 9) {
			(document.getElementById("msg")).innerText = "Game Over!";
			gameover = true;
		}
	}

})();