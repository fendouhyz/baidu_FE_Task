window.onload = function(){
	var leftInBtn = document.getElementById('leftIn');
	var rigthInBtn = document.getElementById('rightIn');
	var leftPopBtn = document.getElementById('leftPop');
	var rightPopBtn = document.getElementById('rightPop');
	var sortBtn = document.getElementById('sort-btn');
	var queueWrap = document.getElementById('queue-wrap'); 
	var queue ={
		data:[],
		leftIn: function(number){
			this.data.unshift(number);
			this.rederQueue();
		},
		rightIn:function(number){
			this.data.push(number);
			this.rederQueue();
		},
		leftPop:function(number){
			if(this.data.length === 0){
				console.log("error");
			}
			else{
				this.data.shift();
				this.rederQueue();
			}
		},
		rightPop:function(){
			if(this.data.length === 0){
				console.log("error");
			}
			else{
				this.data.pop();
				this.rederQueue();
			}
		},
		rederQueue:function(){
			console.log(this.data);
			var text = "";
			queueWrap.innerHTML = text;
			for(var i in this.data){
				color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
				text += '<div class="queueEle" style = "height:'+this.data[i]+'px;background-color:'+color+'">'+this.data[i]+'</div>';
			}
			queueWrap.innerHTML = text;
			addDeleEvent();
		},
		deleteEle:function(id){
			console.log(id);
			this.data.splice(id,1);
			this.rederQueue();
		},
		showQueue:function(){
			console.log(this.data);
		}
	}
	function addDeleEvent(){
		for (var i = 0;i<queueWrap.childNodes.length;i++){
			EventUtil.addHandler(queueWrap.childNodes[i],'click',function(i){
				return function (){return queue.deleteEle(i)};
			}(i))
		}

	}
	function SortData(){
		var Clock = null;
		var i = 0, j = 0;
		function sortView(){
			if(i === queue.data.length-1 ){
				clearInterval(Clock);
			}
			if(j > queue.data.length - 1){
				i++;
				j = i;

			}
			if(queue.data[i]>queue.data[j]){
				var temp = queue.data[i];
                queue.data[i] = queue.data[j];
                queue.data[j] = temp;
                queue.rederQueue();
			}
			j++;
		}
		Clock = setInterval(sortView,100);
	}
	EventUtil.addHandler(leftInBtn,'click',function(){
		var inputText = document.getElementById('inputNum').value;
		var reg = /[^\d]/;
		console.log(reg.test(inputText));
		if(reg.test(inputText)){
			alert('Please enter an interger!');
			return;
		}
		var inputNum = parseInt(inputText);
		queue.leftIn(inputNum);
		queue.showQueue();
	});
	EventUtil.addHandler(rigthInBtn,'click',function(){
		var inputText = document.getElementById('inputNum').value;
		var reg = /[^\d]/;
		if(reg.test(inputText)){
			alert('Please enter an interger!');
			return;
		}
		var inputNum = parseInt(inputText);
		queue.rightIn(inputNum);
		queue.showQueue();
	});
	EventUtil.addHandler(leftPopBtn,'click',function(){
		queue.leftPop();
		queue.showQueue();
	});
	EventUtil.addHandler(rightPopBtn,'click',function(){
		queue.rightPop();
		queue.showQueue();
	});
	EventUtil.addHandler(sortBtn,'click',function(){
		SortData();
	})
}