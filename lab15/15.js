$(document).ready(function(){
    let count = $(".slider_item").length;
    $(".range_slider").attr("max", count-3);

    $(".slider_item").hover(
        function(){
            $(this).css("border", "2px solid black");
            $(".name", this).css("color", "rgb(255, 0, 0)");
            $(".avatar", this).stop().fadeOut(400);
            $(".messager", this).css("display", "flex").stop().fadeIn(400);
        },
        function(){
            $(this).css("border", "2px solid rgb(206, 206, 206)");
            $(".name" , this).css("color", "black");
            $(".messager", this).stop().fadeOut(400);
            $(".avatar", this).stop().fadeIn(400);
        }
    )

    let positionPX = 0;
    let position = 1;
    const wrapper = $('.slider_wrapper');
    let movePX = 0;

    function Translate(){
        if(this.value>position){
            movePX = (Number(this.value) - Number(position))*300;
            positionPX-=movePX;
            wrapper.css({transform:`translateX(${positionPX}px)`})
        } else {
            movePX = Math.abs(Number(this.value) - Number(position))*300;
            positionPX+=movePX;
            wrapper.css({transform:`translateX(${positionPX}px)`})
        }
        position=this.value;
    }

    $(document).keydown(function(event){
        if(event.code == "ArrowRight"){
            TranslateByKey("right");
        } else if (event.code == "ArrowLeft"){
            TranslateByKey("left");
        }
    });

    function TranslateByKey(direction){
        if(direction === "right"){
            if(Number($(".range_slider").attr("max"))>position){
                $(".range_slider").val(++position);
                positionPX-=300;
                wrapper.css({transform:`translateX(${positionPX}px)`});
            }
        } else {
            if(Number($(".range_slider").attr("min"))<position){
                $(".range_slider").val(--position);
                positionPX+=300;
                wrapper.css({transform:`translateX(${positionPX}px)`});
            }
        }
    }

    $(".range_slider").on("input", Translate);

    $(".range_slider").mouseup(
        function(){
        this.blur();
        }
    )

});

