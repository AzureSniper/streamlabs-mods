
jarEl.src = 'https://i.pinimg.com/originals/6a/45/e6/6a45e6991b87d17e413deba7ca283d48.jpg'; 
this.config.jar.type = "custom";
var cupWidth = 140;
var wallthickness = 30;
var wallLength = 300;   

//You can use this patter to pretty much override any of the 150+ sprite sheets. 
//You will have to look into the settings for each though since they can have different sizes.  
this.cheerOverride ={
	"cheer-1":'https://i.imgur.com/h8GZizr.png',
   //"cheer-100":''//,
  //	"cheer-1000":'',
  //	"cheer-5000":'',
  //	"cheer-10000":''
};
 
 this.calcRadians = function(d){
 	return Math.PI*d/180;
 }
this.createConvex = function (radius, openning, theThickness, walls, rshift){
  var x =this.renderer.width/2;
  var y =this.renderer.height/4;
  var circ = 360 - openning*2;
  var dStep = circ/walls;
  var rStep = this.calcRadians(dStep); 
  var rOpenning = this.calcRadians(openning);
  var rStart = this.calcRadians(270)+rOpenning;
  var vertices = [];
 
  for(var i = 1; i <= walls+1; i++){
  	var vertex = [];
    var angle = rStart+(rStep*i);
    var  r = radius;
    vertex[1] = y-r*Math.sin(angle);  
    vertex[0] = x-r*Math.cos(angle); 
    vertex[2] = dStep*i+openning;
  	vertices.push(vertex);
    
  }
 
  
 for(var i = 0; i < vertices.length-2; i++){ 
    var length = Math.sqrt( Math.pow(vertices[i+1][0] - vertices[i][0],2) + Math.pow(vertices[i+1][1] - vertices[i][1],2)); 
	var myBody =   this.createRectangleBody(vertices[i], length, theThickness, vertices[i][2] );
   	vertices[i][3] = length;  
   	this.world.addBody(myBody);
   
 }
  return vertices; 
}

this.createConvex(200,10,50,16,200);
 
 
/**

Mod initialization script. To allow multiple mods to be used at once without conflicts.

*/


//resizing the window causes the whole script to rerun.
if(!window.scriptDaddy){
	//paranoid debugging. Ugly as sin but 4am is not my best time.
	window.scriptDaddy = this;
    window.scriptDaddy.jarEl = jarEl;
	window.scriptDaddy.cheerCallbacks = [];
	window.scriptDaddy.mods = {};
  	window.scriptDaddy.cupBase = cupBase;
	
	/**
		Allows us to have multiple mods running. Settings will be namespaced using the name
		provided.
	*/
	window.scriptDaddy.registerMod = function(name,initCallback){
		if(window.scriptDaddy.mods[name]){
			//mod already registered. 
			return;
		}
		
		window.scriptDaddy.mods[name] = {};
		
		initCallback.call(window.scriptDaddy.mods[name])
		
		
	}

	window.scriptDaddy.cheer2 = window.scriptDaddy.cheer;
	//interceptor for future updates and refinement.      
	window.scriptDaddy.cheer = function(a,b,c,d){     
	  this.cheer2(a,b,c,d);          
		for(var i = 0; i < window.scriptDaddy.cheerCallbacks.length; i++){
			try{	
				window.scriptDaddy.cheerCallbacks[i](a);
			}catch(err){console.error(err);}
		}
	}

 }
 
 
 	scriptDaddy.scriptDaddyScript = function(){
      var amount = 1;
	  scriptDaddy.cheer('scriptDaddy: cheer'+amount+' ________ cheer'+amount+' ________ cheer'+amount+' ________ cheer'+amount+' ________ cheer'+amount+' ________ cheer'+amount+' ________ cheer'
                     +amount+' ________ cheer'+amount+' ________ cheer'+amount+' ________ cheer'+amount+' ________ cheer'+amount+' ________ cheer'+amount+' ',scriptDaddy.renderer.width ,scriptDaddy.renderer.height-50,0);
      scriptDaddy.cheer('scriptDaddy: test cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' ', scriptDaddy.renderer.width ,scriptDaddy.renderer.height-100,1);
	  scriptDaddy.cheer('scriptDaddy: test test cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' ', scriptDaddy.renderer.width ,scriptDaddy.renderer.height-150,2);
	  scriptDaddy.cheer('scriptDaddy: test test test cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' cheer'+amount+' ', scriptDaddy.renderer.width ,scriptDaddy.renderer.height-200,3);
 }
	
//for local testing, uncomment this.	
//	setInterval(scriptDaddy.scriptDaddyScript, 15000 );
 
 
 	
 /**
	Title: Nic Cage Bee Cup
	Description: 
	Author: scriptDaddy
	Legal: The code below is provided as is and does not promise to work with previously customized Tip Jar modules. Code is provided free of charge with no claims to compensation.
	
	
	To use this: 
	
	Paste the content of this file into bottom of the JS tab of the Jar widget in streamlabs. This is assuming you 
	are using the Custom HTML/CSS setting.
*/
	
 
window.scriptDaddy.registerMod("cheerResponse", function(){     
   scriptDaddy.world.contactMaterials[1].restitution=1.3;
   scriptDaddy.world.contactMaterials[0].restitution=1.3;
});


 

setTimeout(function(){
  
  
  for(var key in PIXI.loader.resources){
    for(var conKey in scriptDaddy.cheerOverride){
      if(key.indexOf(conKey+".json_image") !== -1){
       PIXI.loader.resources[key].texture.baseTexture.source.src = scriptDaddy.cheerOverride[conKey];
  
      }
    }
  } 
  
},5000);

