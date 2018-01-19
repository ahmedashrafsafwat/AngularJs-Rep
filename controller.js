require('./countdown.js');
var moment = require('moment');
 var stopTimePressed = false;
var events = require('events');
const excel = require('node-excel-export');
var XLSX = require('xlsx');
var Excel = require('exceljs');

var fs = require('fs');
var app = angular.module('myApp', ['ngAnimate']);
app.controller('myController', function($scope){
    const heading = [
  [ 'a1',  'b1',  'c1'],
  ['a2', 'b2', 'c2'] // <-- It can be only values 
];
    
  
    $scope.message = "THIS IS A MESSAGE" ;

    
    $scope.clients = [{
            "clientId":1,
            "consolesCat" : 
        [{name:"Playstation 3" , value:"1"}, 
        {name:"Playstation 4", value:"2"}, 
         {name:"Playstation 4 - C2",value:"3"}],
            
            "timeCats": 
                [{name:"30 mins", value: "1"},
                {name:"1 hour" , value: "2"},
                {name:"2 hours", value: "3"},
                {name:"open", value: "4"}],
            
        "price" : "NaN",
        "isOpen":false,
        "startTime":"NaN" ,
        "openTimeStoped":false
        
    }
    ];
    
    //console.log($scope.clients);
    $scope.ClientsNumbers = 1; 
    $scope.addClient =function()
    {
        
        $scope.clients.push({
            "clientId": $scope.clients.length +1 ,
            "consolesCat" : 
                    [{name:"Playstation 3" , value:"1"}, 
                    {name:"Playstation 4", value:"2"}, 
                    {name:"Playstation 4 - C2",value:"3"}],
            "timeCats": 
                [{name:"30 mins", value: "1"},
                {name:"1 hour" , value: "2"},
                {name:"2 hours", value: "3"},
                {name:"open", value: "4"}],
            
            "price": "NaN",
            "isOpen":false,
            "startTime":"NaN",
            "openTimeStoped":false
           /* time:$scope.time,
            console:$scope.console,
            startbut:$scope.startbut,
            timeRemaining:$scope.timeRemaining,
            price:$scope.price */
        });
        
    }


        var consoleDisplay = "";
         var timeDisplay = "";


     $scope.changeConsole = function (consoleCatModel) {    
           consoleDisplay = consoleCatModel;
           // console.log("from inside the start button" + consoleDisplay);
         consoleDisplay = consoleCatModel;
             return consoleCatModel;
       }
         $scope.changeTime = function (timeCatModel) {    
           timeDisplay = timeCatModel;
           // console.log("from inside the start button" + timeDisplay);
             timeDisplay = timeCatModel;
             return timeCatModel;
       }

       function findAndChangePrice ( clientId, price ) {
        
                for (var i in $scope.clients) {
                 if ($scope.clients[i].clientId == clientId) {
                    $scope.clients[i].price = price;
                    break; //Stop this loop, we found it!
                 }
               }


          
              
            }
     function findAndChangeIsOpen ( clientId ) {
               for (var i in $scope.clients) {
                 if ($scope.clients[i].clientId == clientId) {
                    $scope.clients[i].isOpen = true;
                    break; //Stop this loop, we found it!
                 }
               }
            }
     function findAndChangeStartTime ( clientId ) {
               for (var i in $scope.clients) {
                 if ($scope.clients[i].clientId == clientId) {
                    $scope.clients[i].startTime =  moment();
                    break; //Stop this loop, we found it!
                 }
               }
            }
         
       // module.exports($scope.clients);
    $scope.stopHidden = true;
    
     $scope.timerStart= function (clientId){
        var nowTime = moment().format("hh:mm:ss");
        var now = moment();
        var deadlineTime = moment().add(1,'hour').format("hh:mm:ss");
        var deadline = "";
         
         
         findAndChangeStartTime(clientId);
          
   //var d = moment(now.diff(deadline));
    
   // console.log(moment(deadline.diff(now)).format("hh:mm:ss"));
        
         
        
        // Search Json For the Id
         
         
         
         
         if ( consoleDisplay === "" || timeDisplay === "") 
             {
                alert("~Please choose the Console and Time !!~" );
         
             }
         else if ( consoleDisplay === "Playstation 3" && timeDisplay === "30 mins") 
         {
           //  alert("The price is 5 for 30 mins" );
            deadline = moment().add(30,'minutes');
            findAndChangePrice(clientId , "5 L.E");
              startTimer("clock", deadline, clientId);
         }
         else if ( consoleDisplay === "Playstation 4" && timeDisplay === "30 mins") 
         {
          //   alert("The price is 10 for 30 mins" );
              deadline = moment().add(30,'minutes');
             $scope.price = "10 L.E";
             findAndChangePrice(clientId ,"10 L.E");
              startTimer("clock", deadline, clientId);
         }
         else if ( consoleDisplay === "Playstation 4 - C2" && timeDisplay === "30 mins") 
         {
           //  alert("The price is 10 for 30 mins" );
              deadline = moment().add(30,'minutes');
             
             findAndChangePrice(clientId ,"10 L.E");
              startTimer("clock", deadline, clientId);
         }
         else if ( consoleDisplay === "Playstation 4 - C2" && timeDisplay === "1 hour") 
         {
            // alert("The price is 20 for 1 hour" );
              deadline = moment().add(1,'hours');
             
             findAndChangePrice(clientId ,"20 L.E");
              startTimer("clock", deadline, clientId);
         }
         else if ( consoleDisplay === "Playstation 4 - C2" && timeDisplay === "2 hours") 
         {
           //  alert("The price is 40 for 2 hours" );
              deadline = moment().add(2,'hours');
             
             findAndChangePrice(clientId ,"40 L.E");
              startTimer("clock", deadline, clientId);
         }
         else if ( consoleDisplay === "Playstation 4" && timeDisplay === "1 hour") 
         {
           //  alert("The price is 20 for 1 hour" );
              deadline = moment().add(1,'hour');
             
             findAndChangePrice(clientId ,"20 L.E");
              startTimer("clock", deadline, clientId);
         }
          else if ( consoleDisplay === "Playstation 4" && timeDisplay === "2 hours") 
         {
           //  alert("The price is 40 for 2 hour" );
              deadline = moment().add(2,'hours');
            
             findAndChangePrice(clientId ,"40 L.E");
              startTimer("clock", deadline, clientId);
         }
          else if ( consoleDisplay === "Playstation 3" && timeDisplay ==="1 hour") 
         {
          //   alert("The price is 10 for 1 hour" );
              deadline = moment().add(1,'hour');
             
             findAndChangePrice(clientId ,"10 L.E");
              startTimer("clock", deadline, clientId);
         }
          else if ( consoleDisplay === "Playstation 3" && timeDisplay === "2 hours") 
         {
           //  alert("The price is 20 for 2 hour" );
              deadline = moment().add(2,'hours');
             
             findAndChangePrice(clientId ,"20 L.E");
              startTimer("clock", deadline, clientId);
         }
          else if ( consoleDisplay === "Playstation 3" && timeDisplay === "open") 
         {
           // alert("THE TIME IS OPEN !!!" );
              deadline = moment().add(2,'hours');
             
             
             $scope.stopHidden = true;
            // findAndChangePrice(clientId ,"20 L.E");
             findAndChangeIsOpen(clientId);
              startTimer("clock", 0 , clientId);
         }
           else if ( consoleDisplay === "Playstation 4" && timeDisplay === "open") 
         {
          //  alert("THE TIME IS OPEN !!!" );
              deadline = moment().add(2,'hours');
             $scope.stopHidden = true;
            // findAndChangePrice(clientId ,"20 L.E");
             findAndChangeIsOpen(clientId);
              startTimer("clock", 0 , clientId);
         }
           else if ( consoleDisplay === "Playstation 4 - C2" && timeDisplay === "open") 
         {
           // alert("THE TIME IS OPEN !!!" );
            //  deadline = moment().add(2,'hours');
            //$scope.stopHidden = true;   
            // findAndChangePrice(clientId ,"20 L.E");
             findAndChangeIsOpen(clientId);
            
              startTimer("clock", 0 , clientId );
            
            
         }
         
         
         
         
  //startTimer("clock", deadline, clientId);
};
    
    $scope.data = {
    singleSelect: null,
    multipleSelect: []

   };
    $scope.consoleModel = {};
    $scope.Time = {};
   $scope.consolesCat = [
       {name:"Playstation 3" , value:"1"}, {name:"Playstation 4", value:"2"}, {name:"Playstation 4 - C2",value:"3"}];
  /*  $scope.timeCats= [
        {name:"30 mins", value: "1"},
        {name:"1 hour" , value: "2"},
        {name:"2 hours", value: "3"},
        {name:"open", value: "4"}
    ]*/
          
   /*   $scope.changeConsole = function (consoleCatModel) {    
           
            console.log("Console Chosen : " + consoleCatModel);
          return consoleCatModel;
       }
         $scope.changeTime = function (timeCatModel) {    
           
            console.log("Time Chosen : " + timeCatModel);
          return    timeCatModel;
       }*/
 
      /*  $scope.change = function () {
        if($scope.console == "playstation 3")
            $scope.price = "5 L.E";
        }*/


     
  
    $scope.stopTimer = function (clientId) 
    {
        
      var oneMinPriceX4 = 20/60;
      var oneMinPrice3 = 10/60;
        var oneHourPriceX4 = 20;
        var oneHourPrice3=10;
      for (var i in $scope.clients) {
                 if ($scope.clients[i].clientId == clientId) {
                     $scope.clients[i].openTimeStoped=true;
                   //  console.log(result-1);                 
                }

        }
        
 
        var StoppedTime = timer.total;
        
         
    /*    
        if ( consoleDisplay === "Playstation 4 - C2" && timeDisplay === "open") 
        {
           
            var price = oneMinPriceX4*Number(StoppedTime.format("mm")) + oneHourPriceX4* Number(StoppedTime.format("HH"));
             var price2 = price.toFixed(2);
            findAndChangePrice ( clientId, (price2.toString()+ " L.E"));
            console.log("PRICE OF OPEN CALCULATED !!!");
           
            
        }
        else if ( consoleDisplay === "Playstation 4" && timeDisplay === "open") 
        {
            
            var price = oneMinPriceX4*Number(StoppedTime.format("mm")) + oneHourPriceX4* Number(StoppedTime.format("HH"));
            var price2 = price.toFixed(2);
            findAndChangePrice ( clientId, (price2.toString()+ " L.E"));
            console.log("PRICE OF OPEN CALCULATED !!!");
        }else if ( consoleDisplay === "Playstation 3" && timeDisplay === "open") 
        {
            
            var price = oneMinPrice3*Number(StoppedTime.format("mm")) + oneHourPrice3* Number(StoppedTime.format("HH"));
            var price2 = price.toFixed(2);
            findAndChangePrice ( clientId, (price2.toString()+ " L.E") );
            console.log("PRICE OF Ps3 OPEN CALCULATED !!!");
        }*/
        

        calculatePrice( clientId, consoleDisplay, timeDisplay );
        
    }
    
    $scope.saveExcel = function () 
    {
       console.log("I am Clicked");
        
        var workbook = new Excel.Workbook();   
        file = 'testfile.xlsx'
     
        
       var excelClients = [];
       var tempClients = [];
        excelClients = arrayInputer();
     
   
        
    /*    var sheet = workbook.addWorksheet('rssi');
        sheet.addRows(excelClients);
        workbook.xlsx.writeFile(file)
               .then(function() {
                   console.log('Array added and then file saved.')
               });*/
        
        workbook.xlsx.readFile(file)
    .then(function() {
            console.log("File Saved In New !!!");
        var worksheet = workbook.getWorksheet(1);
        worksheet.addRows(excelClients);
        return {h1: workbook.xlsx.writeFile('new.xlsx') , h2: workbook.xlsx.writeFile(file) };
    })
            
     

    }
    function arrayInputer () 
    {
        
        var newClients = [];
        var excelClients = [];
        for (var i in $scope.clients) {
            var strReplacer = $scope.clients[i].price;
            var result = strReplacer.replace(" L.E", "");
            console.log(result);
            
               newClients.push([$scope.clients[i].startTime.format("DD-MM-YYYY") ,
                           $scope.clients[i].startTime.format('HH:mm') ,
                          Number(result)])
             /*arr2[i]=$scope.clients[i].startTime.format('HH:mm');
            arr3[i]=$scope.clients[i].price;*/
            
        }
        
        
        
        return newClients;
       
    }
      
       
});






