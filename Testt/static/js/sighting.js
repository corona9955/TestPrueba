'{% load static %}'
var dataFamilys = [];
var dataSubfamilys = [];

$(function () {
    var coordsArray = [];
    var contentInfo = [];
    var contentStatus = [];
    var contentImage = [];

    var dataSightingBees = [];
    var dataBees = [];


    window.addEventListener("load", async () => {
        await initialLoad();
    });

    const initialLoad = async () => {
        await listSightings(); 

    }

    const listSightings = async () => {
        try {
            const response = await fetch("../coord-personal/");
            const data = await response.json();

            if (data.message == "Success") {
                for (j = 0; j < data.sighting.length; j++) {

                    listlat = parseFloat(data.sighting[j]['sighLat']);
                    listlng = parseFloat(data.sighting[j]['sighLng']);

                    liststring = (data.sighting[j]['sighComment']);
                    listboolean = (data.sighting[j]['sighApproved']);

                    listSightingBee = parseFloat(data.sighting[j]['sighBee_id']);

                    listImage = data.sighting[j]['sighPicture'];


                    coordsArray.push({ lat: listlat, lng: listlng });
                    contentInfo.push(liststring);
                    contentStatus.push(listboolean);
                    dataSightingBees.push([listSightingBee]);
                    contentImage.push("https://res.cloudinary.com/dwxkhmtb3/" + listImage);
                }

                console.log(coordsArray);

                console.log(contentInfo);

                console.log(dataSightingBees);

                console.log(contentImage);
            }


            const response1 = await fetch("../bee/");
            const data1 = await response1.json();

            if (data1.message == "Success") {
                for (k = 0; k < data1.bee.length; k++) {
                    listIdbees = (data1.bee[k]['id']);
                    listNamebees = (data1.bee[k]['beeName']);
                    dataBees.push([listIdbees, listNamebees])
                }
                console.log(dataBees);
                for (n = 0; n < dataBees.length; n++) {
                    for (m = 0; m < dataSightingBees.length; m++) {
                        if (dataSightingBees[m]['0'] == dataBees[n]['0']) {
                            dataSightingBees[m]['1'] = dataBees[n]['1'];
                        }
                    }
                }
                console.log(dataSightingBees);
            }




            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getCoords, getError);
            } else {

            }

            function getCoords(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                console.log(lat, lng);
                $('#sighLat').val(lat);
                $('#sighLng').val(lng);
                initialize(lat, lng);
            }

            function getError(err) {
                initialize(32.4951447, -116.9407001);
            }
            function initialize(lat, lng) {

                var center = { lat: lat, lng: lng }

                var map = new google.maps.Map(document.getElementById('mapa'), {
                    zoom: 9,
                    center: center,
                    mapTypeId: 'hybrid',
                });


                var infowindow2 = new google.maps.InfoWindow();
                var marker2, i;
                for (i = 0; i < coordsArray.length; i++) {

                    marker2 = new google.maps.Marker({
                        position: new google.maps.LatLng(coordsArray[i]),
                        map: map,
                        draggable: false,
                        title: 'Avistamientos de abejas',
                        icon: "/static/img/icons/BeeSighting.png",

                    });
                    google.maps.event.addListener(marker2, 'click', (function (marker2, i) {
                        return function () {
                            let card = '';
                            let head = '';
                            
                            if (contentStatus[i]) {
                                card += '<div class="card border-primary';
                                head += '<div class="card-header bg-primary">Avistamiento confirmado</div>';
                            }
                            else{
                                card += '<div class="card border-danger';
                                head += '<div class="card-header bg-danger text-white">Avistamiento en espera</div>';
                            }
                            
                            infowindow2.setContent(
                                card +
                                '" style="width: 12rem;">'+
                                head +
                                '<img class="card-img-top" src="' + contentImage[i] + '" alt="Card image cap">'+
                                    '<div class="card-body">'+
                                        '<p class="card-text"> Comentario ' + contentInfo[i] + '</p>'+
                                    '</div>'+
                                '</div>'

                            );
                            infowindow2.open(map, marker2)
                        }
                    })(marker2, i));
                }

            }

            const response2 = await fetch("../family/");
            const data2 = await response2.json();

            if (data2.message == "Success") {
                for (l = 0; l < data2.family.length; l++) {
                    listIdfamily = (data2.family[l]['id']);
                    listNamefamily = (data2.family[l]['familyName']);
                    dataFamilys.push([listIdfamily, listNamefamily]);
                }

                console.log(dataFamilys[0][1]);

                let options1 = ``;

                for (p = 0; p < dataFamilys.length; p++) {
                    options1 += `<option value='${dataFamilys[p][1]}'></option>`;
                }
                list2familyName.innerHTML = options1;
            }

            ///////////////////////////////////////////////////////////////////////

            const response3 = await fetch("../subfamily/");
            const data3 = await response3.json();

            if (data3.message == "Success") {
                for (q = 0; q < data3.subfamily.length; q++) {
                    listIdsubfamily = (data3.subfamily[q]['id']);
                    listNamesubfamily = (data3.subfamily[q]['subfamilyName']);
                    listFamilysubfamily = (data3.subfamily[q]['subfamilyFamily_id']);
                    dataSubfamilys.push([listIdsubfamily, listNamesubfamily, listFamilysubfamily]);
                }
                console.log(dataSubfamilys);
            }

        } catch (error) {
            console.log(error)
        }
    };
});

function autoFieldSubfamily() {
    let famcommun = [];

    valueInputFamily = document.getElementById('familyName').value

    if (valueInputFamily != "" || valueInputFamily != null) {
        for (a = 0; a < dataFamilys.length; a++) {
            for (s = 0; s < dataSubfamilys.length; s++) {
                if (dataFamilys[a][0] == dataSubfamilys[s][2]) {
                    famcommun.push([dataSubfamilys[s][1], dataFamilys[a][1]]);
                }
            }
        }
        console.log(famcommun);

        let options2 = ``;
        for (t = 0; t < famcommun.length; t++) {
            if (famcommun[t][1] == valueInputFamily) {
                options2 += `<option value='${famcommun[t][0]}'></option>`;
            }
        }
        console.log(options2);
        list3subfamilyName.innerHTML = options2;
    }
}