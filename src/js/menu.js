var list = document.getElementById("menu");
var items = list.getElementsByClassName("setting-tab-item");
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("item-activated");
        current[0].className = current[0].className.replace(" item-activated", "");
        this.className += " item-activated";
    });
}