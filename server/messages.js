var emptyArray = [{"id":0,"Name":"", "Texts":[], "Pictures":[],"TemplateLink":"",
	"PresentationTime":	{"startAirDate":"", "endAirDate":"","presentationDays":[],
		"AirTime":[{"start":"","end":""},{"start":"","end":""}]},"Screens":[]},]

exports.getMessages = function(collection, callback){
	console.log('getMessages called.');
	collection.find({}).toArray(function (err, docs) {
		console.log('getMessages result is : .' + docs);
		callback(docs);
	});
}

exports.getMessageById = function (screenId, collection, callback) {
		var query = {};
		query["Screens"] = parseInt(screenId);
		collection.find(query).toArray(function (err, docs) {
			var results = [];
			for (var i=0; i<docs.length;i++)
			{
				if (IsTimeToPresent(docs[i]))
				{
					results.push(docs[i]);
				}
			}

			callback(results);
		});
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
			message.PresentationTime.presentationDays.forEach(function(value,index)
			{
				var currDay = currentdate.getDay() +1;

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

exports.addMessage = function (id, collection, callback) {
	var intId = parseInt(id);

	var newMessageScreens = [];
	newMessageScreens.push(intId);
	var newMessage = {
		"Name" : "Test Message",
		"Texts" : [
			"m5text1",
			"m5text2",
			"m5text3",
			"m5text4",
			"m5text5",
			"m5text6",
			"m5text7"
		],
		"Pictures" : [
			"pictures/pie.jpg"
		],
		"TemplateLink" : "templates/templateB.html",
		"PresentationTime" : {
			"startAirDate" : "01/01/2016",
			"endAirDate" : "01/01/2017",
			"presentationDays" : [1,2,3,4,5,6,7],
			"AirTime" : [
				{
					"start" : "00:00:00",
					"end" : "23:59:59"
				},
				{
					"start" : "00:00:00",
					"end" : "23:59:59"
				},
				{
					"start" : "00:00:00",
					"end" : "23:59:59"
				},
				{
					"start" : "00:00:00",
					"end" : "23:59:59"
				},
				{
					"start" : "00:00:00",
					"end" : "23:59:59"
				},
				{
					"start" : "00:00:00",
					"end" : "23:59:59"
				},
				{
					"start" : "00:00:00",
					"end" : "23:59:59"
				}
			]
		},
		"Screens" : newMessageScreens
	}
	collection.insert(newMessage, function(err, message) {
		if (err) throw err;
		callback (message);
	});
}