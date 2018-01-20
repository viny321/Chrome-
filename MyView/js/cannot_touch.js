function btn_move(el,mouseleft,mousetop){
	el.innerHTML = "a";
}

function over_btn(e){
	if(!e){
		e = window.event;
	}
	//btn_move(this,e.clientX,e.clientY);
	this.innerHTML = "a";
}

document.getElementById('aaa').onmouseover=over_btn;