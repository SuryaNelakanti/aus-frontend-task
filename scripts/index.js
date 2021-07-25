function handleForm(e){
    e.preventDefault()
    let movie = document.getElementById('myInput').value
    sfMovieData(movie)
}

function autocomplete(inp, arr) {
        /*  the autocomplete function takes two arguments,
            the tex field element and an array of possible autocompleted values: 
            execute a function when someone writes in the text field:
            close any already open lists of autocompleted values
            create a DIV element that will contain the items (values):
            append the DIV element as a child of the autocomplete container:
            for each item in the array...
            check if the item starts with the same letters as the text field value:
            create a DIV element for each matching element:
            make the matching letters bold:
            insert a input field that will hold the current array item's value:
            execute a function when someone clicks on the item value (DIV element):
            insert the value for the autocomplete text field:
            close the list of autocompleted values, or any other open lists of autocompleted values:*/
            inp.addEventListener("input", function(e) {
                var a, b, i, val = this.value;
                closeAllLists();
                if (!val) { return false;}
                currentFocus = -1;
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                this.parentNode.appendChild(a);
                for (i = 0; i < arr.length; i++) {
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        b = document.createElement("DIV");
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        b.addEventListener("click", function(e) {
                            inp.value = this.getElementsByTagName("input")[0].value;
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    } 
}         
            
            
    // Movie Api below here
const movieApi = "https://data.sfgov.org/resource/yitu-d5am.json"
sfMovieData()

function sfMovieData(movie){
    fetch(movieApi).then((response)=>{
        return response.json()
        }).then((data)=>{
            movieDetails(data,movie)
        }).catch((err)=>{
            console.log('Error has occured' + err)
        })
    }

    
    let movieMap = new Map()
  
    function movieDetails(data, movie){
        let movieNames =[]
        for(let i=0;i<data.length;i++){
            movieNames[i]=data[i]['title']
        }
        movieNames = movieNames.filter((item, i, ar) => ar.indexOf(item) === i)
    
        autocomplete(document.getElementById("myInput"), movieNames)

        let movieLocations = swap(movieNames)
        for(let i=0;i<data.length;i++){
            if(data[i]['locations']!=undefined){
                movieLocations[data[i]['title']]+= ' , ' + data[i]['locations']
                } 
            }
        let locationArray = []
        for(let i=0;i<Object.values(movieLocations).length;i++){
            locationArray[i] = Object.values(movieLocations)[i]   
        }
        for(let i=0;i<movieNames.length;i++){
            movieMap.set(movieNames[i],locationArray[i])
        }
        console.log(movie)
        compMovie(movieMap,movie)    
    }
    
function compMovie(mmap,mselected){
    mselected?(geoCodeSetup(mmap.get(mselected))):console.log("No value selected")
}


    function swap(json){
        var ret = {};
        for(var key in json){
        ret[json[key]] = key;
        }
        Object.keys(ret).forEach(function(key) {
            if(ret[key] >= 0) {
                ret[key] = '';
            }
        })
        return ret;
    }
    
    //map rendering below here
    mapboxgl.accessToken = 'pk.eyJ1IjoicG90YXRvaWNlIiwiYSI6ImNrcmJyamtlNjRldzYyb254OTl6dzh6OHAifQ.bLCGUr28fWBhA2Msu2_vPw';
    var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-122.4194,37.7749], // starting position [lng, lat]
    zoom: 11 // starting zoom
    });





    // // Location API below here 
    function geoCodeSetup(address){    
        let locationRequired = address
        locationRequired=locationRequired.split(",")
        const gcApiKey = "h7mHK2L1CqEHq6DCVK7o17koxgNMzHoV"
        const apiSite = "https://open.mapquestapi.com/geocoding/v1/address?key="+gcApiKey+"&location="+locationRequired+";"
        console.log((locationRequired))
        geoCodeApi(apiSite)
     }

    // To get the geo code latlng data call the below function 

    function geoCodeApi(apiSite){
        fetch(apiSite).then((response)=>{
            return response.json()
        }).then((data)=>{
            //work with json data here
            locationDetails(data)
        }).catch((err)=>{
            console.log('Error has occured' + err)
        })
    }


    function locationDetails(data){
        console.log(data['results'][0]['locations'][0]['latLng']['lng'])
        var marker1 = new mapboxgl.Marker()
        .setLngLat([data['results'][0]['locations'][0]['latLng']['lng'], data['results'][0]['locations'][0]['latLng']['lat']])
        .addTo(map);
    }
