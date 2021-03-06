var socket = io('http://localhost:3000') || {}
socket.isReady = false;

window.addEventListener('load', function() {

	var execInUnity = function(method) {
		if (!socket.isReady) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		
		f(window.unityInstance!=null)
		{
		  //fit formats the message to send to the Unity client game, take a look in NetworkManager.cs in Unity
		  window.unityInstance.SendMessage("NetworkManager", method, args.join(':'));
		
		}
		
	};//END_exe_In_Unity 

	
	socket.on('PONG', function(socket_id,msg) {
				      		
	  var currentUserAtr = socket_id+':'+msg;
	  
	 if(window.unityInstance!=null)
		{
		 
		  window.unityInstance.SendMessage ('NetworkManager', 'OnPrintPongMsg', currentUserAtr);
		
		}
	  
	});//END_SOCKET.ON

					      
	socket.on('LOGIN_SUCCESS', function(id,name,avatar,position) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar+':'+position;
	  
	   if(window.unityInstance!=null)
		{
		 
		  window.unityInstance.SendMessage ('NetworkManager', 'OnJoinGame', currentUserAtr);
		
		}
	  
	});//END_SOCKET.ON

	socket.on('MATCH_CREATED_TO_CLIENT', function(currentUserAtr) {
		 if(window.unityInstance!=null)
		  {
		   
			window.unityInstance.SendMessage ('NetworkManager', 'OnMatchCreated', currentUserAtr);
		  
		  }
		
	});//END_SOCKET.ON
	
		
	socket.on('SPAWN_PLAYER', function(id,name,avatar,position) {
	
	    // var currentUserAtr = id+':'+name+':'+avatar+':'+position;
		
		// if(window.unityInstance!=null)
		// {
	    //  // sends the package currentUserAtr to the method OnSpawnPlayer in the NetworkManager class on Unity
		//   window.unityInstance.SendMessage ('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
		
		// }
		
	});//END_SOCKET.ON

		
    socket.on('INIT_ROOM', function(currentUserAtr) {
		if(window.unityInstance!=null)
		{
		 window.unityInstance.SendMessage ('ServerManager', 'InitRoom',currentUserAtr);
		}
	});//END_SOCKET.ON	
	
	socket.on('RENDER_FROM_HOST', function(currentUserAtr) {
		if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'RenderFromHost', currentUserAtr);		
		}
		
	});//END_SOCKET.ON
	socket.on('MOVE_GK_FROM_CLIENT', function(currentUserAtr) {
		if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'MoveGKFromClient', currentUserAtr);		
		}
		
	});//END_SOCKET.ON

	// socket.on('OPPONENT_SHOOT', function(shootPower,ballDirection,type) {
	socket.on('OPPONENT_SHOOT', function(currentUserAtr) {
	
	    // var currentUserAtr = shootPower+':'+ballDirection+':'+type;
		
		if(window.unityInstance!=null)
		{
		  window.unityInstance.SendMessage ('NetworkManager', 'OnOpponentShoot', currentUserAtr);		
		}
		
	});//END_SOCKET.ON
	socket.on('OPPONENT_MOVE_BALL', function(currentUserAtr) {
		
		if(window.unityInstance!=null)
		{
	     // sends the package currentUserAtr to the method OnOpponentShoot in the NetworkManager class on Unity
		  window.unityInstance.SendMessage ('NetworkManager', 'OnOpponentMoveBall', currentUserAtr);
		
		}
		
	});//END_SOCKET.ON
	socket.on('CLIENT_MOVE_BALL_TO_SERVER', function(currentUserAtr) {
	
		if(window.unityInstance!=null)
		{
	     // sends the package currentUserAtr to the method OnOpponentShoot in the NetworkManager class on Unity
		  window.unityInstance.SendMessage ('ServerManager', 'OnClientMoveBall', currentUserAtr);
		
		}
		
	});//END_SOCKET.ON
	
	socket.on('RESPAWN_PLAYER', function(id,name,avatar,position) {
	//     var currentUserAtr = id+':'+name+':'+avatar+':'+position;
		
	//  if(window.unityInstance!=null)
	// 	{
	// 	   window.unityInstance.SendMessage ('NetworkManager', 'OnRespawPlayer', currentUserAtr);
	// 	}
		
	});//END_SOCKET.ON
	
    socket.on('UPDATE_MOVE_AND_ROTATE', function(id,position,rotation) {
	     var currentUserAtr = id+':'+position+':'+rotation;
		 	
		 if(window.unityInstance!=null)
		{
		   window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateMoveAndRotate',currentUserAtr);
		}
		
	});//END_SOCKET.ON
	
	
	 socket.on('UPDATE_PLAYER_ANIMATOR', function(id,animation) {
	 
	     var currentUserAtr = id+':'+animation;
		
		 if(window.unityInstance!=null)
		{
		  
		   // sends the package currentUserAtr to the method OnUpdateAnim in the NetworkManager class on Unity 
		   window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateAnim',currentUserAtr);
		}
		
	});//END_SOCKET.ON

	socket.on('UPDATE_ATTACK', function(currentUserId) {
	
	    var currentUserAtr = currentUserId;
		
	if(window.unityInstance!=null)
		{
		    window.unityInstance.SendMessage ('NetworkManager', 'OnUpdateAttack',currentUserAtr);
		
		}
		
	});//END_SOCKET.ON
	
	
	socket.on('DEATH', function(targetId) {
	
	    var currentUserAtr = targetId;
		if(window.unityInstance!=null)
		{
		 window.unityInstance.SendMessage ('NetworkManager', 'OnPlayerDeath',currentUserAtr);
		
		}
		
	});//END_SOCKET.ON
	
	
	
		        
	socket.on('USER_DISCONNECTED', function(id) {
	
	     var currentUserAtr = id;
		 
		if(window.unityInstance!=null)
		{
		  
		 window.unityInstance.SendMessage ('NetworkManager', 'OnUserDisconnected', currentUserAtr);
		
		
		}
		 
	
	});//END_SOCKET.ON
	

});//END_window_addEventListener

