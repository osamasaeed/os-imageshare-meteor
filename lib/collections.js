Images = new Mongo.Collection("images");



// set up security on Images collection
Images.allow({
	insert:function(userId, doc){
	
		if (Meteor.user()){ // they logged in
		
			if (userId != doc.createdBy){ // the user owned that image
				return false;
			}else{
				return true;
			}
		}else { // user not logged in
			return false;
		}
		
	},
	remove:function(userId, doc){
		if (Meteor.user()){ // they logged in
			if (userId != doc.createdBy){ // the user owned that image
				return false;
			}else{
				return true;
			}
		}else { // user not logged in
			return false;
		}
	},// end remove;
	// set update security for rating image
	update:function(userId , doc,field,modifier){
		if( field == 'rating'){
			 return true;
		 }else{
			 return false;
		 }
	}
	
});