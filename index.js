let bullet=document.querySelector(".bullets_counter .bullets")
let currentIndex=0;
let result=0;
let button=document.getElementsByTagName("button")[0]
let radio=document.querySelectorAll(".answer input")
    let title=document.querySelector(".title h1")
    let label=document.querySelectorAll(".answer label")
    let the_time=document.querySelector(".counter p")
    let ansewrs=document.querySelector(".answers")
    
    function fetchQuestions(){
            let questionsData=fetch("./index.json").then((res)=>{
                return res.json()
            }).then((data)=>{
                question_number(data.length)
                bullets(data.length)
                add_data(data.length,data)
            //check_answer(obj,obj.length)
                count_down(15,data.length)
                button.onclick=function(){
                
                    currentIndex++
                    bulletsMarking(data.length);
                    check_answer(data,data.length)
                    console.log(result)
                    remove_data(data.length)
                    add_data(data.length,data)
                    remove_checked()
                    add_result(data.length)
                    clearInterval(counterFunction)
                    count_down(15,data.length)     
                }
            }).catch((err)=>{
                console.log(err)
            })
    
    }



fetchQuestions();
function question_number(num){
  document.querySelector(".category_count p span").innerHTML=num

}
function bullets(numm){
    for(let i=0;i<numm;i++){
        let span=document.createElement("span")
        bullet.append(span)
        if(i===0){
            span.className="on"
        }

    }
}
let butt=document.getElementsByTagName("button")[0]
butt.onclick=function(){
    butt.style.backgroundColor="#0277bd"
}
butt.onblur=function(){
    butt.style.backgroundColor="#039be5"
}
function bulletsMarking(num){
    if(currentIndex<num){
        for(let i=0;i<num;i++){
            if(currentIndex===i){
                let bullet_span=document.querySelectorAll('.bullets span')
                bullet_span[i].className="on"
            }
        }
    }
  
}

function add_data(num,obj){
    if(currentIndex<num){
       // console.log(obj[0])
    title.innerHTML=obj[currentIndex].title
        //improve this
        label[0].innerHTML=obj[currentIndex].answer1
        label[1].innerHTML=obj[currentIndex].answer2
        label[2].innerHTML=obj[currentIndex].answer3
        label[3].innerHTML=obj[currentIndex].answer4
    
    }
}

function check_answer(obj,num){
    if(currentIndex<num){
        let choosendata="kk"
        let correct
    
        radio[0].setAttribute("data-answer",obj[currentIndex].answer1)
        radio[1].setAttribute("data-answer",obj[currentIndex].answer2)
        radio[2].setAttribute("data-answer",obj[currentIndex].answer3)
        radio[3].setAttribute("data-answer",obj[currentIndex].answer4)
    
        for(let i=0;i<4;i++){
             correct=obj[currentIndex-1].correctAnswer
            if(radio[i].checked===true){
                choosendata=label[i].innerHTML
               // console.log(choosendata)
            
            
                 if(choosendata==correct){
                        result++          
                }
            }
       
        }
    }
   
}

 
function remove_checked(num){
    for(let i=0;i<4;i++){
        if(radio[i].checked===true){
            radio[i].checked=false
            
        }
    }
   

}

function remove_data(num){
    title.innerHTML=""
    //removing radio and label
    for(let i=0;i<4;i++){
       label[i].innerHTML=""
    }
    if(currentIndex===num){
        for(let z=0;z<4;z++){
            radio[z].remove()
        }
        bullet.innerHTML=""
        the_time.remove()
        button.remove()
        ansewrs.remove()
    }
}

function add_result(num){
    if(num===currentIndex){
        let resultt=document.createElement("p")
        resultt.className="result"
        let spann=document.createElement("span")
        let describ
        if(result===num){
            spann.innerHTML="perfect "
            spann.className="perfect"

        }
        else if(result>=num/2){
            spann.innerHTML="good "
            spann.className="good"
        }
        else if(result<num/2){
            spann.innerHTML="bad "
            spann.className="bad"
        }
        resultt.innerHTML=`you answered <span>${result} </span> from <span>${num}</span>`
        resultt.prepend(spann)
        console.log(resultt)
        document.body.querySelector(".quizArea").append(resultt)
    }
}


function count_down(duration,count){
    if(currentIndex<count){
        counterFunction=setInterval(function(){
            let minute
            let second
            minute=parseInt(duration/60)
            second=parseInt(duration%60)
            duration--
            if(duration<0){
                clearInterval(counterFunction)
                button.click()
            }
            the_time.innerHTML=`${minute}:${second}`
            
    
        },1000)
    }
    
}

