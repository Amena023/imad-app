//counter code
var button = document.getElementById('counter');

button.onclick = function() {
    
     //create request
     var request = new XMLHttpRequest(); 
     
     //capture the response and store in a variable
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.Done) {
            //Take some action
            if (request.state === 200) {
                     var counter =request.responseText;
                      var span = document.getElementById('count');
                     span.innerHTML = counter.toString();
            }
        }//not done
        
    };
    // make a request
    request.open('GET', 'http://amenaarif1996.imad.hasura-app.io/counter',true);
    request.send(null);
    
    
   
};