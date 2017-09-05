/*//counter
var button = document.getElementById('counter');

button.onclick = function() {
    //create  a req
    var request = new XMLHttpRequest();
    
    //capture the res and store it in a variable;
    request.onreadystatechange = function() {
         if (request.readyState === XMLHttpRequest.DONE) {
    //take some action
        if(request.status === 200 ) {
           var counter = request.responseText;
           var span = document.getElementById('count');
           span.innerHTML = counter.toString();
        }     
    }//not DONE yet
};
       
    // make a request
    request.open('GET','http://amenaarif1996.imad.hasura-app.io/counter',true);
    request.send(null);
    
   
    
};*/
//submit name
//submit username nd password
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    //make a req to the server and send the names
    //create  a req
    var request = new XMLHttpRequest();
    
    //capture the res and store it in a variable;
    request.onreadystatechange = function() {
         if (request.readyState === XMLHttpRequest.DONE) {
    //take some action
        if(request.status === 200 ) {
        alert('Logged in successfully');
        }
        else if (request.status === 403 ) {
            alert('Username/password in correct');
        } else if (request.status === 500 ) {
            alert('Alas !! Somthings Fishy');
        }
    }//not DONE yet
};
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    // make a request
    request.open('POST','http://amenaarif1996.imad.hasura-app.io/submit-name?name='+username,true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
    
   
};
//post comment
/*
var submit = document.getElementById('submitc_btn');
submit.onclick = function () {
    
    var request = new XMLHttpRequest();
    
    //capture the res and store it in a variable;
    request.onreadystatechange = function() {
         if (request.readyState === XMLHttpRequest.DONE) {
    //take some action
             if(request.status === 200 ) {
            
                     var comments = request.responseText;
                     comments = JSON.parse(comments);
                     var list = '';
                    for (var  i=0 ; i< comments.length ; i++) {
                             list += '<li>' + comments[i] + '</li>';        
                     }
                    var ul = document.getElementById('commentlist');
                    ul.innerHTML = list ;
    }  //not DONE yet
    }
 };      
    // make a request
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    request.open('GET','http://amenaarif1996.imad.hasura-app.io/submit-comment?comment=' +comment ,true);
    request.send(null);
};*/