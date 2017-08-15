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
                     var counter = request.responseText;
                      var span = document.getElementById('count');
                     span.innerHTML = counter.toString();
            }
        }//not done
        
    };
    // make a request
    request.open('GET', 'http://amenaarif1996.imad.hasura-app.io/counter',true);
    request.send(null);
    
    
   
};
//submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    // make a re to server and send the name
    //capture a list of names and render them as alist
    var name = ['name1','name2','name3','name4'];
    var list = '';
    for(var i=0 ; i<names.length ; i++) {
        list = '<li>' + name[i] + '</li>';
        
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};