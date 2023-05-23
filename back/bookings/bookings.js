function color_status(value){
    let status ;
    if (value === "Ενεργή"){
        status = "ongoing"
    }
    else if (value === "Ολοκληρωμένη"){
        status = "finished";
    }
    else if (value === "Ακυρωμένη"){
        status = "cancelled"; 
    }
    return `<td class="${status}">  ${value} </td>`
}

function get_car(cars, id_car){
    for (let j=0; j<cars.length; j++){
        const car = cars[j];
        if(car["id"] === id_car){
            return [car["brand"],car["license_plate"]];
        }
    };   
    return '0'; 
}



function load(db){
    $.getJSON('../cars/cars.json', function(cars) {

        for (let i=db.length-1; i>-1; i--){
            const booking = db[i];
            const tblRow = "<tr>" + 
                "<td>" + booking['id']+ "</td>"+ 
                "<td>" + get_car(cars, booking['car_id'])[0]+ "</td>"+ 
                "<td>" + get_car(cars, booking['car_id'])[1]+ "</td>"+ 
                "<td>" + booking['start_date']+ "</td>"+ 
                "<td>" + booking['finish_date']+ "</td>"+ 
                "<td>" + booking['driver']+ "</td>"+ 
                "<td>" + booking['drivers_license']+ "</td>"+ 
                "<td>" + booking['insurance']+ "</td>"+
                "<td>" + booking['price']+ "</td>"+
                color_status(booking['status']) +
                "</tr>"
            $(tblRow).appendTo("#table");
        }
    })
}


const e = document.getElementById("status");

e.addEventListener("change", () =>{
    const tbl = document.getElementById("table");
    tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);

    $.getJSON('bookings.json', function(bookings) {
        if (e.options[e.selectedIndex].text !== "Όλες")
            var temp = bookings.filter(function(el){ return (el['status'].substring(0, 4) === e.options[e.selectedIndex].text.substring(0, 4));})
        else{ 
            var temp = bookings
        }
        load(temp);
    });

});

document.addEventListener("load", $(function () {
    $.getJSON('bookings.json', function(data) {load(data);});
}));

const button = document.getElementById("newbutton");
button.addEventListener("click", (event)=>{
    console.log(event);
    document.querySelector("#new").style.visibility="visible";
})


document.addEventListener("dblclick",(event)=>{
    const id = event.target.childNodes[0].parentNode.offsetParent.cells[0].innerHTML
    const lp = event.target.childNodes[0].parentNode.offsetParent.cells[2].innerHTML
    console.log(lp)
    if (event.target.className === "ongoing"){
        event.target.className = "cancelled"
        event.target.innerHTML = "Ακυρωμένη"
        window.location.href +=`/changestate?id=${id}&lp=${lp}`
    }
})