var button = getElementById('counter');
button.onclick = function() {
    //make a req
    
    //capture the res and store it in a variable;
    
    // render the variable in the correct span
    counter = counter + 1;
    var span = getElementById('count');
    span.innerHTML = counter.toString();
    
}