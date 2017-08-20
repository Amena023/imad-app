//counter
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
    
   
    
};
//submit name

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
            // capture a list of names and render it as a list
            var names = request.responseText;
            names = JSON.parse(names);    
            var list ='';
            for (var i=0; i<names.length; i++) {
                list += '<li>'+ names[i] + '</li>';
}
        var ul = document.getElementById('namelist');
        ul.innerHTML = list;  
        }     
    }//not DONE yet
};
    var nameInput = document.getElementById('name');
var name = nameInput.value;   
    // make a request
    request.open('GET','http://amenaarif1996.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    
    
   
};
//comments
var post = document.getElementById('post_btn');
post.onclick = function() {
    //make a req to the server and send the names
    //create  a req
    var request = new XMLHttpRequest();
    
    //capture the res and store it in a variable;
    request.onreadystatechange = function() {
         if (request.readyState === XMLHttpRequest.DONE) {
    //take some action
        if(request.status === 200 ) {
            // capture a list of names and render it as a list
            var comment = request.responseText;
            comments = JSON.parse(comments);    
            var lst ='';
            for (var i=0; i<comments.length; i++) {
                lst += '<li>'+ comments[i] + '</li>';
}
        var ul = document.getElementById('commentlist');
        ul.innerHTML = lst;  
        }     
    }//not DONE yet
};
    var commentInput = document.getElementById('comment');
var comment = commentInput.value;   
    // make a request
    request.open('GET','http://amenaarif1996.imad.hasura-app.io/post-comment?comment='+comment,true);
    request.send(null);
    
};