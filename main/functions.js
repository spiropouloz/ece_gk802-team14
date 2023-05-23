function toggle(value) {
  if (document.getElementById(value).checked) {
    for (let i=0; i<document.getElementsByClassName(value).length; i++)
      document.getElementsByClassName(value)[i].style.display = "block";
  } 
  else {
    for (let i=0; i<document.getElementsByClassName(value).length; i++)
      document.getElementsByClassName(value)[i].style.display = "none";
  }
}
