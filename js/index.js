let modal = document.getElementById('modalBar');
let link = document.getElementById('modalLink');
let close = document.getElementById('close');

link.onclick = function () {
    modal.style.display = "flex";
}

close.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
