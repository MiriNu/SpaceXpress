function getUserID() {
    var url = window.location.href;
    return (url.split('uid=')[1]);
}

function stage1() {
    var destinationCounter = 0;
    var tripForm1 = document.getElementById("tripForm1");
    var addForm1 = document.getElementById("addForm1");

    function createForm1Input() {
        var planetNameInput = document.createElement("input");
        var startDateInput = document.createElement("input");
        var endDateInput = document.createElement("input");
        var userID = document.createElement("input");

        destinationCounter++;
        if (destinationCounter >= 3){
            addForm1.style.visibility = "hidden";
        }

        planetNameInput.type = "text";
        planetNameInput.name = "planet" + destinationCounter;
        planetNameInput.placeholder = "Planet Name";
        planetNameInput.id = "planet" + destinationCounter;
        planetNameInput.required = true;
        planetNameInput.pattern = "[A-Za-z0-9 ]{1,}";
        planetNameInput.title = "Letters, numbers, space";

        startDateInput.type = "date";
        startDateInput.name = "start" + destinationCounter;
        startDateInput.id = "start" + destinationCounter;
        startDateInput.required = true;
        startDateInput.title = "Dates should be in correct order";

        endDateInput.type = "date";
        endDateInput.name = "end" + destinationCounter;
        endDateInput.id = "end" + destinationCounter;
        endDateInput.required = true;
        endDateInput.title = "Dates should be in correct order";

        userID.type = "hidden";
        userID.name = "uid";
        userID.value = getUserID();

        tripForm1.insertBefore(document.createElement("br"), addForm1);
        tripForm1.insertBefore(planetNameInput, addForm1);
        tripForm1.insertBefore(startDateInput, addForm1);
        tripForm1.insertBefore(endDateInput, addForm1);
        tripForm1.insertBefore(userID, addForm1);
    }

    tripForm1.onsubmit = function() {
        var reg = /[^A-Za-z0-9 ]/;
        for(var i = 1; i <= destinationCounter; i++) {
            if(document.getElementById("planet" + i).value == "" || document.getElementById("start" + i).value == "" || document.getElementById("end" + i).value == "") {
                return false;
            }
            if(reg.test(document.getElementById("planet" + i).value)){
                return false;
            }
            if(i > 1){
                if(document.getElementById("end" + (i-1)).value >  document.getElementById("start" + i).value){
                    return false;
                }
            }
            if(document.getElementById("start" + i).value > document.getElementById("end" + i).value){
                return false;
            }
        }
        return true;
    };

    addForm1.addEventListener("click", function() {if (destinationCounter < 3) createForm1Input();});
    createForm1Input();
}

