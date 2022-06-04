const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const movieForm = document.getElementById('movie-form')
const movieInfo = document.getElementById('movie-info')
//window.localStorage.clear()

let watchList = localStorage.getItem('watchList')?JSON.parse(localStorage.getItem('watchList')):[]

function handleClick(id){              
        fetch(`https://www.omdbapi.com/?apikey=8cb9361a&i=${id}`)
            .then(res => res.json())
            .then(data =>{                
                watchList.push(data)                           
                localStorage.setItem('watchList', JSON.stringify(watchList))                       
        })
}
        
movieForm.addEventListener('submit', function(e){
    e.preventDefault() 
    
    const title = searchInput.value  
    
    fetch(`https://www.omdbapi.com/?apikey=8cb9361a&s=${title}`)
        .then(res => res.json())
        .then(data => {
            movieInfo.innerHTML = ""           
            
            if(data.Search){                
                data.Search.map((movie)=>{
                    
                    fetch(`https://www.omdbapi.com/?apikey=8cb9361a&i=${movie.imdbID}`)
                        .then(res => res.json())
                        .then(data =>{ 
                            if(data.Poster!=="N/A") {                                                   displayMovieList(movieInfo, data)                            
                            } // if there is Poster image, display it
                        })                        
                })
        } else{
            movieInfo.innerHTML = `<p class="not-found">Unable to find what you’re looking for. 
                                    Please try another search.</p>`
        }
})})

function displayMovieList(domEl, data){
        domEl.innerHTML += `                                
        <div class="movie-detail">                                
            <div class="poster">
                <img src="${data.Poster}" alt="Movie Poster" class="movie-poster"/>
            </div> 
            <div class="movie-information">
                <div class="title-rating">
                    <p class="title">${data.Title}</p>                   
                    <p class="rating">
                    ⭐${data.imdbRating!=="N/A"?data.imdbRating:""}
                    </p>
                </div>                    
                <div class="time-genre">
                    <p class="time">
                        ${data.Runtime!=="N/A"?data.Runtime:""}</p>
                    <p class="genre">
                        ${data.Genre!=="N/A"?data.Genre:""}</p>                   
                    <img src="images/plussign.png" class="add-movie" 
                    id="${data.imdbID}" onclick="handleClick(this.id)" />
                    <p class="add-watchlist">Watchlist</p>
                </div>
                <div class="plot">
                    <p>${data.Plot!=="N/A"?data.Plot:""}                        
                    </p></p>
                </div>                                        
            </div>                                    
    </div>`
}