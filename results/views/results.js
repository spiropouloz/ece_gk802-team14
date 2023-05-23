const checkboxes = document.querySelectorAll('[type="checkbox"]')

function handlecheck(checkbox){
    checkboxes.forEach(element => {
        element.checked = false;
    });
    checkbox.checked = true;
}