function stage2() {
    var json_data = [];
    var dataLenght = 0;
    var attractionCounter = 0;
    var recommendedCounter = 0;
    var selected = 0;
    var tripForm2 = document.getElementById("tripForm2");
    var recommended = document.getElementById("recommended");
    var attractions = document.getElementById("attractions");
    var searchAttr = document.getElementById("attractionSearch");
    var alienFilter = document.getElementById("alienFilter");
    var gravityFilter = document.getElementById("gravityFilter");
    var timeFilter = document.getElementById("timeFilter");
    var aiFilter = document.getElementById("aiFilter");
    var elementsFilter = document.getElementById("elementsFilter");
    var rownum = 1;
    var n =133;  /*scroll check*/
    alienFilter.toggleState = false;
    gravityFilter.toggleState = false;
    timeFilter.toggleState = false;
    aiFilter.toggleState = false;
    elementsFilter.toggleState = false;

    $.getJSON("server/get-attr.php", function (data) {
        if(data.length) {
            dataLenght = data.length;
            json_data = data;
            for (; rownum <= 9; rownum++) {
                addAttr();
            }
        }
        else {
            var noData = document.createElement("p");
            noData.style.color = "#c63f2d";
            noData.style.margin = "20px";
            noData.innerHTML = " Attractions only available for planet 'HD 219134 b', Sorry!";
            document.getElementById("attractions").appendChild(noData);
        }
    });

    window.onscroll = function scrollFunction() {
        if ((document.body.scrollTop > n || document.documentElement.scrollTop > n)&& (rownum< json_data.length-1)){
            n+=173;
            for (var i=0; i<3; i++)
            {
                if(dataLenght > attractionCounter){
                    addAttr();
                    rownum++;
                }
            }
        }
    };

    function addAttr () {
        var row = json_data[rownum - 1];
        var formCheck = document.createElement("section");
        var inputCheck = document.createElement("input");
        var labelCheck = document.createElement("label");
        var attraction = document.createElement("article");
        var attInfo = document.createElement("a");
        var attInfoIcon = document.createElement("i");
        var attName = document.createElement("h6");
        var attImg = document.createElement("img");
        var attSelectContainer = document.createElement("section");
        var attSelectFull = document.createElement("section");
        var attSelectEmpty = document.createElement("section");
        var attSelectIcon = document.createElement("i");

        attractionCounter++;
        attraction.className = "form-check-article";
        attraction.id = row.planet + "_" + row.name;
        attraction.name =row.name;
        attraction.planet =row.planet;
        attraction.rating =row.rating;
        attraction.alien =row.alien;
        attraction.gravity =row.gravity;
        attraction.timeflow =row.timeflow;
        attraction.ai =row.ai;
        attraction.elements =row.elements;

        formCheck.className = "form-check form-check-inline";

        inputCheck.className = "form-check-input";
        inputCheck.type = "checkbox";
        inputCheck.name = "attraction" + attractionCounter;
        inputCheck.id = "attraction" + attractionCounter;
        inputCheck.value = attraction.id;

        labelCheck.className = "form-check-label";
        labelCheck.htmlFor = inputCheck.id;

        attInfoIcon.className = "fas fa-info-circle";
        attInfo.appendChild(attInfoIcon);
        attInfo.className = "info";
        attInfo.href = "#";
        attraction.appendChild(attInfo);
        attName.innerHTML = row.name;
        attraction.appendChild(attName);
        attImg.src = "images/Image_62 (1).png";
        attraction.appendChild(attImg);
        attSelectIcon.className = "fas fa-check-circle";
        attSelectIcon.style.display = "none";
        attSelectEmpty.appendChild(attSelectIcon);
        attSelectEmpty.className = "emptySelect";
        attSelectEmpty.style.display = "none";
        attSelectContainer.appendChild(attSelectEmpty);
        attSelectFull.className = "fullSelect";
        attSelectFull.style.display = "none";
        attSelectContainer.appendChild(attSelectFull);
        attSelectContainer.className = "select";
        attraction.appendChild(attSelectContainer);
        for (var i=1; i<=row.rating; i++){
            var attStar = document.createElement("i");
            attStar.className = "fas fa-star";
            attraction.appendChild(attStar);
        }
        if (row.alien ==1){
            var attAlien = document.createElement("i");
            attAlien.className = "fab fa-reddit-alien";
            attraction.appendChild(attAlien);
        }
        if (row.gravity ==1){
            var attGravity = document.createElement("i");
            attGravity.className = "fab fa-grav";
            attraction.appendChild(attGravity);
        }
        if (row.timeflow ==1){
            var attTime = document.createElement("i");
            attTime.className = "fas fa-clock";
            attraction.appendChild(attTime);
        }
        if (row.ai ==1){
            var attAi = document.createElement("i");
            attAi.className = "fas fa-robot";
            attraction.appendChild(attAi);
        }
        if (row.elements ==1){
            var attElements = document.createElement("i");
            attElements.className = "fab fa-ethereum";
            attraction.appendChild(attElements);
        }

        labelCheck.appendChild(attraction);
        formCheck.appendChild(inputCheck);
        formCheck.appendChild(labelCheck);
        if(recommendedCounter < 3 && row.gravity == 1){
            recommended.appendChild(formCheck);
            recommendedCounter++;
        }
        else {
            attractions.appendChild(formCheck);
        }

        attraction.addEventListener("mouseover", showCheck);
        attraction.addEventListener("mouseout", hideCheck);
        attraction.addEventListener("click", selectCheck);
    }

    function showCheck(){
        var inputId = this.parentNode.htmlFor;
        if(!document.getElementById(inputId).checked){
            if(selected == 0){
                this.getElementsByClassName("emptySelect")[0].style.display = "";
            }
            this.getElementsByClassName("fas fa-check-circle")[0].style.display = "";
        }
    }

    function hideCheck(){
        if(this.getElementsByClassName("fas fa-check-circle")[0].style.display != "none"){
            if(selected == 0){
                this.getElementsByClassName("emptySelect")[0].style.display = "none";
            }
            this.getElementsByClassName("fas fa-check-circle")[0].style.display = "none";
        }
    }

    function reorderSelected(num){
        for (var i = 0; i < attractionCounter - recommendedCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attractions.getElementsByTagName("input")[i].checked){
                var oldNum = attraction.getElementsByClassName("fullSelect")[0];
                if(Number(oldNum.innerHTML) > num){
                    oldNum.innerHTML = "" + (Number(oldNum.innerHTML) - 1);
                }
            }
            if(i < recommendedCounter){
                var attractionRec = recommended.getElementsByTagName("article")[i];
                if(recommended.getElementsByTagName("input")[i].checked){
                    var oldNumRec = attractionRec.getElementsByClassName("fullSelect")[0];
                    if(Number(oldNumRec.innerHTML) > num){
                        oldNumRec.innerHTML = "" + (Number(oldNumRec.innerHTML) - 1);
                    }
                }
            }
        }
    }

    function showEmpty(){
        for (var i = 0; i < attractionCounter - recommendedCounter; i++){
            attractions.getElementsByClassName("emptySelect")[i].style.display = "";
            if(i < recommendedCounter){
                recommended.getElementsByClassName("emptySelect")[i].style.display = "";
            }
        }
        document.getElementById("selectedAttractions").style.visibility = "visible";
        document.getElementById("contTrip2").disabled = false;
    }

    function hideEmpty(){
        for (var i = 0; i < attractionCounter - recommendedCounter; i++){
            attractions.getElementsByClassName("emptySelect")[i].style.display = "none";
            if(i < recommendedCounter){
                recommended.getElementsByClassName("emptySelect")[i].style.display = "none";
            }
        }
        document.getElementById("selectedAttractions").style.visibility = "hidden";
        document.getElementById("contTrip2").disabled = true;
    }

    function selectCheck(){
        var inputId = this.parentNode.htmlFor;
        var checkedObj = this.getElementsByClassName("select")[0];
        var empty = checkedObj.getElementsByClassName("emptySelect")[0];
        var full = checkedObj.getElementsByClassName("fullSelect")[0];
        var selectedAttr = document.getElementById("selectedNumber");

        if(!document.getElementById(inputId).checked && selected < 5){
            if(selected == 0){
                showEmpty();
            }
           selected++;
           empty.style.display = "none";
           full.style.display = "";
           full.innerText = "" + selected;
           if (selected == 5){
               disableCheckbox(inputId);
               hideEmpty();
               document.getElementById("selectedAttractions").style.visibility = "visible";
               document.getElementById("contTrip2").disabled = false;
           }
           selectedAttr.innerText = "" + selected;
        }
        if(document.getElementById(inputId).checked){
            selected--;
            if (selected < 0) {
                selected = 0;
            }
            full.style.display = "none";
            empty.style.display = "";
            reorderSelected(Number(full.innerText));
            if(selected == 0){
                hideEmpty();
            }
            else if(selected == 4){
                enableCheckbox();
                showEmpty();
            }
            selectedAttr.innerText = "" + selected;
        }
    }

    function disableCheckbox(inputId) {
        for (var i = 0; i < attractionCounter - recommendedCounter; i++){
            var attr = attractions.getElementsByTagName("input")[i];
            if(!attr.checked && attr.id != inputId){
                attr.disabled = true;
            }
            if(i < recommendedCounter){
                var rec = recommended.getElementsByTagName("input")[i];
                if(!rec.checked && rec.id != inputId){
                    rec.disabled = true;
                }
            }
        }
    }

    function enableCheckbox() {
        for (var i = 0; i < attractionCounter - recommendedCounter; i++){
            attractions.getElementsByTagName("input")[i].disabled = false;
            if(i < recommendedCounter) {
                recommended.getElementsByTagName("input")[i].disabled = false;
            }
        }
    }

    searchAttr.onkeyup = function attractionsByName() {
        var filter = searchAttr.value.toUpperCase();
        for(var i=0; i<attractionCounter - recommendedCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attraction){
                if(attraction.name.toUpperCase().indexOf(filter) > -1){
                    attraction.style.display = "";
                }
                else {
                    attraction.style.display = "none";
                }
            }
        }
    };

    function attractionsFilterOn(filter) {
        for(var i=0; i<attractionCounter - recommendedCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attraction){
                if(attraction[filter]== 0 && attraction.style.display != "none"){
                    attraction.style.display = "none";
                }
            }
        }
    }

    function attractionsFilterOff(){
        for(var i=0; i<attractionCounter - recommendedCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attraction){
                if(attraction.style.display == "none"){
                    if(alienFilter.toggleState && attraction.alien == 0){}
                    else if(gravityFilter.toggleState && attraction.gravity == 0){}
                    else if(timeFilter.toggleState && attraction.timeflow == 0){}
                    else if(aiFilter.toggleState && attraction.ai == 0){}
                    else if(elementsFilter.toggleState && attraction.elements == 0){}
                    else{
                        attraction.style.display = "";
                    }
                }
            }
        }
    }

    function attractionsFilterState(filter){
        switch (filter){
            case "alien":
                if(!alienFilter.toggleState){
                    alienFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    alienFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
            case "gravity":
                if(!gravityFilter.toggleState){
                    gravityFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    gravityFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
            case "timeflow":
                if(!timeFilter.toggleState){
                    timeFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    timeFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
            case "ai":
                if(!aiFilter.toggleState){
                    aiFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    aiFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
            case "elements":
                if(!elementsFilter.toggleState){
                    elementsFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    elementsFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
        }
    }

    tripForm2.onsubmit = function() {
        if (selected <= 0) {
            return false;
        }
        return true;
    };

    alienFilter.addEventListener("click", function(){attractionsFilterState("alien");});
    gravityFilter.addEventListener("click", function(){attractionsFilterState("gravity");});
    timeFilter.addEventListener("click", function(){attractionsFilterState("timeflow");});
    aiFilter.addEventListener("click", function(){attractionsFilterState("ai");});
    elementsFilter.addEventListener("click", function(){attractionsFilterState("elements");});

    document.getElementById("selectedAttractions").style.visibility = "hidden";
    document.getElementById("contTrip2").disabled = true;
}

function stage3() {
    var json_data = [];
    var form3 = document.getElementById("tripForm3");

    $.getJSON("server/get-day.php", function (data) {
        json_data = data;
        var prevDay = 0;
        var summId = 1;
        for (var row of data) {
            if(row.day > prevDay){
                var day = document.createElement("section");
                var dayTitle = document.createElement("h5");

                dayTitle.className = "mb-0";
                dayTitle.innerText = "Day " + row.day + ": " + row.trip_date;

                day.appendChild(dayTitle);
                form3.appendChild(day);

                prevDay = row.day;
            }

            var dateSplit = (row.trip_date).split(".");
            var container = document.createElement("section");
            var attraction = document.createElement("article");
            var attrInput = document.createElement("input");
            var attrPlaceInput = document.createElement("input");
            var dayInput = document.createElement("input");
            var attInfo = document.createElement("a");
            var attInfoIcon = document.createElement("i");
            var attName = document.createElement("h6");
            var attSelect = document.createElement("section");
            var attAddress = document.createElement("h4");

            row.id = summId;
            summId++;

            container.className = "ddContainer";

            attraction.id = row.name + "_" + row.planet + "_summary";
            attraction.draggable = true;

            attrInput.type = "number";
            attrInput.name = "attrID" + row.id;
            attrInput.value = row.attr;
            attraction.appendChild(attrInput);

            attrPlaceInput.type = "number";
            attrPlaceInput.name = "attrNum" + row.id;
            attrPlaceInput.value = row.place;
            attraction.appendChild(attrPlaceInput);

            dayInput.type = "number";
            dayInput.name = "dayID" + row.id;
            dayInput.value = row.day_id;
            attraction.appendChild(dayInput);

            attInfoIcon.className = "fas fa-info-circle";
            attInfo.appendChild(attInfoIcon);
            attInfo.className = "info";
            attInfo.href = "#";
            attraction.appendChild(attInfo);

            attName.innerHTML = row.name;
            attraction.appendChild(attName);

            attSelect.className = "fullSelect";
            attSelect.innerText = row.place;
            attraction.appendChild(attSelect);

            if (row.alien == 1){
                var attAlien = document.createElement("i");
                attAlien.className = "fab fa-reddit-alien";
                attraction.appendChild(attAlien);
            }
            if (row.gravity == 1){
                var attGravity = document.createElement("i");
                attGravity.className = "fab fa-grav";
                attraction.appendChild(attGravity);
            }
            if (row.timeflow == 1){
                var attTime = document.createElement("i");
                attTime.className = "fas fa-clock";
                attraction.appendChild(attTime);
            }
            if (row.ai == 1){
                var attAi = document.createElement("i");
                attAi.className = "fas fa-robot";
                attraction.appendChild(attAi);
            }
            if (row.elements == 1){
                var attElements = document.createElement("i");
                attElements.className = "fab fa-ethereum";
                attraction.appendChild(attElements);
            }

            attAddress.innerText = row.address;
            attraction.appendChild(attAddress);

            container.appendChild(attraction);
            form3.getElementsByClassName("mb-0")[row.day - 1].parentElement.appendChild(container);

            attraction.addEventListener("dragstart", function(){drag(event);});
            container.addEventListener("drop", function(){drop(event);});
            container.addEventListener("dragover", function(){allowDrop(event);});
        }
    });

    function drag(event){
        event.dataTransfer.setData("src", event.target.id);
        showBorders(event.target.id);
    }

    function drop(event){
        event.preventDefault();

        var src = document.getElementById(event.dataTransfer.getData("src"));
        var srcParent = src.parentNode;
        var tgt = event.currentTarget.firstElementChild;
        var srcPlace = src.getElementsByTagName("input")[1].value;
        var srcDate = src.getElementsByTagName("input")[2].value;
        var tgtPlace = tgt.getElementsByTagName("input")[1].value;
        var tgtDate = tgt.getElementsByTagName("input")[2].value;

        event.currentTarget.replaceChild(src, tgt);
        srcParent.appendChild(tgt);

        src.getElementsByTagName("input")[1].value = tgtPlace;
        src.getElementsByTagName("input")[2].value = tgtDate;
        src.getElementsByClassName("fullSelect")[0].innerText = tgtPlace;
        tgt.getElementsByTagName("input")[1].value = srcPlace;
        tgt.getElementsByTagName("input")[2].value = srcDate;
        tgt.getElementsByClassName("fullSelect")[0].innerText = srcPlace;

        hideBorders();
    }

    function allowDrop(event){
        event.preventDefault();
    }

    function showBorders(dragged){
        var containers = form3.getElementsByClassName("ddContainer");
        for(var container of containers){
            if(container.getElementsByTagName("article")[0].id == dragged){
                container.style.border = "3pt solid #2196f3";
            }
            else{
                container.style.border = "3pt dotted #2196f3";
            }
        }
    }

    function hideBorders(){
        var containers = form3.getElementsByClassName("ddContainer");
        for(var container of containers){
            container.style.border = "";
        }
    }

    document.getElementById('save').addEventListener("submit", function(){console.log("yo"); window.open('mytrips.html?uid=' + getUserID(), '_self');});
}

function getUserID() {
    var url = window.location.href;
    return (url.split('uid=')[1]);
}


$(document).ready(function (){
    var continue1 = document.getElementById("contTrip1");
    var continue2 = document.getElementById("contTrip2");
    var tripForm1 = document.getElementById("tripForm1");
    var tripForm2 = document.getElementById("tripForm2");
    continue1.addEventListener("click", collapse12);
    continue2.addEventListener("click", collapse23);

    document.getElementsByClassName('w3-bar-item')[0].href += '?uid=' + getUserID();
    document.getElementById('logo').href += '?uid=' + getUserID();

    stage1();

    function collapse12() {
        if(tripForm1.onsubmit()){

            $("#collapse2").collapse('toggle');
            stage2();
        }
    }

    function collapse23() {
        if(tripForm2.onsubmit()){

            $("#collapse3").collapse('toggle');
            stage3();
        }
    }
});