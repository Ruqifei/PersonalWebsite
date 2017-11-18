// JavaScript Document

var oHeader=$('header');
var oHeaderTime=$('headerTime');
var oHeaderNav=$('headerNav');
var oHeaderArrow=$('headerArrow');
var oContent=$('content');
var oMenu = $('menu');
var aLiMenu = oMenu.getElementsByTagName('li');
var oList=$('list');
var oHomeImg=$('homeImg');
var oHomeBtn=$('homeBtn');
var aLiNav=oHeaderNav.getElementsByTagName('li');
var aLiList=oList.getElementsByClassName('lilist');
var oContactContent1=$('contactContent1');
var oContactContent2=$('contactContent2');

var oMusic = $('headerMusic');
var oAudio = $('audio');
var oLoading = $('loading');

var iContentHeight=0;
var iNow=0;
var prveIndex=0;
var timer=null;

showLoading();
localTime();
headerNav();
ContentHeight();
mouseWheel();
homeImg();
showMusic();


//页面加载
function showLoading(){
	var oSpan = oLoading.getElementsByTagName('span')[0];
	var aDiv = oLoading.getElementsByTagName('div');
	var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','2-1.jpg','2-3.jpg','2-4.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
	var iNow = 0;
	
	for(var i=0;i<arr.length;i++){
		
		var objImg = new Image();
		objImg.src = 'img/'+arr[i];
		objImg.onload = function(){
			iNow++;
			oSpan.style.width = iNow/arr.length*100 + '%';
		};
		
	}
	
	oSpan.addEventListener('transitionend',spanChange,false);
	
	function spanChange(){
		if(oSpan.style.width == '100%'){
			oSpan.style.display = 'none';
			aDiv[0].style.height = 0;
			aDiv[1].style.height = 0;
		}
	}
	
	aDiv[0].addEventListener('webkitTransitionend',divChange,false);
	aDiv[0].addEventListener('transitionend',divChange,false);
	
	
	function divChange(){
		oLoading.parentNode.removeChild(oLoading);
		oMusic.onclick();
		cjAnimate[0].inAn();
	}
}

//音乐播放
function showMusic(){
	var onoff = true;
	oMusic.onclick = function(){
		if(onoff){
			this.style.background = 'url(img/musicon.gif)';
			oAudio.play();
		}
		else{
			this.style.background = 'url(img/musicoff.gif)';
			oAudio.pause();
		}
		onoff = !onoff;
	}
}
	
//header时间函数
function localTime(){
	fnTime();
	setInterval(fnTime,1000);
	
	function fnTime(){
		var myTime=new Date();
		
		var iYear=myTime.getFullYear();
		var iMonth=myTime.getMonth()+1;
		var iDate=myTime.getDate();
		var iWeek=myTime.getDay();
		var iHour=myTime.getHours();
		var iMin=myTime.getMinutes();
		var iSec=myTime.getSeconds();
		var str='';
		
		if(iWeek===0)iWeek='星期日';
		if(iWeek===1)iWeek='星期一';
		if(iWeek===2)iWeek='星期二';
		if(iWeek===3)iWeek='星期三';
		if(iWeek===4)iWeek='星期四';
		if(iWeek===5)iWeek='星期五';
		if(iWeek===6)iWeek='星期六';
		
		str=iYear+'年'+iMonth+'月'+iDate+'日 '+iWeek+' '+toTwo(iHour)+'：'+toTwo(iMin)+'：'+toTwo(iSec);

		var oDiv=oHeaderTime.getElementsByTagName('div')[0];
		oDiv.innerHTML=str;
	}
	
	function toTwo(n){
		return n<10?'0'+n:''+n; 	
	}
}

//header导航函数
function headerNav(){
	var oDiv=aLiNav[0].getElementsByTagName('div')[0];
	oDiv.style.height='100%';
	oHeaderArrow.style.left=aLiNav[0].offsetLeft+aLiNav[0].offsetWidth/2-oHeaderArrow.offsetWidth/2+'px';
	
	for( var i=0;i<aLiNav.length;i++ ){
		aLiNav[i].index=i;
		aLiNav[i].onmousedown=function(){
			prveIndex=iNow;
			iNow=this.index;
			moveNav(this.index);
		}
	}
	
	for( var i=0;i<aLiMenu.length;i++ ){
			aLiMenu[i].index = i;
			aLiMenu[i].onclick = function(){
				prveIndex=iNow;
				iNow=this.index;
				moveNav( this.index );
			};
		}
}

function moveNav(index){
	for( var i=0;i<aLiNav.length;i++ ){
		var oDiv=aLiNav[i].getElementsByTagName('div')[0];
		oDiv.style.height='';
	}
	var oDiv=aLiNav[index].getElementsByTagName('div')[0];
	oDiv.style.height='100%';
	oHeaderArrow.style.left=aLiNav[index].offsetLeft+aLiNav[index].offsetWidth/2-oHeaderArrow.offsetWidth/2+'px';
	
	oList.style.top=-index*iContentHeight+'px';
	
	for( var i=0;i<aLiMenu.length;i++ ){
			aLiMenu[i].className = '';
		}
	aLiMenu[index].className = 'active';
		
	if( cjAnimate[index].inAn() ){
		clearInterval(timer);
		cjAnimate[index].inAn();
	}
	
	if( cjAnimate[prveIndex].outAn() ){
		cjAnimate[prveIndex].outAn();
	}
}

