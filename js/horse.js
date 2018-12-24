$(document).ready(function(){
    var _index = 0;
    var _before_index = 0;
    var _clear_time = null;
    $(".img-circle-wrapper span").mouseover(function() {
        clearInterval(_clear_time);
        _index = $(this).index();
        ScrollPlay();
        _before_index = _index;
    }).mouseout(function(){
        AutoPlay();
    });
    $(".img-wrapper .img-prev").click(function(){
        _index--;
        if(_index < 0) { 
            _index = 2;
            _before_index = 0;
        }
        ScrollPlay();
        _before_index = _index;
    }).mouseover(function(){
        clearInterval(_clear_time);
    }).mouseout(function(){
        AutoPlay();
    });
    $(".img-wrapper .img-next").click(function(){
        _index++;
        if(_index > 2) { 
            _index = 0;
            _before_index = 2;
        }
        ScrollPlay();
        _before_index = _index;
    }).mouseover(function(){
        clearInterval(_clear_time);
    }).mouseout(function(){
        AutoPlay();
    });
    $(".img-wrapper").hover(function(){
        $("a.img-prev, a.img-next").show();
    }, function(){
        $("a.img-prev, a.img-next").hide();
    });

    img_box.addEventListener('touchstart',touchs,false);
    img_box.addEventListener('touchmove',touchs,false);
    img_box.addEventListener('touchend',touchs,false);

    AutoPlay();
    function AutoPlay() {
        _clear_time = setInterval(function(){
            _index++;
            if(_index > 2) { 
                _index = 0;
                _before_index = 2;
            }
            ScrollPlay();
            _before_index = _index;
        }, 6666);
    }

    function ScrollPlay() {
        $(".img-circle-wrapper span").eq(_index).addClass("hover").siblings("span").removeClass("hover");
        if(_index === 0 && _before_index === 2) {
            $(".img-scroll img").eq(_before_index).css("left","0%").animate({"left":"100%"}, 300);
            $(".img-scroll img").eq(_index).css("left","-100%").animate({"left":"0%"}, 300);
        }
        else if(_index === 2 && _before_index === 0) {
            $(".img-scroll img").eq(_before_index).css("left","0%").animate({"left":"-100%"}, 300);
            $(".img-scroll img").eq(_index).css("left","100%").animate({"left":"0%"}, 300);
        }
        else if(_index > _before_index) {
            $(".img-scroll img").eq(_before_index).css("left","0%").animate({"left":"-100%"}, 300);
            $(".img-scroll img").eq(_index).css("left","100%").animate({"left":"0%"}, 300);
        }
        else if(_index < _before_index) {
            $(".img-scroll img").eq(_before_index).css("left","0%").animate({"left":"100%"}, 300);
            $(".img-scroll img").eq(_index).css("left","-100%").animate({"left":"0%"}, 300);
        }
    }

    var startx,starty,movex,movey,endx,endy,nx,ny,angle;
    function touchs(event){
        event.preventDefault();
        
        if(event.type=="touchstart"){
            clearInterval(_clear_time);
            var touch = event.touches[0];
            startx = Math.floor(touch.pageX);
            starty = Math.floor(touch.pageY);
        }else if(event.type=="touchmove"){
            var touch = event.touches[0];
            movex = Math.floor(touch.pageX);
            movey = Math.floor(touch.pageY);
        }else if(event.type == "touchend" || event.type == "touchcancel"){
            endx = Math.floor(event.changedTouches[0].pageX);
            endy = Math.floor(event.changedTouches[0].pageY);
            nx = endx-startx;
            ny = endy-starty;

            angle = Math.atan2(ny, nx) * 180 / Math.PI;
            
            AutoPlay();
            if(Math.abs(nx)<=1 ||Math.abs(ny)<=1){
                return false;
            }
            if(angle<45 && angle>=-45){
                _index--;
                if(_index < 0) { 
                    _index = 0;
                }
                ScrollPlay();
                _before_index = _index;
                return false;
            }else if((angle<=180 && angle>=135) || (angle>=-180 && angle<-135 )){
                _index++;
                if(_index > 2) { 
                    _index = 2;
                }
                ScrollPlay();
                _before_index = _index;
                return false;
            }
        }
    }
});