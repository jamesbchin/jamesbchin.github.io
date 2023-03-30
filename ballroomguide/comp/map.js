var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

(function () {
    window.onscroll = function (e) {
        alertfadeout();
    };
    document.querySelectorAll('#map-container svg[id^="map-area-"] path').forEach(function(area) {
        area.addEventListener("click", function(event) {
            if(area.parentElement.parentElement.parentElement.dataset["selected"] == "true")
            {
                area.parentElement.parentElement.parentElement.dataset["selected"] = "false";
            } else {
                area.parentElement.parentElement.parentElement.dataset["selected"] = "true";
            }
            refreshListings(event);
        });

        testExp = new RegExp('Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobilei');
        if (!testExp.test(navigator.userAgent)) {
            area.addEventListener("mouseenter", function(event) {
                area.parentElement.querySelectorAll("path").forEach(function(p){
                    p.style="fill:#f08a7f;";
                });
                area.parentElement.parentElement.parentElement.style = "transform:scale(1.05);transform-origin:center center;z-index:13;";
            });
            area.addEventListener("mouseleave", function(event) {
                area.parentElement.querySelectorAll("path").forEach(function(p){
                    p.style="";
                });
                area.parentElement.parentElement.parentElement.style = "";
            });
        }
    });

    document.querySelectorAll('#map-selections input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.addEventListener("change", function(event) {
            refreshListings(event);
        });
    });
})();

function refreshListings(event) {
    selections = [];
    document.querySelectorAll('#map-selections input[type="checkbox"]').forEach(function(checkbox) {
        if(checkbox.checked) {
            selections.push(checkbox.value);
        }
    });

    areas = [];
    document.querySelectorAll('#map-container svg[data-selected="true"]').forEach(function(area) {
        areas.push(area);
    });

    years = {};

    areas.forEach(area => {
        code = area.dataset["area"];
        if(data.hasOwnProperty(code))
        {
            selections.forEach(el => {
                if(data[code].hasOwnProperty(el))
                { 
                    data[code][el].forEach(function (entry) {
                        tempD = new Date(entry.date);
                        if(tempD instanceof Date && !isNaN(tempD))
                        {
                            y = tempD.getUTCFullYear();
                        } else {
                            y = entry.date.substring(0,4);
                        }
                        
                        if(!years.hasOwnProperty("year"+y))
                        {
                            years["year"+y] = [];
                            years["year"+y].push({yearPointer: y});
                        }

                        fentry = JSON.parse(JSON.stringify(entry));
                        years["year"+y].push(fentry);
                    });
                }
            });
        }
    });

    tb = document.querySelector("#map-list table");
    tb.innerHTML = "";

    Object.keys(years).forEach(function (y) {
        years[y].sort(function(a, b) {
            if(a.hasOwnProperty("yearPointer"))
            {
                return -1;
            } else if(b.hasOwnProperty("yearPointer")) {
				return 1;
			}
            tempA = new Date(a.date);
            tempB = new Date(b.date);

            if(!(tempA instanceof Date && !isNaN(tempA)))
            {
                return 1;
            }

            if(!(tempB instanceof Date && !isNaN(tempB)))
            {
                return -1;
            }

            return tempA - tempB;
        });

        firstiteration = true;
        years[y].forEach(function (f) {
            if(firstiteration) {
                firstiteration = false;
                return;
            }
            
            tempD = new Date(f.date);
            if(tempD instanceof Date && !isNaN(tempD))
            {
                if(f.hasOwnProperty("date2"))
                {
                    f.date = months[tempD.getUTCMonth()]+" "+tempD.getUTCDate()+" - "+f.date2;
                } else {
                    f.date = months[tempD.getUTCMonth()]+" "+tempD.getUTCDate();
                }
            } else {
                if(f.date === undefined)
                {
                    return;
                } else {
                    if(f.hasOwnProperty("date2"))
                    {
                        f.date = f.date.substring(5)+" - "+f.date2;
                    } else {
                        f.date = f.date.substring(5);
                    }
                }
            }
        });      
    });

    Object.keys(years).sort().forEach(key => {
        tr = document.createElement('tr');
		
        tr.innerHTML = "<tr><td style='width:20%'><h2 style='color:#ed786a'>"+years[key].shift().yearPointer+"</h2></td><td style='width:80%'><h2 style='color:#ed786a'>Competitions</h2></td></tr>";
        tb.append(tr);

        years[key].forEach(entry => {
            tr = document.createElement('tr');
            tr.innerHTML = "<tr><td><strong>"+entry.date+"</strong></td><td><a href='"+entry.link+"'><strong style='font-size:125%'>"+entry.title+"</strong></a><br>"+entry.location+"</td></tr>";
            tb.append(tr);
        });
    });

    alertfadein();

    return;
}

function alertfadein() {
    alert = document.querySelector("#map-alert:not(.fadein)");
    if(alert != null) {
        if(alert.className == "" || alert.className === null || alert.className === undefined)
        {
            alert.className = "fadein";
        }
    }
}

function alertfadeout() {
    alert = document.querySelector("#map-alert.fadein");
    if(alert != null) {
        alert.className = "";
    }
}