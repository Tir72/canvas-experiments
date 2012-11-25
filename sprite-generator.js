/*jshint: asi:true*/
(function(){
	var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		elems = document.body.querySelectorAll('*'),
		img, img2, i = 0, bgImgSrc, bgImg, bgObj = {}, key, top = 0,
		last, domain = location.host

	canvas.width = 0
	canvas.height = 0
	document.body.appendChild(canvas)

	for(; i<elems.length; i++){
		bgImgSrc = getComputedStyle(elems[i]).backgroundImage
		bgImg = bgImgSrc.substring(4, bgImgSrc.length-1)
		if(bgImgSrc && bgImgSrc != 'none' && ~bgImg.indexOf(domain) && !bgObj[bgImg]){
			bgObj[bgImg] = true
			img = new Image(); //toca crearlo...
			img.onload = appendImage
			img.src = bgImg
		}
	}
	for(key in bgObj){
		if(bgObj.hasOwnProperty(key)){
			img2 = new Image();
			img2.onload = addToCanvas
			img2.src = key
			last = key
		}
	}

	function appendImage(){
		canvas.height = canvas.height + this.height
		canvas.width = Math.max(canvas.width, this.width)
	}

	function addToCanvas(){
		ctx.drawImage(this, 0, top, this.width, this.height)
		top += this.height
		if(this.src == last){
			var resultImg = document.createElement('img'),
				container = document.createElement('div')

			container.innerHTML = '<h1>Este es el sprite de la página:<h1>'
			
			resultImg.src = canvas.toDataURL()
			container.appendChild(resultImg)
			document.body.parentNode.appendChild(container)
			document.body.style.display = 'none'
		}
	}
})()