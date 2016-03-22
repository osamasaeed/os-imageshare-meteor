// routing system
Router.configure({
	layoutTemplate:'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome',{
	  to:"main"
  });
});

Router.route('/images', function () {
  this.render('navbar',{
	  to:"navbar"
	});
   this.render('carousel',{
	  to:"carousel"
	});
	 this.render('images',{
	  to:"main"
	});
});

Router.route('/image/:_id', function () {
  this.render('navbar',{
	  to:"navbar"
	});
	this.render('image',{
	  to:"main"
	  ,data:function(){
		  return Images.findOne({_id:this.params._id});
	  }
	}); 
	
});



        
	// infinite scroll
	Session.set("imageLimit", 8);
	
	lastScrollTop = 0;
	$(window).scroll(function(event){
		// test if we are near of the bottom of window
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
			// where we are in this page
			var scrollTop = $(this).scrollTop();
			
			if(scrollTop > lastScrollTop){
				//console.log("now going down");
			Session.set("imageLimit",Session.get("imageLimit") + 4);
			}
			lastScrollTop = scrollTop;
		}
		
	});
	
	
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_AND_EMAIL"
	});
	
	
	
	Template.image.helpers({
		image:function(){
		return Images.findOne({_id:Session.get("imgId")});
		}	
	});
	
	Template.images.helpers({
	images:function(){
		if(Session.get("userFilter")){ // they set a filter!
		
		return Images.find({createdBy:Session.get('userFilter')},{sort:{createdOn:-1,rating:-1}});
		
		
		}else{
				return Images.find({},{sort:{createdOn:-1,rating:-1},limit:Session.get("imageLimit")});
		}
	},
	filtering_images:function(){
		if(Session.get("userFilter")){
			return true;
		}else{
			return false;
		}
	},
	getFilterUser:function(){
		if(Session.get("userFilter")){
			var user = Meteor.users.findOne({_id:Session.get("userFilter")});
		return user.username;
		}
		else{
			return false;
		}
	},
	getUser:function(user_id){
		var user = Meteor.users.findOne({_id:user_id});
		if(user){
			return user.username;
		}else{
			return "anonymous";
		}
		
	}
	});
	
	Template.body.helpers({username:function(){
		if(Meteor.user()){
		return Meteor.user().username;
		
	}
	else{
		return "anonymous user"
	}	
	
	}
	
	
	});
	
	console.log("Website Developed By OSama");
	Template.images.events({
		"click .js-img":function(event){
			Session.set("imgId",this._id);
	$("#show_image_modal").modal('show');
		},
		"click .js-del-img":function(event){
			var image_id = this._id;
			$("#"+image_id).hide('slow',function(){
				Images.remove({"_id":image_id});
			});
		},
		"click .js-rate-image":function(event){
			var rating = $(event.currentTarget).data("userrating");
			console.log(rating);
			var image_id = this.id
			console.log(image_id);
			
		Images.update({_id:image_id},
					  {$set: {rating:rating}});
		},
		
		"click .js-show-image-form":function(event){
			$("#image_add_modal").modal('show');
		},
		"click .js-set-image-filter":function(event){
			Session.set("userFilter", this.createdBy)
		},"click .js-unset-image-filter":function(event){
			Session.set("userFilter", undefined)
		}
	});
	
	Template.image_add_form.events({
		"submit .js-add-image":function(event){
			var img_src,img_alt;
			img_src = event.target.img_src.value;
			img_alt = event.target.img_alt.value;
			img_price = event.target.img_price.value;
			console.log("src:"+img_src+" alt:"+img_alt);
			
			if(Meteor.user()){
				Images.insert({
					imgSrc:img_src,
					imgAlt:img_alt,
					imgPrice:img_price,
					createdOn:new Date(),
					createdBy:Meteor.user()._id
				});
		}
			$("#image_add_modal").modal('hide');
			return false;
		}
		
	});
	
	
