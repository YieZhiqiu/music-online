


// $(function(){
// 	let id = parseInt(location.seach.matches(/\bid=([^&]*)/)[1],10)
//     $.get('/page2.json').then(function(object){


// 		let audio = document.createElement('audio')
// 		// audio.src = "${i.lyric}"
// 		// audio.src = "http://www.170mv.com/kw/sh.sycdn.kuwo.cn/resource/n2/57/84/441487173.mp3"
// 		audio.src = "http://other.web.nf01.sycdn.kuwo.cn/resource/n1/67/48/429546822.mp3"
// 		audio.oncanplay = function(){
// 			audio.play()
// 		}

// 		$('.icon-pause').on('click', function(){
// 			$('.disc').addClass('playing')
// 			audio.pause()
// 		})
// 		$('.icon-play').on('click', function(){
// 			$('.disc').removeClass('playing')
// 			audio.play()
// 		})
		
// 	})
// })


// $(function(){
// 	$.get('/song.json').then(function(object){
// 		let {lyric} = object;
// 		let array = lyric.split('\n')
// 		let regex = /^\[(.+)\](.*)$/
// 		console.log(object)
// 		array = array.map(function(string,index){
// 			let matches = string.match(regex) 
// 			if(matches){
// 				return {time: matches[1],words: matches[2]}
// 			}
// 		})
// 		let $lyric = $('.lyric')
// 		array.map(function(object){
// 			if(!object){return}
// 		    let $p = $('<li/>')
// 		    $p.attr('data-time', object.time).text(object.words)
// 		    $p.appendTo($lyric.children('.show'))
// 		})

// 	})
// })



	// setInterval(()=>{
	// 		let seconds = audio.currentTime
	// 		let munites = ~~(seconds / 60)
	// 		let left = seconds - munites * 60
	// 		let time = '${pad(munites)}:${pad(left)}'
	// 		let $show = $('.lines>p')
	// 		for (let i=0; i<$show.length; i++){
	// 			if($ling.eq(i).attr('data-time') < time && $show.eq(i+1).attr('data-time') > time){
	// 				console.log($show[i])
	// 				break
	// 			}
	// 		}
	// 	},1000)
	// 	
	// 	
	// 	
	














$(function(){
	  // let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
   
     let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
   
     // console.log(location.search)
     // console.log('1')

	$.get('./page2.json').then(function(response){
		let songs = response
		let song = songs.filter(s=>s.id === id)[0]
		let {url, name, lyric, img, background} = song

		initPlayer.call(undefined, url)
		initText(name, lyric, img, background)
		
		
	})
     
	function initText(name, lyric, img, background){
		var backgroundUrl = background
		$('.page').css('background', 'url(https://p4.music.126.net/UchPsP2m7PVP66l5NwRf8w==/17712032812204490.jpg)')
		$('.page').attr('style','background-image: url("' + backgroundUrl + '")')
		
		
        $('.disc > 。disc-container > .disc-picture').attr('src', img)

		$('.song-description > h2').text(name) 
		parseLyric(lyric)
	}

	function initPlayer(url){
		let audio = document.createElement('audio')
		audio.src = url
		// audio.src = "http://www.170mv.com/kw/sh.sycdn.kuwo.cn/resource/n2/57/84/441487173.mp3"
		// audio.src = "http://other.web.nf01.sycdn.kuwo.cn/resource/n1/67/48/429546822.mp3"
		audio.oncanplay = function(){
			audio.play()
		}

		$('.icon-pause').on('click', function(){
			$('.disc').addClass('playing')
			audio.pause()
		})
		$('.icon-play').on('click', function(){
			$('.disc').removeClass('playing')
			audio.play()
		})
		setInterval(()=>{
           let seconds = audio.currentTime
           let munites = ~~(seconds / 60)
           let left = seconds - munites * 60
           let time = `${pad(munites)}:${pad(left)}`
           let $show = $('.show > p')
           let $whichLine
           for (let i=0; i<$show.length; i++){
	           	let currentLineTime = $show.eq(i).attr('data-time')
	           	let nextLineTime = $show.eq(i+1).attr('data-time')
	           	if($show.eq(i+1).length !== 0 && currentLineTime < time && nextLineTime > time){
	           		$whichLine = $show.eq(i)
	           		break
	           	}
           }
           // console.log($whichLine)
           if($whichLine){     
	           	let top = $whichLine.offset().top
	           	// console.log(top)
	           	let showTop = $('.show').offset().top
	         	// console.log(showTop)
	           	let delta = top - showTop
	            // console.log(delta)
	           	$('.show').css('transform', `translateY(-${delta}px)`)
           }
		},3000)
	}

	function pad(number){
		return number>=10 ? number + '' : '0' + number
	}

	

	function parseLyric(lyric){
		let array = lyric.split('\n')
		let regex = /^\[(.+)\](.*)$/
		array = array.map(function(string,index){
			let matches = string.match(regex) 
			if(matches){
				return {time: matches[1],words: matches[2]}
			}
		})
		let $lyric = $('.lyric')
		array.map(function(object){
			if(!object){return}
		    let $p = $('<p/>')
		    $p.attr('data-time', object.time).text(object.words)
		    $p.appendTo($lyric.children('.show'))
		})
	}
})
