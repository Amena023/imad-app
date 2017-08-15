//counter code
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function() {
    
    
    
    
    //make a re to counter endpoint
    //capture the response and store in a variable
    
    //render the var in the correct span
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};