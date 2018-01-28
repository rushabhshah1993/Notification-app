// Function description:
// 1. addNotification() - Randomly creates a sentence from a bunch of words and adds it as a 
// 						  notification. Additionally, it also deals with showing the 'new' badge
// 						  on notification icon.
// 
// 2. dateConverter(date) - Takes a date as an argument and converts into a desired string.
// 
// 3. timeConverter(time) - Takes a time as an argument. Calculates the difference between argument
//							time and the current time and displays it as hour, seconds, minutes. 

////////////////////////////--------------------------------------////////////////////////////////

var date = new Date();
var global_data;
var global_data_length;



$("#today").html(dateConverter(date));



//fetches original data from data.json
fetch("/static/data/data.json")
	.then(
		function(response){
			if(response.status!=200){
				console.log("Problem: "+response.status);
			}
			

			response.json().then(function(data){
				global_data = data;
				global_data_length = data.length;
			})
		}
	)
	.catch(function(err){
		console.log(err);
	})



// On clicking the add-notification button, it calls the addNotification() function.
$("#add_notification").on("click",function(){
	addNotification();
})



// On clicking the show-notification icon on the navbar, it hides the notify 'new' badge
// and calls the function to add new notification and display it. It also handles showing/hiding
// the notification div.
$("#show_notification").on("click",function(){
	$(".notify-new").css("display","none");
	notify(global_data);
	$(".notification-class").toggle();
})



$("#refresh-btn").on("click",function(){
	$(".notification-class").hide();
	notify(global_data);
	$(".notification-class").show();
})


// Creates a random notification and assigns it to the notification div.
function addNotification(){
	var type = ["assigned","general","reminder"];
	var timestamp = new Date().toJSON();
	var names = ["Bob","Sarika","Sanjana","Afreen","Ishita","Sanjay","Manoj","Jay","Komal"];
	var general_action = ["has completed the assignment.","owes you 100 LOCs.","finished the POC.","caught a Pokemon.","has added her name in Dance competition."];
	var reminder_action = ["You have to complete the assignment of ","You have to submit the POC of "];
	var assigned_posts = ["Mobility","P&G","Technical Report","Data Challenge"];
	var global_data_length = Object.keys(global_data).length;
	var text;

	var new_notify_type = type[Math.floor(Math.random() * type.length)]; //select a random number and give it to the array 'type' to get a random name.

	if(new_notify_type == "general"){
		text = names[Math.floor(Math.random() * names.length)] + " " + general_action[Math.floor(Math.random() * general_action.length)];
	}
	else if(new_notify_type == "assigned"){
		text = names[Math.floor(Math.random() * names.length)] + " has assigned the task of " + assigned_posts[Math.floor(Math.random() * assigned_posts.length)] + " to you.";
	}
	else if(new_notify_type == "reminder"){
		text = reminder_action[Math.floor(Math.random() * reminder_action.length)] + assigned_posts[Math.floor(Math.random() * assigned_posts.length)];
	}

	var new_obj = {};
	new_obj.type = new_notify_type;
	new_obj.timestamp = timestamp;
	new_obj.text = text;

	global_data[global_data_length] = new_obj; //add the new object to the global notification data.

	notify(global_data); //call the function to show the notification on HTML.

	// if the notification div is already open, the 'new' badge appears for 5 seconds before vanishing,
	// else, it remains fixed till user clicks on it.		
	if($(".notification-class").css("display")=="none"){	
		$(".notify-new").css("display","block");
	}
	else{
		$(".notify-new").css("display","block");
		setTimeout(function(){
			$(".notify-new").css("display","none");
		},5000)
	}

}



function dateConverter(date){
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
	var day = days[date.getDay()];
	var month = month[date.getMonth()];

	var output_date = day + "<br> " + month + " " + date.getDate() + " , " + date.getFullYear();
	return output_date;
}



function timeConverter(time){
	var date = new Date();
	var curr_time = date.getTime();

	var time_diff = curr_time-time.getTime();

	if(time_diff<2000){
		return "Just Now";
	}
	else if((time_diff>2000)&&(time_diff<60000)){				//1 second = 1000 ms | 1 minute = 60 seconds = 60000 ms
		return parseInt((time_diff)/1000)+" seconds(s) ago.";
	}
	else if((time_diff>60000)&&(time_diff<3600000)){			//1 hour = 60 minutes = 3600000 ms
		return parseInt((time_diff)/60000)+" minute(s) ago.";
	}
	else if((time_diff>3600000)&&(time_diff<86400000)){			// 1 day = 86400000 ms
		return parseInt((time_diff)/3600000)+" hour(s) ago.";
	}
	else if(date.getDate()-time.getDate()==1){
		return "Yesterday";
	}
	else{
		return dateConverter(time);
	}
}