//content高度函数
function ContentHeight(){
	iContentHeight=viewHeight()-oHeader.offsetHeight;
	oContent.style.height=iContentHeight+'px';
	for( var i=0;i<aLiList.length;i++ ){
		aLiList[i].style.height=iContentHeight+'px';	
	}
}

//鼠标滚轮操作
function mouseWheel(){
	var onOff=true;
	var timer=null;
	
	if( oContent.addEventListener ){
		oContent.addEventListener('DOMMouseScroll',function(ev){
			var ev=ev || window.event;
			clearTimeout(timer);
			timer=setTimeout(function(){
				toScroll(ev);
			},200)
		},false);
	}
	oContent.onmousewheel=function(){
			var ev=ev || window.event;
			clearTimeout(timer);
			timer=setTimeout(function(){
				toScroll(ev);
			},200)
		}
	
	function toScroll(ev){
		
		if( ev.detail ){ 
			onOff=ev.detail>0?true:false;
		}else{
			onOff=ev.wheelDelta<0?true:false;
		}
		
		if( (iNow == 0 && !onOff) || (iNow == aLiList.length-1 && onOff) ){return;}
		
		prveIndex=iNow;
		
		if( onOff ){
			if( iNow<aLiNav.length-1 ){
				iNow++;
			}
			moveNav(iNow);
		}else{
			if( iNow>0 ){
				iNow--;
			}
			moveNav(iNow);
		}
		
		if( ev.preventDefault ){
			ev.preventDefault();	
		}else{
			return false;	
		}
	}	
}

function homeImg(){
	var aLi1=oHomeImg.getElementsByTagName('li');
	var aLi2=oHomeBtn.getElementsByTagName('li');
	var oldIndex=0;
	var iNowHome=0;
	
	for( var i=0;i<aLi2.length;i++ ){
		aLi2[i].index=i;
		aLi2[i].onclick=function(){
			for( var i=0;i<aLi2.length;i++ ){
				aLi2[i].className='';
			}
			this.className='active';
			
			if( oldIndex<this.index ){
				aLi1[oldIndex].className='leftHide';
				aLi1[this.index].className='rightShow';
			}else if( oldIndex>this.index ){
				aLi1[oldIndex].className='rightHide';
				aLi1[this.index].className='leftShow';	
			}
			
			oldIndex=this.index;
			iNowHome=this.index;
		}	
	}
	
	var timer = setInterval(change,3000);
		
	oHomeImg.onmouseover = function(){
		clearInterval(timer);
	};
	
	function change(){
		iNowHome++;
		
		if(iNowHome == aLi2.length){
			iNowHome = 0;
		}
		
		for(var i=0;i<aLi2.length;i++){
			aLi2[i].className = '';
		}
		aLi2[iNowHome].className = 'active';
		aLi1[oldIndex].className = 'leftHide';
		aLi1[iNowHome].className = 'rightShow';
		
		oldIndex = iNowHome;
		
	}
}	
	
