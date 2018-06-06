var check=document.getElementsByClassName('option');
var sear = document.getElementsByClassName('searbtn');
var deats = document.getElementsByClassName('flightDeats');
var inp = document.getElementsByTagName('input');

/*function initIndex () {

    for (var i=0; i<check.length; i++) {
        console.log("yo");
        check[i].addEventListener("click",changeForm);
    }
    addFlight();
    document.addEventListener('click', function(){ document.documentElement.scrollTop = 0; console.log("yo");});
    console.log("yo");
    getData();
}*/

/* ---------------flight related--------------- */

function changeForm () {
    var rad = whichChecked();
    switch (rad)
    {
        case 0:
            reset();
            document.getElementsByTagName('input')[7].disabled = true;
            break;
        case 1:
            reset();
            document.getElementsByTagName('input')[7].disabled = false;
            break;
        case 2:
            if (inp.length <= 9){
                document.getElementsByTagName('input')[7].disabled = false;
                addFlight();
                addPlusMinus();
            }
            break;
    }

}

function addPlusMinus () {
    var plus = document.createElement("i");
    var minus = document.createElement("i");
    plus.classList.add("fas");
    minus.classList.add("fas");
    plus.classList.add("fa-plus");
    minus.classList.add("fa-minus");
    $(minus).insertAfter(sear);
    $(plus).insertAfter(sear);
    plus.addEventListener("click", addFlight);
    minus.addEventListener("click", removeFlight);
}

function whichChecked () {
    for (var i=0; i<check.length; i++) {
        if (check[i].checked) {
            return i;
        }
    }
}

function addFlight () {
    if (inp.length <25) {
        var from = document.createElement("input");
        var to = document.createElement("input");
        var dep = document.createElement("input");
        var ret = document.createElement("input");
        var pass = document.createElement("input");

        from.type = 'text';
        to.type = 'text';
        dep.type = 'date';
        ret.type = 'date';
        pass.type = 'number';

        from.name = 'from';
        to.name = 'to';
        dep.name = 'depart';
        ret.name = 'return';
        pass.name = 'pass';

        from.placeholder = ' From';
        to.placeholder = ' To';
        dep.placeholder = ' Depart';
        ret.placeholder = ' Return';
        pass.placeholder = ' Passengers';

        $(from).insertBefore(sear);
        $(to).insertBefore(sear);
        $(dep).insertBefore(sear);
        $(ret).insertBefore(sear);
        $(pass).insertBefore(sear);
    }
}

function removeFlight () {
    for (var i=0; i<5; i++)
    {
        if (inp.length != 9)
          $(inp[inp.length-1]).remove();
    }
}

function reset () {
    while (inp.length != 9)
        removeFlight ();
    $(".flightDeats .fa-plus").remove();
    $(".flightDeats .fa-minus").remove();
}


/* ---------------journey related--------------- */


function getData () {
    var json_data = [];
    $.getJSON("data/journeys.json", function (data) {
        console.log(data);
        json_data = data;
        for (var journeys of data) {
            var journey = $(
                '<section class="jour">'+
                    '<a href="#"> <img src="'+journeys.profile+'"></a>' +
                    '<h3>'+ journeys.title + journeys.user + '</h3>' +
                    '<ul>'+
                        '<li>' +
                            '<span class="fa fa-star "></span>'+
                            '<span class="fa fa-star "></span>'+
                            '<span class="fa fa-star "></span>'+
                            '<span class="fa fa-star "></span>'+
                            '<span class="fa fa-star "></span>'+
                        '</li> '+

                        '<li>&nbsp;Reviews '+
                            journeys.review + ' | '+
                        '</li>'+

                        '<li>Planets: ' +
                            journeys.planets + ' | '+
                        '</li>'+

                        '<li>' +
                            journeys.tags+
                        '</li>'+
                    '</ul>'+

                    '<section>'+
                        '<h4>Featured Post</h4>'+

                        '<br><h4>'+ journeys.ptitle +'</h4>'+
                        '<p>'+journeys.parag+'<br><a href="#">Read more...</a></p>'+

                    '</section>'+

                    '<section>'+
                        '<h4>Featured Attractions</h4>'+
                        '<section class="attr">'+
                            '<a href="#"><img src="'+ journeys.p1 +'"></a>'+
                            '<p>'+ journeys.t1 +'</p>'+
                            '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'+
                        '</section>'+

                        '<section class="attr">'+
                            '<a href="#"><img src="'+ journeys.p2 +'"></a>'+
                            '<p>'+ journeys.t2 +'</p>'+
                            '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'+
                        '</section>'+
                    '</section>'+
                 '</section>'
            )
            $('main').append(journey);
        }
    });

}

/*"p1":"../../images/colorful_beach_nebula-wide.jpg",
"p2":"../../images/free-sci-fi-wallpaper_010014836_283.jpg",
"p1":"../../images/Capture.png",
"p2":"../../images/walle-socialnetwork05.jpg",*/

/*"t1":"Tentacool4 School",
    "t2":" Haukila  ",
    "p1":"../../images/Capture.png",
    "p2":"../../images/walle-socialnetwork05.jpg"*/

/*"t1":"Opan Gund",
"t2":"WardcM4rrv",
"p1":"../../images/colorful_beach_nebula-wide.jpg",
"p2":"../../images/free-sci-fi-wallpaper_010014836_283.jpg"*/

/* ---------------page related--------------- */

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var top = document.getElementsByClassName("back2top")[0];
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        top.style.visibility = "visible";
        top.addEventListener('click', function(){ document.documentElement.scrollTop = 0;});
    } else {
        top.style.visibility = "hidden";
    }
}

$( document ).ready(function() {

    for (var i=0; i<check.length; i++) {
        check[i].addEventListener("click",changeForm);
    }
    addFlight();
    document.getElementsByTagName('input')[7].disabled = true;
    getData();
});