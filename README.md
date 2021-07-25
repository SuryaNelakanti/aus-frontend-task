# aus-frontend-task </br>
UUID: b8c06ce0-a501-44f5-9fd9-037986fc0eda </br>
Link: https://suryanelakanti.github.io/aus-frontend-task/</br>
<b>SDE 1 hiring task</b> </br>


The task that I chose: </br>


<b>SF Movies</b> </br> 



Due to the fact that my exams are going on right now, I was unable to spend a lot of time on this task. (5 hours of work split over 2 days).
Owing to that, I was unable to complete the task, and do not think it is production ready yet. However, given a couple more hours, I would be able to finish the task upto the requirements mentioned.
</br>

<b>Task Outline</b></br>


Create a service that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search.</br>


<b>Requirements:</b>
 </br>
JSON data from SF Database of the list of movies, and their location. </br>
A Map rendering service. </br>
GeoCoder to convert location data into GeoJSON coordinates.</br>
 </br>
<b>Functionality:</b>
 </br>
 Map was rendered with San Francisco as the center. I used Mapbox for this.  
 I have taken JSON data from SF data using the inbuilt Fetch API in vanilla JavaScript.  </br>
 After doing so, I made an array with the list of movie names, and routed that to the <b>Autocomplete Feature</b>  </br>
 This feature works by performing a filtering function, to search the array of movies, every time the user enters a key in the form.  </br>
 Once submitted, the input movie name is compared to a Map of the movie names, and if it exists, it goes on to the GeoCoder function.</br>
 The GeoCoder function is basically an API call to Mapbox Geocoder. A batch request is made to the API, and the reverting latitude-longitude coordinates are then added to the map by way of mapgl.render() function.  </br>
  </br>
<b>Issues</b>
 </br>
 This is not production ready code in the sense it does not do what the task requires.  </br>
 However, the remaining steps are easy and would not take too long (maybe another hour or two of work is required).  </br>
 In lieu of this, here are the issues: </br>
 <b>High Priority:</b> </br>
 <->The batch geocoder GET request is sent in the wrong format, preventing the application from getting the multiple coordinates required for the mapping of Movie Shoot Locations. This leads to wrong pointer location in map. Also, San Fransisco as the city has not been sent as the default city, leading to location elsewhere in the map.</br>
 <->No seperation of front end and back end. I have done this entirely on HTML, CSS and JS. This application would greatly benefit from using a back end like expressJs, so that data handling is done better. </br>
 <->The private API key is publicly visible owing to the fact that i have done this entirely on the front end. This is a big security risk, and can be rectified easily, if there is a back-end framework used  </br>
  </br>
  <b>Medium Priority</b> </br>
 <->There is no indication of loading, so the user will not know if the data is being processed, or the application is stuck. </br>
 <->Form is badly designed visually. </br> 
  
 
 
