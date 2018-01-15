(function() {
	const	ds = [9,9,9,9,9,9,9,9,9,9],
			images = ["x.png", "o.png"],
			msg = ["X Wins!","O Wins!"];
	var turn = 0, // 1 = 'x', 0 = 'o'
		gameover = false;

	(document.getElementById("board")).addEventListener("click", clicked, false)
	document.addEventListener("keydown", pressed, false)

	function pressed(key) {
		var code = key.keyCode

		if (code < 97 || code > 105) {
			return
		}

		// number pad only
		if (code > 96 && code < 100) {
			const element = document.getElementById("sq" + (+(key.key) + 6))
			 return clicked(null, +(key.key) + 6, element)
		}

		if (code > 102 && code < 106) {
			const element = document.getElementById("sq" + (+(key.key) - 6))
			return clicked(null, +(key.key) - 6, element)
		} 
		
		clicked(null, +(key.key), document.getElementById("sq" + key.key))
	}

	function clicked(event, numberPressed, box) {
		if (event) event.stopPropagation()

		var id = numberPressed || +event.target.id[2]
		
		if (gameover === true) {
			return;
		}
		
		if (ds[id] === 9) {
			const image = new Image()
			image.src = images[turn]
			box ? box.appendChild(image) : event.target.appendChild(image)

			ds[id] = turn
			isGameOver(turn)
			turn = +(!turn)
		}
	}

	function isGameOver(player) {
		const 	one = ds[1],
				two = ds[2],
				three = ds[3],
				four = ds[4],
				five = ds[5],
				six = ds[6],
				seven = ds[7],
				eight = ds[8],
				nine = ds[9],
				diag1 = (one + five + nine),
				diag2 = (seven + five + three),
				h1 = (one + two + three),
				h2 = (four + five + six),
				h3 = (seven + eight + nine),
				v1 = (one + four + seven),
				v2 = (two + five + eight),
				v3 = (three + six + nine),
				total = player * 3;

		if (diag1 === total || diag2 === total || h1 === total || h2 === total || h3 === total || v1 === total || v2 === total || v3 === total) {
			(document.getElementById("msg")).innerText = msg[player]
			gameover = true
			return
		}

		// stalemate
		if (one !== 9 && two !== 9 && three !== 9 && four !== 9 && five !== 9 && six !== 9 && seven !== 9 && eight !== 9 && nine !== 9) {
			(document.getElementById("msg")).innerText = "Game Over!"
			gameover = true
		}
	}

})();