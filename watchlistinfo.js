const watchListInfo = document.getElementById('watchlist-info')
let watchList = localStorage.getItem('watchList')?JSON.parse(localStorage.getItem('watchList')):[]

function handleClick(id){   
    watchList = JSON.parse(localStorage.getItem('watchList')) 
             
    for(let i = 0; i < watchList.length; i++){
        if(watchList[i].imdbID === id){
            watchList.splice(i, 1)
        }
    }     
    localStorage.setItem('watchList', JSON.stringify(watchList)) 
    watchListInfo.innerHTML = "" 
    displayWatchListPage()                      
}
    
if(window.location.href.indexOf('watchlist.html') > -1){
    displayWatchListPage()    
}

function displayWatchListPage(){
    if(watchList.length > 0){        
        watchList.map((movie)=>{            
            displayMovieList(watchListInfo, movie)
        })
    }else{
        //if watchList is empty
        watchListInfo.innerHTML = `
        <div>
            <p class="empty-list">Your watchlist is looking a little empty...</p>
            <div class="add-to-list-container">
                <a href="index.html">
                    <img src="images/plussign.png" class="add-movie add-to-list-btn" 
                    onclick="handleClick(this.id)" />
                </a>
                <a class="add-to-list" href="index.html">Let’s add some movies!</a>
            </div>
        </div>
        `
    }
}       


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
                    <img src="images/minussign.png" class="remove-movie" 
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

