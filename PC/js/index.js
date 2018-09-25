
     if(window.addEventListener){
        window.addEventListener('DOMContentLoaded',main);
     }else{
         window.onload=main;
     }
   function main() {
    //获取元素
        //头部DOM元素
        var liNodes=document.querySelectorAll('#header .headerMain .nav li');
        var upNodes=document.querySelectorAll('#header .headerMain .nav li .up');
        var arrow=document.querySelector('#header .headerMain .arrow');
        //内容DOM元素
        var contentulNode = document.querySelector('#content .contentMain');
        var contentNode = document.getElementById('content');
        //第一屏
        var pointLiNodes=document.querySelectorAll('#content .contentMain .home .home_point li');
        var carouselLiNodes=document.querySelectorAll('#content .contentMain .home .home_carousel li');
        var carouselUlNode=document.querySelector('#content .contentMain .home .home_carousel');
        //第二屏
        var planeNodes=document.querySelectorAll('.plane1,.plane2,.plane3');
        //第三屏
        var pencelNodes=document.querySelectorAll('.pencel1,.pencel2,.pencel3');
        //第四屏
        var aboutPhotoNodes=document.querySelectorAll('.about .about_photo');
        //第五屏
        var title=document.querySelector('#content .contentMain .team .team_title');
        var text=document.querySelector('#content .contentMain .team .team_text');
        //侧边小圆点
        var navBarLiNodes=document.querySelectorAll('.navBar li');

        //初始化索引下标
        var nowIndex = 0;
        var lastIndex=0;
       //出入场动画
       var animationArr=[
           {
               //第一个入场动画
               anIn: function () {
                   carouselUlNode.style.transform = 'translateY(0)';
                   carouselUlNode.style.opacity = 1;
               },
               //第一个出场动画
               anOut: function () {
                   carouselUlNode.style.transform = 'translateY(-50%)';
                   carouselUlNode.style.opacity = '0';
               }

           },
           {
               //第二个入场动画
               anIn: function () {
                   planeNodes[0].style.transform = 'translate(0,0)';
                   planeNodes[1].style.transform = 'translate(0,0)';
                   planeNodes[2].style.transform = 'translate(0,0)';
               },

               //第二个出场动画
               anOut: function () {
                   planeNodes[0].style.transform = 'translate(-100px,-100px)';
                   planeNodes[1].style.transform = 'translate(100px,100px)';
                   planeNodes[2].style.transform = 'translate(100px,-100px)';
               }

           },
           {

               //第三个入场动画
               anIn: function () {
                   pencelNodes[0].style.transform = 'translateY(0)';
                   pencelNodes[1].style.transform = 'translateY(0)';
                   pencelNodes[2].style.transform = 'translateY(0)';
               },

               //第三个出场动画
               anOut: function () {
                   pencelNodes[0].style.transform = 'translateY(-100px)';
                   pencelNodes[1].style.transform = 'translateY(100px)';
                   pencelNodes[2].style.transform = 'translateY(100px)';
               }

           },
           {
               //第四个入场动画
               anIn: function () {
                   aboutPhotoNodes[0].style.transform = 'rotate(0)';
                   aboutPhotoNodes[1].style.transform = 'rotate(0)';
               },

               //第四个出场动画
               anOut: function () {
                   aboutPhotoNodes[0].style.transform = 'rotate(45deg)';
                   aboutPhotoNodes[1].style.transform = 'rotate(-45deg)';
               }
           },
           {
               //第五个入场动画
               anIn: function () {
                   title.style.transform = 'translateX(0)';
                   text.style.transform = 'translateX(0)';
               },

               //第五个出场动画
               anOut: function () {
                   title.style.transform = 'translateX(-150px)';
                   text.style.transform = 'translateX(150px)';
               }

           }
       ];
       for (var i = 0; i < animationArr.length; i++) {
           //所有屏幕出场动画
           animationArr[i].anOut();
       }

       //开机动画
       bootAnimation();
       function bootAnimation() {
           var make = document.querySelector('#make');
           var makeUp = document.querySelector('#make .up');
           var makeDown = document.querySelector('#make .down');
           var makeLine = document.querySelector('#make .line');
           var number = 0;
           var arr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'team.png', 'greenLine.png'];
           for (var i = 0; i < arr.length; i++) {
               var item = arr[i];
               var img = new Image();
               img.onload = function () {
                   number++;
                   var percent = number / arr.length;
                   makeLine.style.width = percent * 100 + '%';
                   if (percent === 1) {
                       makeUp.style.height = '0';
                       makeDown.style.height = '0';
                       makeLine.style.display = 'none';
                       if (document.addEventListener) {
                           makeUp.addEventListener('transitionend', function () {
                               make.remove();
                               //默认第一屏显示i
                               animationArr[0].anIn();
                           })
                       } else {
                           setTimeout(function () {
                               make.remove();
                               //默认第一屏显示
                               animationArr[0].anIn();
                           }, 1000)
                       }

                   }
               };
               img.src = '../img/' + item;
           }

       }
        //头部
        header();
        function header() {
            upNodes[0].style.width = '100%';
            //初始三角
            arrow.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';
            for (var i = 0; i < liNodes.length; i++) {
                //获取每次的索引值
                liNodes[i].index = i;
                liNodes[i].onclick = function () {
                    nowIndex = this.index;
                    move(nowIndex);
                }
            }
        }

        //逻辑
        function  move() {
                //首先将up的宽全部设置为空
                upNodes[lastIndex].style.width='';
                navBarLiNodes[lastIndex].className='';
                animationArr[lastIndex].anOut();
                //点击谁谁宽100%
                upNodes[nowIndex].style.width='100%';
                //小箭头
                arrow.style.left=liNodes[nowIndex].getBoundingClientRect().left+liNodes[nowIndex].offsetWidth/2-arrow.offsetWidth/2+'px';
                //内容区域
                contentulNode.style.top=-nowIndex*contentNode.offsetHeight+'px';
                //将当前侧边导航加上lass
                 navBarLiNodes[nowIndex].className='active';
                 //当切换到哪一屏 哪一屏做入场动画
                 animationArr[nowIndex].anIn();
                 lastIndex=nowIndex;
            }

           //内容
        content();
         function content() {
             //页面滚动
             //兼容ie/chrome
             document.onmousewheel = wheel;
             //兼容firefox
             if (document.addEventListener) {
                 document.addEventListener('DOMMouseScroll', wheel);
             }
             var timers = null;
             function  wheel(event) {

                 event = event || window.event;
                 //清除延时器
                 clearTimeout(timers);
                 //设置延时器
                 timers = setTimeout(function () {
                     var flag = '';
                     if (event.wheelDelta) {
                         //ie chrome
                         if (event.wheelDelta > 0) {
                             flag = 'up';
                         } else {
                             flag = 'down';
                         }
                     } else if (event.detail) {
                         //firefox
                         if (event.wheelDelta < 0) {
                             flag = 'up';
                         } else {
                             flag = 'down';
                         }
                     }
                     //滚轮被触发

                     switch (flag) {
                         case 'up':
                             if (nowIndex > 0) {
                                 nowIndex--;
                                 move(nowIndex);
                             }
                             break;
                         case 'down':
                             if (nowIndex < 4) {
                                 nowIndex++;
                                 move(nowIndex);
                             }
                             break;
                     }
                     event.preventDefault() && event.preventDefault();
                     return false;

                 }, 250);
             }

             //用户缩放浏览器
             window.onresize=function () {
                 arrow.style.left=liNodes[nowIndex].getBoundingClientRect().left+liNodes[nowIndex].offsetWidth/2-arrow.offsetWidth/2+'px';
                 // contentMain.style.top=-this.index*contentNode.offsetHeight+'px';
             }

         }

        // 第一屏轮播
        home();
        function  home() {
            var lastIndex=0;
            var nowIndex=0;
            var time=null;
            var lastTime=0;
            //点击小圆点
            for (var i = 0; i < pointLiNodes.length; i++) {
                if(nowIndex<lastIndex) return;
                pointLiNodes[i].index=i;
                pointLiNodes[i].onclick=function () {
                    //清除定时器
                    clearInterval(time);
                    //函数节流
                    var nowTime=Date.now();
                    if(nowTime-lastTime<2100){
                        return;
                    }
                    //同步当前小圆点索引
                    nowIndex=this.index;
                    //点击当前小圆点
                    if(lastIndex===nowIndex) return;
                    //清除li上原有的class
                    for (var j = 0; j < carouselLiNodes.length; j++) {
                        carouselLiNodes[j].className='commonTitle';
                    }
                   if(nowIndex>lastIndex){
                        //点击后边小圆点
                       carouselLiNodes[nowIndex] .className='commonTitle rightShow';
                       carouselLiNodes[lastIndex] .className='commonTitle leftHide';
                   }else {
                       //点击前边小圆点
                       carouselLiNodes[nowIndex] .className='commonTitle leftShow';
                       carouselLiNodes[lastIndex] .className='commonTitle rightHide';
                   }
                    //修正小圆点
                    pointLiNodes[lastIndex].className='';
                    pointLiNodes[nowIndex].className='active';
                    //同步当前索引
                    lastIndex=nowIndex;
                    //同步当前时间
                    lastTime=nowTime;
                    //重新开启定时器
                    autoPlay();
                }

            }
            //等第一屏开始过渡时，开启自动轮播
            carouselUlNode.addEventListener('transitionend', fn);

            function fn() {
                autoPlay();
                //只能触发一次，触发后要移除当前事件
                carouselUlNode.removeEventListener('transitionend', fn)
            }
            function autoPlay() {
                time=setInterval(function () {
                    nowIndex++;
                    if(nowIndex===4){
                        nowIndex=0;
                    }
                    //点击后边小圆点
                    carouselLiNodes[nowIndex] .className='commonTitle rightShow';
                    carouselLiNodes[lastIndex] .className='commonTitle leftHide';
                    pointLiNodes[lastIndex].className='';
                    pointLiNodes[nowIndex].className='active';
                    lastIndex=nowIndex;
                    //更新时间
                    lastTime=Date.now();
                },2300)
            }
            //鼠标移入移出事件
            carouselUlNode.onmouseenter=function () {
                clearInterval(time);
            };
            carouselUlNode.onmouseleave=autoPlay;
        }

        //第五屏
        team();
        function team() {
            var teamUlNode=document.querySelector('#content .contentMain .team .team_list');
            var teamLiNodes=document.querySelectorAll('#content .contentMain .team .team_list li');
            //保存canvas容器
            var canvas=null;
            //定时器
            var timer1=null;
            var timer2=null;
            for (var i = 0; i < teamLiNodes.length; i++) {
                teamLiNodes[i].index=i;
                teamLiNodes[i].onmouseenter=function () {
                    for (var j = 0; j < teamLiNodes.length; j++) {
                        //全部变为透明
                        teamLiNodes[j].style.opacity = '0.5';
                    }
                    teamLiNodes[this.index].style.opacity = '1';
                    addCanvas(this.index);
                }
                teamUlNode.onmouseleave=function () {
                    for (var j = 0; j < teamLiNodes.length; j++) {
                        teamLiNodes[j].style.opacity = 1;
                    }
                    canvas.remove();
                    canvas=null;
                    clearInterval(timer1);
                    clearInterval(timer2);
                }
            }

            //创建canvas
            function addCanvas(index) {
                //判断有没有canvas
                //     没有创建一个
                //     有就用之前的
                if(!canvas){
                    canvas=document.createElement('canvas');
                    //设置宽高
                    canvas.width=236;
                    canvas.height=448;
                    //位置
                    canvas.style.position='absolute';
                    canvas.style.left=index*236+'px';
                    bubble();
                    teamUlNode.appendChild(canvas);
                }else {
                    canvas.style.left=index*236+'px';
                }
            }
            //气泡运动
            function bubble() {
                if(canvas.getContext){
                    var ctx=canvas.getContext('2d');
                    //创建一个空数组
                    var circleArr=[];
                    //定时器循环生成随机圆
                    timer1= setInterval(function () {
                        //颜色随机
                        var r=Math.round(Math.random()*255);
                        var g=Math.round(Math.random()*255);
                        var b=Math.round(Math.random()*255);
                        //半径随机
                        var arc=Math.round(Math.random()*8+2);
                        //起始位置随机
                        var x=Math.round(Math.random()*canvas.width);
                        var y=canvas.height+arc;
                        //缩放系数随机
                        var scale=Math.round(Math.random()*50+20);
                        var deg=0;
                        circleArr.push({
                            r:r,
                            g:g,
                            b:b,
                            arc:arc,
                            x:x,
                            y:y,
                            scale:scale,
                            deg:deg
                        })
                    },30);
                    //画圆
                    timer2=setInterval(function () {
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        for (var i = 0; i < circleArr.length; i++) {
                            //获取每一个
                            var item=circleArr[i];
                            item.deg+=2;
                            //转换弧度
                            var rad=item.deg*Math.PI/180;
                            //圆心坐标
                            var x=item.x+Math.round(Math.sin(rad)*item.scale);
                            var y=item.y-Math.round(rad*item.scale);
                            if(y<=0){
                                circleArr.splice(i,1);
                                continue;
                            }
                            ctx.fillStyle='rgb('+ item.r+ ','+item.g +','+item.b +')';
                            ctx.beginPath();
                            ctx.arc(x,y,item.arc,0,2*Math.PI);
                            ctx.fill();
                        }
                    },1000/60)
                }else {alert('您的浏览器不支持canvas')}
            }
        }
        
        //侧边小圆点事件
        for (var i = 0; i < navBarLiNodes.length; i++) {
            navBarLiNodes[i].index=i;
            navBarLiNodes[i].onclick=function () {
                nowIndex=this.index;
                move(nowIndex);
            }
        }

        //音频
        var music=document.querySelector('.music');
        var audioNode = document.querySelector('.music audio');
        music.onclick=function () {
            if(audioNode.paused){
                audioNode.play();
                this.style.backgroundImage='url("../img/musicon.gif")';
            }else{
                audioNode.pause();
                this.style.backgroundImage='url("../img/musicoff.gif")';
            }
        };
        //自动播放
        audioNode.play();
        //静音取消
        audioNode.muted=false;


    };
