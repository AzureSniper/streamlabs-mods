
/**
	Title: Jumping Beans
	Description: Select a bit to make jump. Currently goes sequential based on the first available. Will have to make it random later.
	Or have it search for the ones at the top with ~0 velocity
	Author: GlucoseDaddy
	Legal: The code below is provided as is and does not promise to work with previously customized Tip Jar modules. 
	Code last tested on StreamLabs on 10/26/2017. Code is provided free of charge with no claims to compensation.
	
	
	To use this: 
	
	Paste the content of this file into bottom of the JS tab of the Jar widget in streamlabs. This is assuming you 
	are using the Custom HTML/CSS setting.
*/


//To prevent rerunning when the window view is updated
if(!window.glucoseDaddy)	{			
  
					
window.glucoseDaddy = this;				
  
 window.glucoseDaddy.bitLimit = 50;
  
glucoseDaddy.bouncyBits = function(){	 
	glucoseDaddy.bounceBoi();
	setTimeout(glucoseDaddy.bouncyBits,4000);
}					
					
					
glucoseDaddy.bounceBoi = function(){	 
	console.log('looking for a bit');
	
    for(var i =glucoseDaddy.elements.length-1; i >= 0 && glucoseDaddy.elements.length > glucoseDaddy.bitLimit; i--){
      var element = glucoseDaddy.elements[i];	
      if(element.body && !element.body.isABouncyBoi && element.body.mass < 1.7976931348623157e+308
        && Math.abs(element.body.velocity[0]) < 10
         && Math.abs(element.body.velocity[1]) < 10
        ){
		console.log('launching bit'); 
		element.body.isABouncyBoi = true;
		element.body.velocity[0] = -25;
		element.body.velocity[1] = 125; 
		return; 
      } 
    } 
	 for(var i =0; i < glucoseDaddy.elements.length; i++){
      var element = glucoseDaddy.elements[i];	
      if(element.body && element.body.isABouncyBoi){
	  element.body.isABouncyBoi = false;
	  }
	}
  
  
  
	
}


setTimeout(glucoseDaddy.bouncyBits, 4000);


//THIS IS THE TESTING SCRIPT DELETE DOWN TO THE END COMMENT

//function testScript(){
//   glucoseDaddy.cheer('GlucoseDaddy: cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 cheer1 ', 2539,526,1);
//  }
//setInterval(testScript, 15000 );

//END OF TESTING SCRIPT

}