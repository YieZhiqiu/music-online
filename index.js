


$(function(){
	$('.navList >li ').on('click', function(e){  //tab切换栏
		let $li = $(e.currentTarget).addClass('active')
		$li.siblings('').removeClass('active')
		let index = $li.index()
		$li.trigger('tabChange', index)
		$('.tab > li').eq(index).addClass('active').siblings().removeClass()
          // console.log(index)
	})

	
	
    var month = new Date().getMonth()+1;
    var day = new Date().getDate();
    $('.data-hot').html('更新日期：'+month+'月'+day+'日' ) //热歌榜中更新日期


	$('.siteNav').on('tabChange', function(e, index){
		let $li = $('.tab > li').eq(index)
		if($li.attr('data-downloaded') === 'yes'){
			return
		}
		if(index === 1){
			$.get('./page2.json').then(function(response){ //热歌榜列表		
				let list = response
				list.forEach(function(i){
					let $li = $(`
                    <li>
						<a href="./song.html?id=${i.id}">
							<div class="rank">${i.num}</div>
							<div class="rankes">
								<h3>${i.name}</h3>
								<p>${i.singer}</p>

								<svg class="icon icon-newPlay">
								    <use xlink:href="#icon-newPaly"></use>
								</svg>
							</div>
				    	</a>
 		        	</li>

						`)
					$('.hotMusic').append($li)
				})
				
				 $li.attr('data-downloaded', 'yes')
			})
		}else if(index === 2){
			$.get('./page3.json').then((response)=>{
				$li.text(response.content)
				$li.attr('data-downloaded','yes')
			})
		}
	})

})

$(function(){  //搜索栏中的搜索功能
	$('#searchSong').on('input',function(e) {
		$('.tab').addClass('playing')
		$('.holder').empty()
		if(e.target.value.length == 0){
			$('.tab').removeClass('playing')
			$('.holder').html(" 搜索歌曲、歌手、专辑")
		}
	});
	$('.icon-fork').on('click', function(){
		$('.tab').removeClass('playing')
		$('input').val('')
	})
})

let timer = undefined
$('input#searchSong').on('input', function(e){
	let $input = $(e.currentTarget)
	let value = $input.val().trim()
    if(value === ''){return}
    
    if(timer){
    	clearTimeout(timer)
    }

    timer = setTimeout(function(){
    	search(value).then((result)=>{  //当搜索不存在时返回‘没有结果’
    		timer = undefined
			if(result.length !== 0){
				$('.output').text(result.map((r)=>r.name).join(','))
			}else{
				$('.output').text('没有结果')
			}
	    })
    },800)
	
})



function search(keyword){ //搜索栏中的搜索功能的库
	console.log('搜索'+ keyword)
	return new Promise((resolve, reject)=>{
		var database = [
            {"id": 1, "name": "那些花儿",},
            {"id": 2, "name": "情非得已",},
            {"id": 3, "name": "找自己",}
		]
		let result = database.filter(function(item){
			return item.name.indexOf(keyword)>=0
		})
		setTimeout(function(){
			console.log('搜索'+keyword + '的结果')
			resolve(result)
		},(Math.random()*800 + 1000))
	})
	
}
 window.search = search

$(function(){                  //推荐音乐中的最新列表
	$.get('./index.json').then(function(response){   //获取index文件
	 // console.log('1')
		let items = response	      //将response中的数据传递到items中
		 items.forEach(function(i){                  //遍历items并且拼接HTML
			let $li = $(`   
			    	<li>
						<a href="./song.html?id=${i.id}">
							<h3>${i.name}</h3>
							<p>${i.singer}</p>
							<svg class="icon icon-newPlay">
							    <use xlink:href="#icon-newPaly"></use>
							</svg>
				    	</a>
 		        	</li>
				`)
			$('.lastesMusic').append($li)	          //将拼接好的li添加到class中	
		})
		$('.loading').remove()  //移除loading的加载动画
		
	}, function(){

	})
})


