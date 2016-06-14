$(function(messages) {	
	
	Start();
	
//$(document).ready(function()
	function Start()
	{
		alert("ready");
		var messagei = 0;
		var img1 = new Image();
		img1.src = "pictures/pie.jpg";
		var img2 = new Image();
		img2.src = "pictures/flower.jpg";
		var img3 = new Image();
		img2.src = "pictures/turtle.jpg";


		var MessagesArray = messages;
		
		// presenting first message:
		LoadMessage(messagei);
		PromotePointerOfMessage();
		
		// starting the loop.
		updateScreen();
	}	
		
	function IsTimeToPresent(message)
	{ 
		var currentdate = new Date();	
		
		// setting start date
		var splittedAirDate = message.PresentationTime.startAirDate.split("/");	
		var startDay = splittedAirDate[0];
		var month = splittedAirDate[1];
		var year = splittedAirDate[2];
		
		//
		var splittedStartTime =  message.PresentationTime.AirTime[0].start.split(":");
		var hours = splittedStartTime[0];
		var minutes = splittedStartTime[1];
		var seconds = splittedStartTime[2];
		
		var startDate = new Date(year,month - 1,startDay,hours,minutes,seconds);
		
		// setting end date
		var splittedEndAirDate = message.PresentationTime.endAirDate.split("/");		
		var endDay = splittedEndAirDate[0];
		month = splittedEndAirDate[1];
		year = splittedEndAirDate[2];
		
		 var splittedEndTime =  message.PresentationTime.AirTime[0].end.split(":");
		 hours = splittedEndTime[0];
		 minutes = splittedEndTime[1];
		 seconds = splittedEndTime[2];
		
		 var airEndDate = new Date(year,month -1,endDay,hours,minutes,seconds);

	
		// Checking Dates validation
		if(startDate.getTime() < currentdate.getTime() &&
				currentdate.getTime() < airEndDate.getTime())	
		{
			var isToday = false;	
			var airTimeEnd;			
			// checking days validation
			$.each(message.PresentationTime.presentationDays,function(index,value)
			{			
				var currDay = currentdate.getDay() +1;				
				alert(value);
				// if air day is today
				if(value == currDay)
				{	
					isToday = true;	
					
					// matching the day to air with its correct time, and initilizing the start Date
					var AirTime = message.PresentationTime.AirTime[index].start.split(":");
					var uhours = AirTime[0];
					var uminutes = AirTime[1];
					var useconds = AirTime[2];
					startDate =  new Date(year,month - 1,startDay,uhours,uminutes,useconds);
					
					//defigning the end time to air..
					
					var AirTimeEnd = message.PresentationTime.AirTime[index].end.split(":");
					 uhours = AirTimeEnd[0];
					 uminutes = AirTimeEnd[1];
					 useconds = AirTimeEnd[2];
					airTimeEnd =  new Date(year,month - 1,startDay,uhours,uminutes,useconds);
				}
			});
			
			if(!isToday)
			{
				return  false;
			}		

			// Checking time validation		
			// we will think of today as the same as the start date
			var newDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),currentdate.getHours(),currentdate.getMinutes(),currentdate.getSeconds());
			
			// if we are before the time to air the message
			if(startDate.getTime() > newDate.getTime())
			{
				//we cant air the message yet
				return false;
			}
			
			// the airTimeEnd is suppose to be defined if we got this far.. and it has the end time of the message		
			// if we are after the time to air the message (airTimeEnd has time deadlimit)
			if(airTimeEnd.getTime() < newDate.getTime())
			{
				//we passed the time to air the message
				return false;
			}			
			
			return true;
		}
			
		//we cant air the message becuase we passed/before the date to air
		return false;
	}
	
	function updateScreen()
	{
		var ms = 1000;
		setInterval(function()
		{
			// always loading next message in the array..			
			LoadMessage(messagei);
			PromotePointerOfMessage();							
		},ms);
	}
	
	function PromotePointerOfMessage()
	{	
		// untill the message pointer points to the last message (which is place 4 for 5 messages)
		if( messagei < MessagesArray.length -1)
		{
			messagei = messagei+1;
		}
		else
		{
			messagei = 0;
		}		
	}
	
	function ShowTexts(texts)
	{
		//if there are texts
		if(texts.length > 0)
		{
			$( "#texts" ).html('<div><label for="name">' + texts[0] + '</label></div>');
			
			for(var i = 1; i < texts.length; i++)
			{			
				$( "#texts" ).append('<div><label for="name">' + texts[i] + '</label></div>');
			}
		}
	}
	
	function ShowPictures(pictures)
	{	
		// if there are pictures
		if( pictures.length > 0)
		{			
			$( "#pictures" ).html('<img src="' + pictures[0].src + '"/>');
		
			for(var i = 1; i < pictures.length; i++)
			{			
				$( "#pictures" ).append('<div><img src="' + pictures[i].src + '"/></div>');
			}		
		}		
	}
		
	function LoadMessage(messagei)
	{
		alert("load message");
		var message = MessagesArray[messagei];
		
		if(IsTimeToPresent(message) == true)
		{	
			// placing the name of the message in the title
			$( "#title" ).html(message.Name);
			
			// loading texts	
			ShowTexts(message.Texts);

			// loading pictures
			ShowPictures(message.Pictures);
			
			// loading template
			$( "#templateBody" ).load(message.TemplateLink);
		}
	}
})
