$(function(){
    /*
    产生poke
    黑桃  s
    红桃  h
    梅花  c
    方块  d
     */
    let color = ['c','s','h','d'];
    let poke = [];
    let flag = {};
    for(let i=0;i<52;i++){
        let hua = color[Math.floor(Math.random()*color.length)];
        let num = Math.floor(Math.random()*13+1);
        while (flag[`${hua}_${num}`]){
             hua = color[Math.floor(Math.random()*color.length)];
             num = Math.floor(Math.random()*13+1);
        }
        poke.push({hua,num});
        flag[`${hua}_${num}`]=true;

    }
    /*
    桌面上的
     */
    let index = 0;
    for(let i=0;i<7;i++){
        for(let j = 0 ;j<=i;j++){
            let left = 300-50*i+100*j,
                top = 60*i;

                $('<div>').addClass('hot')
                    .attr('id',`${i}_${j}`)
                    .data('num',poke[index].num)
                    .css('background',`url(img/${poke[index].num}${poke[index].hua}.png) no-repeat center / cover`)

                    .appendTo('.zhuozi').delay(index*10)
                    .animate({left,top});
            index++;
        }

    }
    /*
    剩余的
     */
    for(;index<poke.length;index++){
        $('<div>').addClass('hot zuo')
            .data('num',poke[index].num)
            .attr('id',`${-3}_${-3}`)
            .css('background',`url(img/${poke[index].num}${poke[index].hua}.png) no-repeat center / cover`).appendTo('.zhuozi').delay(index*10).animate({left:0,top:540,opacity:1})
    }
    /*
    点击
     */
    let first = null;
    $('.zhuozi').on('click','.hot',function(e){
        let element = $(e.target);
        let ids =element.attr('id').split('_');
        let ele1 = `#${ids[0]*1+1}_${ids[1]*1}`;
        let ele2 = `#${ids[0]*1+1}_${ids[1]*1+1}`;
        if($(ele1).length || $(ele2).length){
            return;
        }
        element.toggleClass('active');
        if(element.hasClass('active')){
            element.animate({top:'-=20'})
        }else{
            element.animate({top:'+=20'})
        }

        if(!first){
            first =$(e.target);
        }else{
            if(first.data('num') + element.data('num') == 13 ){
                $('.active').animate({left:700,top:0,opacity:0},function(){
                    $(this).remove();
                })
            }else{
                $('.active').animate({top:'+=20'},function(){
                    $(this).removeClass('active');
                })
            }
            first = null;

        }
    })
    /*
    翻牌
     */
    let zindex = 0 ;
    $('.btnx').click(function(){
        if(!$('.zuo').length){
            return;
        }
        $('.zuo').eq(-1).css('zIndex',zindex++).delay().animate({left:600}).removeClass('zuo').addClass('you')
    })

    $('.btns').click(function(){
        if(!$('.you').length){
            return;
        }
        $('.you').each(function(index){
            $(this).css('zIndex',zindex++).delay(index*10).animate({left:0}).removeClass('you').addClass('zuo')
        })
    })

})