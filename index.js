
let data = JSON.parse(localStorage.getItem("watchlistItem")) || [];
let searchValue=""
let movieTitle=[]
const search = document.getElementById("search")
const searchResult = document.getElementById("search-result")
const wishlistBtn= document.getElementById("wishlist-btn")
const AddedToWishList= document.getElementById("Added-to-wishlist")


document.getElementById("input-search").addEventListener("submit", function(e){
    
    searchResult.innerHTML=``
    e.preventDefault()
    searchValue= search.value
    search.value=""
    
    loadingIndicator.style.display = "block";
    
    fetch(`https://www.omdbapi.com/?S=${searchValue}&apikey=476c59d1`)
.then(Response=> Response.json())
.then(data=>{ 
       
    movieTitle=[]
  if(data.Response==="True"){
      
      searchResult.classList.remove("explore")
        data.Search.forEach(movie=>{
          
        movieTitle.push(movie.Title)
        })}
        else{
            searchResult.classList.add("explore")
            searchResult.innerHTML=`Unable to find what you’re looking<br/> for. Please try another search.`
        }
  
            return Promise.all(display())
        })
        .then(movieDataArray => {
          
            movieDataArray.forEach(title=>{
              
                let html=""
                html+=`  
                            <div class="render">
                            <img src="${title.Poster}" class="movie-img"/>
                           
                            <div class="movie-txt">
                             
                                <div class="header-1">
                                    <h3>${title.Title}</h3>
                                    <img src="./Icon.png"/>
                                   
                                    <p id="rating">${title.imdbRating}</p>
                                </div>
                                <div class="header-2">
                                    <p id="runtime">${title.Runtime}</p>
                                    <p>${title.Genre}</P>
                                    <button id="wishlist-btn" data-btn="${title.imdbID}">+</button>
                                <label class="labelEl" for="wishlist-btn">Watchlist</label>
                                </div>
                                <p>${title.Plot}</p>
                        
                                </div>
                            </div>
                    </div>
    `
    searchResult.innerHTML+=html
            })
        })
        .catch(error => {
            console.error("Error:", error)
        })
     .finally(() => {
      loadingIndicator.style.display = "none";
    });
})

function display() {
   
    const fetchPromises = movieTitle.map(title => {
        return fetch(`https://www.omdbapi.com/?t=${title}&apikey=476c59d1`)
            .then(response => response.json());
    });

    
    return fetchPromises;
}
    

  
   
   
   document.addEventListener("click", function(e){
       if(e.target.dataset.btn){
           data.unshift(e.target.dataset.btn)
           localStorage.setItem("watchlistItem", JSON.stringify(data))      
           AddedToWishList.style.display = "block";
           setInterval(()=>{
              AddedToWishList.style.display = "none" 
           },5000)
       }
   })
   
  

