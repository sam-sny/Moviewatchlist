const data = JSON.parse(localStorage.getItem("watchlistItem"))


function render(){
if (data.length ===0){
    document.getElementById("search-result").innerHTML=`<h1 id="watchlist-blank">Your watchlist is looking a little empty...</h1>`

}
else{
    
    data.forEach(fave=>{
  fetch(`https://www.omdbapi.com/?I=${fave}&apikey=476c59d1`)
  .then(Response=>Response.json())
  .then(data=>{
        let html=""
                html+=`<div class="render">
                            <img src="${data.Poster}" class="movie-img"/>
                            <div class="movie-txt">
                                <div class="header-1">
                                    <h3>${data.Title}</h3>
                                    <img src="./Icon.png"/>
                                    <p id="rating">${data.imdbRating}</p>
                                </div>
                                <div class="header-2">
                                    <p id="runtime">${data.Runtime}</p>
                                    <p>${data.Genre}</P>
                                    <button id="wishlist-btn" data-btn="${data.imdbID}">-</button>
                                <label class="labelEl" for="wishlist-btn">Remove</label>
                                </div>
                                <p>${data.Plot}</p>
                        
                                </div>
                            </div>
                    </div>
    `
     document.getElementById("search-result").classList.remove("explore")
      document.getElementById("search-result").innerHTML+=html
  })
})
}
}
document.addEventListener("click", function(e){
      
       if(e.target.dataset.btn){
          document.getElementById("search-result").innerHTML=""
          document.getElementById("search-result").classList.add("explore")
           let wishlistID=e.target.dataset.btn
           let indexToDelete = data.indexOf(e.target.dataset.btn);
           data.splice(indexToDelete, 1)
            localStorage.setItem("watchlistItem", JSON.stringify(data))
         
           render()
       }
   })
render()