var cjAnimate = [
	{
		inAn : function(){
			oHomeImg.style.opacity = 1;
			oHomeBtn.style.opacity = 1;
			setStyle(oHomeImg,'transform','translate(0,0)');
			setStyle(oHomeBtn,'transform','translate(0,0)');
		},
		outAn : function(){
			oHomeImg.style.opacity = 0;
			oHomeBtn.style.opacity = 0;
			setStyle(oHomeImg,'transform','translate(0,-200px)');
			setStyle(oHomeBtn,'transform','translate(0,200px)');
		}
	},
	{
		inAn : function(){
			var oDivList=aLiList[1].getElementsByClassName('divlist')[0];
			var aImgBox=oDivList.getElementsByClassName('imgBox');
			
			for(var i=0;i<aImgBox.length;i++){
				aImgBox[i].style.opacity=1;	
			}
			
			setStyle(aImgBox[0] , 'transform','translate(0,0)');
			setStyle(aImgBox[1] , 'transform','translate(0,0)');
			setStyle(aImgBox[2] , 'transform','translate(0,0)');
			setStyle(aImgBox[3] , 'transform','translate(0,0)');
			setStyle(aImgBox[4] , 'transform','translate(0,0)');
			setStyle(aImgBox[5] , 'transform','translate(0,0)');
		},
		outAn : function(){
			var oDivList=aLiList[1].getElementsByClassName('divlist')[0];
			var aImgBox=oDivList.getElementsByClassName('imgBox');
			
			for(var i=0;i<aImgBox.length;i++){
				aImgBox[i].style.opacity=0;	
			}
			
			setStyle(aImgBox[0] , 'transform','translate(-100px,-100px)');
			setStyle(aImgBox[1] , 'transform','translate(0,-100px)');
			setStyle(aImgBox[2] , 'transform','translate(100px,-100px)');
			setStyle(aImgBox[3] , 'transform','translate(-100px,100px)');
			setStyle(aImgBox[4] , 'transform','translate(0,100px)');
			setStyle(aImgBox[5] , 'transform','translate(100px,100px)');
		}
	},
	{
		inAn : function(){
			var oDivList=aLiList[2].getElementsByClassName('divlist')[0];
			var aExpContent=oDivList.getElementsByClassName('exp_content');
			
			for(var i=0;i<aExpContent.length;i++){
				aExpContent[i].style.opacity=1;	
			}
			
			setStyle(aExpContent[0] , 'transform','translate(0,0)');
			setStyle(aExpContent[1] , 'transform','translate(0,0)');
			setStyle(aExpContent[2] , 'transform','translate(0,0)');
		},
		outAn : function(){
			var oDivList=aLiList[2].getElementsByClassName('divlist')[0];
			var aExpContent=oDivList.getElementsByClassName('exp_content');
			
			for( var i=0;i<aExpContent.length;i++){
				aExpContent[i].style.opacity=0;	
			}
		
			setStyle(aExpContent[0] , 'transform','translate(300px,500px)');
			setStyle(aExpContent[1] , 'transform','translate(0,500px)');
			setStyle(aExpContent[2] , 'transform','translate(-300px,500px)');
		}
	},
	{
		inAn : function(){ 
			printer();
			
			var aP1=oContactContent2.querySelectorAll("p:nth-of-type(odd)");
			var aP2=oContactContent2.querySelectorAll("p:nth-of-type(even)");
			
			for(var i=0;i<aP1.length-1;i++){
				aP1[i].style.opacity=1;
			}

			for(var i=0;i<aP2.length;i++){
				aP2[i].style.opacity=1;
			}
			
			setStyle(aP1[0] , 'transform','translate(0,0)');
			setStyle(aP1[1] , 'transform','translate(0,0)');
			setStyle(aP1[2] , 'transform','translate(0,0)');
			setStyle(aP2[0] , 'transform','translate(0,0)');
			setStyle(aP2[1] , 'transform','translate(0,0)');
			setStyle(aP2[2] , 'transform','translate(0,0)');
			
			setStyle(oContactContent1 , 'transform','translate(0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)');
		},
		outAn : function(){
			var oPrinter=document.getElementById('printer');
			clearInterval(timer);
			oPrinter.innerHTML="";
			
			var aP1=oContactContent2.querySelectorAll("p:nth-of-type(odd)");
			var aP2=oContactContent2.querySelectorAll("p:nth-of-type(even)");
			
			for(var i=0;i<aP1.length-1;i++){
				aP1[i].style.opacity=0;
			}

			for(var i=0;i<aP2.length;i++){
				aP2[i].style.opacity=0;
			}
	
			setStyle(aP1[0] , 'transform','translate(-200px,0)');
			setStyle(aP1[1] , 'transform','translate(-200px,0)');
			setStyle(aP1[2] , 'transform','translate(-200px,0)');
			setStyle(aP2[0] , 'transform','translate(200px,0)');
			setStyle(aP2[1] , 'transform','translate(200px,0)');
			setStyle(aP2[2] , 'transform','translate(200px,0)');
		
			setStyle(oContactContent1 , 'transform','scale(0.01) rotateX(360deg) rotateY(360deg) rotateZ(360deg)');
		}
	}
]

for(var i=0;i<cjAnimate.length;i++){
	cjAnimate[i].outAn();
}

function printer(){
	var text="自我评价：自学能力较强，具有良好的沟通能力，对IT行业比较感兴趣，对技术的更迭比较感兴趣，能适应高强度的工作。 目前已掌握HTML5,CSS3,JavaScript,jQuery,Bootstrap等相关前端技术，且正在学习angluar和移动端开发的相关知识。 目前所掌握的知识均为本人业余时间自学，同时我也使用了Bootstrap开发了一个响应式的考满分官网首页。"
	var oPrinter=document.getElementById('printer'); 
	var L = text.length;
	var num = 0;
	var arr = [];    
	for(var i = 0; i < L; i++){    
		arr[i] = text.substr(i,1);    
	} 
	
	timer = setInterval(function(){
		if(num < L){    
			oPrinter.append(arr[num]);  
			num++;    
		}else{
		   clearInterval(timer);   
		}
	},100);  	
}


function $(id){
	return document.getElementById(id);	
}

function viewWidth(){
	return document.innerWidth || document.documentElement.clientWidth;
}

function viewHeight(){
	return document.innerHeight || document.documentElement.clientHeight;
}

function setStyle(obj,attr,value){
	obj.style[attr] = value;
	obj.style['webkit'+attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
}
