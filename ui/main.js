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
// Eg: coco98.imad.hasura-app.io/articles/article-one will result in article-one
var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm () {
    var commentFormHtml = `
        <h5>Submit a comment</h5>
        <textarea id="comment_text" rows="5" cols="100" placeholder="Enter your comment here..."></textarea>
        <br/>
        <input type="submit" id="submit" value="Submit" />
        <br/>
        `;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('submit');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();
loadComments();