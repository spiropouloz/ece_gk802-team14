function load(db){
    for (let i=0; i<db.length; i++){
        const admin = db[i];
        const tblRow = "<tr>" + 
            "<td>" + admin['fname']+ "</td>"+ 
            "<td>" + admin['lname']+ "</td>"+ 
            "<td>" + admin['email']+ "</td>"+ 
            "<td>" + admin['username']+ "</td>"+ 
            `<td> <form action='/deleteAdmin' method=GET><input type='text' name='id' value=${admin['_id']} style='display:none'><input type='submit' value='Διαγραφή' style='margin-left: 15px; cursor: pointer;'></form></td>`+
            "</tr>"
        $(tblRow).appendTo("#table");
    }
}

document.addEventListener("load", $(function () {
    $.getJSON('admins.json', function(data) {load(data);});
}));

const button = document.getElementById("newbutton");
button.addEventListener("click", (event)=>{
    console.log(event);
    document.querySelector("#new").style.visibility="visible";
})


