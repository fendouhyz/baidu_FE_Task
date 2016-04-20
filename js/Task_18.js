window.onload = function(){
	var leftInBtn = document.getElementById('leftIn');
	var rigthInBtn = document.getElementById('rightIn');
	var leftPopBtn = document.getElementById('leftPop');
	var rightPopBtn = document.getElementById('rightPop');
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
				text += '<div class="queueEle">'+this.data[i]+'</div>';
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
}