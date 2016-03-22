
	  Meteor.startup(function(){
		  if(Images.find().count() == 0){
			  for(var i=1;i<37;i++){
				  
				  Images.insert(
					{
					imgSrc:"img ("+i+").jpg",
					imgAlt:"img "+i,
					imgPrice:'5'
					}
			  ); // end of insert 
			  
			  } // end of for loop. 
			 console.log(Images.find().count());
			  
		  }// end of if have imges
		  
	  });
