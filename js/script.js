function search_id() {
    let input = document.getElementById("searchbar").value
    // input=input.toLowerCase();
   let mytable = document.getElementsByClassName('table');

    let tr = mytable[0].getElementsByTagName("tr");
      
    for ( var i = 0; i < tr.length; i++) { 

      let th = tr[i].getElementsByTagName('th')[0];
        if (th) {
          let number=th.textContent || th.innerHTML;

           if(number.indexOf(input)> -1){
             tr[i].style.display="";
           }else{
             tr[i].style.display="none";
           }
        }
        
    }
}

