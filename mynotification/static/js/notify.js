function notify(data){
	var data_arr = [];

	for(var i=0;i<Object.keys(data).length;i++){		//convert the data into an array for sorting
		data_arr.push(data[i]);
	}

	function custom_sort(a, b) {						//sorting function
	    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
	}

	data_arr.sort(custom_sort);

	$(".notification-list").empty();					//clear the notification cards

	var general_count = 0;
	var assigned_count = 0;
	var reminder_count = 0;

	$(data_arr.reverse()).each(function(key,value){		//arrange it in desc order i.e. latest first
		var text_type;

		if(value.type=="assigned"){
			assigned_count++;
			text_type = "Assigned Task";
		}
		else if(value.type=="general"){
			general_count++;
			text_type = "Notification";
		}
		else if(value.type=="reminder"){
			reminder_count++;
			text_type = "Reminder";
		}

		var notify_template = '<div class="row"> <div class="col s12"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <span class="card-title">'+timeConverter(new Date(value.timestamp))+'</span> <p>'+value.text+'</p></div><div class="card-action"> <a href="#">View '+ text_type +'</a> </div></div></div></div>';
		$(".notification-list").append(notify_template);

	})

	$("#assigned_badge").html(assigned_count);
	$("#reminder_badge").html(reminder_count);
	$("#general_badge").html(general_count);
}