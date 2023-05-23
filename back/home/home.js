
// e.addEventListener("change", () =>{
//     const tbl = document.getElementById("table");
//     tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);

//     $.getJSON('database.json', function(data) {
        
//         if (e.options[e.selectedIndex].text !== "Όλες")
//             var temp = data.bookings.filter(function(el){ return (el['status'].substring(0, 4) === e.options[e.selectedIndex].text.substring(0, 4));})
//         else{ 
//             var temp = data.bookings
//         }
//         load(data, temp);
//     });

// });


let ongoing=0;
let gross=0;
let total=0;

function load() {
    $.getJSON('../bookings/bookings.json', function(bookings) {
        for (let i=0; i<bookings.length; i++){
            const booking = bookings[i];
            console.log(booking['status']);
            active(booking);
            earnings(booking);
            all(booking);
        }
        document.querySelector("#active-bookings").innerHTML = ongoing;
        document.querySelector("#earnings").innerHTML = gross + ' €';
        document.querySelector("#total-bookings").innerHTML = total;
    });
};

function active(booking){
    if (booking['status'] === "Ενεργή")
        ongoing++;
}

function earnings(booking) {
    if (booking['status'] !== "Ακυρωμένη")
        gross+= booking['price'];
}

function all(booking){
    if (booking['status'] !== "Ακυρωμένη")
        total++;
}


document.addEventListener("load", load());


