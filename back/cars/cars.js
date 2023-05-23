function color_state(value){
    let status ;
    if (value === "Νοικιασμένο"){
        status = "rented"
    }
    else if (value === "Ελεύθερο"){
        status = "free";
    }
    return `<td class="${status}">  ${value} </td>`
}

function load(db){
    for (let i=0; i<db.length; i++){
        const car = db[i];
        const tblRow = "<tr>" + 
            "<td>" + car['id']+ "</td>"+ 
            "<td>" + car['brand']+ "</td>"+ 
            "<td>" + car['model']+ "</td>"+ 
            "<td>" + car['license_plate']+ "</td>"+ 
            "<td>" + car['fuel']+ "</td>"+ 
            "<td>" + car['price_day']+ "</td>"+ 
            color_state(car['state'])+
            `<td> <form action='/deleteCar' method=GET><input type='text' name='id' value=${car.id} style='display:none'><input type='submit' value='Διαγραφή' style='margin-left: 15px;'></form></td>`+
            "</tr>"
        $(tblRow).appendTo("#table");
    }
}



const e = document.getElementById("status");

e.addEventListener("change", () =>{
    const tbl = document.getElementById("table");
    tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);

    $.getJSON('cars.json', function(cars) {
        
        if (e.options[e.selectedIndex].text !== "Όλα")
            var temp = cars.filter(function(el){ return (el['state'][0] === e.options[e.selectedIndex].text[0]);})
        else{ 
            var temp = cars
        }
        load(temp);
    });

});

document.addEventListener("load", $(function () {
    $.getJSON('cars.json', function(data) {load(data);});
}));

const button = document.getElementById("newbutton");
button.addEventListener("click", (event)=>{
    console.log(event);
    document.querySelector("#new").style.visibility="visible";
})

