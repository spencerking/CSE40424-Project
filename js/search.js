function highlightSearch() {
    var text = document.getElementById("query").value;
    var query = new RegExp("(\\b" + text + "\\b)", "gim");
    var e = document.getElementById("searchtext").innerHTML;
    var enew = e.replace(/(<span>|<\/span>)/igm, "");
    document.getElementById("searchtext").innerHTML = enew;
    var newe = enew.replace(query, "<span>$1</span>");
    document.getElementById("searchtext").innerHTML = newe;

}