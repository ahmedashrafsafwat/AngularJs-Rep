var moment = require('moment');
 require('./controller.js');
var stopwatch =0;
var flag = false;

function getScope(ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
    return angular.element(sel).scope();
}
function updateTimer(deadline){
 // var time = deadline.diff(now).format("hh:mm:ss");
    var now = moment();
    
   var time = moment(deadline.diff(now));
    
 
  return {
    'days': Math.floor( time/(1000*60*60*24) ),
    'hours': Math.floor( (time/(1000*60*60)) % 24 ),
    'minutes': Math.floor( (time/1000/60) % 60 ),
    'seconds': Math.floor( (time/1000) % 60 ),
    'total' : time
  };
}


var stopwatcher = "";
function stopWatch(count) {
    if(!flag)
   stopwatcher = moment().hour(0).minute(0).second(count++) ;
    else 
        count = 0;
    
        //stopwatcher.add(1,"seconds");
  //  console.log(count);
  // console.log(stopwatcher);
    return    {
    'days': stopwatcher.format("dd"),
    'hours': stopwatcher.format("HH"),
    'minutes': stopwatcher.format("mm"),
    'seconds': stopwatcher.format("ss"),
    'total' : stopwatcher,
    'count':count
  };
       
}

function animateClock(span){
  span.className = "turn";
   // console.log("ANIMATED! !!!!");
  setTimeout(function(){
    span.className = "";
  },700);
   
}
var timer = "";
var lastHour = 0;
var lastMin = 0;
var lastSec = 0;
function startTimer(id, deadline ,clientId){
var updatedCounter = 0
var $scope = getScope('myController');
var clientsArr = $scope.clients;
  var timerInterval = setInterval(function(){
     
    var clock = document.getElementById(clientId);
      for(var i in clientsArr){
      if($scope.clients[i].clientId == clientId) 
         {
            if($scope.clients[i].openTimeStoped) {
                clearInterval(timerInterval);
              
                var audio = new Audio('./Assests/quite-impressed.mp3');
                audio.play();
                console.log("countdown have stoped the clock!!");
            }
         }
      }
      if (deadline === 0) { 
          timer =stopWatch(updatedCounter);
          updatedCounter = timer.count; 

         
      }else{
         timer = updateTimer(deadline); 
        //  console.log(timer);
      
      }
      
          console.log("End button not pressed");
     clock.innerHTML = '<span>' + timer.days + '</span>'
                    + '<span>' + timer.hours + '</span>'
                    + '<span>' + timer.minutes + '</span>'
                    + '<span>' + timer.seconds + '</span>';

    //animations
      
    var spans = clock.getElementsByTagName("span");
     animateClock(spans[3]);
    if(timer.seconds == 59) animateClock(spans[2]);
    if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
    if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);
      

    //check for end of timer
    if(timer.total < 1 && deadline !=0){
      clearInterval(timerInterval);
      clock.innerHTML = '<span>D</span><span>O</span><span>N</span><span>E</span>';
        var audio = new Audio('./Assests/quite-impressed.mp3');
        audio.play();
    }
      
      
     // console.log("from countdown.js : " + clients.stopTime);
     /* if(clients.stopTime && deadline ===0) 
      {
           clearInterval(timerInterval);
       var audio = new Audio('./Assests/quite-impressed.mp3');
        audio.play();   
      }*/
  }, 1000);
    
   
    
}
function lastTimeValue () 
{
    return stopwatcher;
}

   





/*function timerStart(clientId){
var nowTime = moment().format("hh:mm:ss");
    var now = moment();
    
    var deadlineTime = moment().add(1,'hour').format("hh:mm:ss");
     var deadline = moment().add(1,'hour');
   //var d = moment(now.diff(deadline));
    console.log(clientId);
    console.log(moment(deadline.diff(now)).format("hh:mm:ss"));
  startTimer("clock", deadline);
};*/