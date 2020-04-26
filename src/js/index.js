
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import "../css/bootstrap.scss";
import "bootstrap";
import "@myStyle";
import MySearch from "./MySearch.js";
import CardGeneration from "./CardGeneration.js";


$(document).ready(function() {
   
    const loadFilms = (page) =>{
        let slaider = document.createElement('div');
        slaider.classList = "owl-carousel owl-theme";
        slaider.id = 'imageCard';
        $(".slaider").append(slaider);  
        const obj = new MySearch($('#titleFilm').val(), $('#selectMovie').val(), page);

        setTimeout(() => {
            let search = obj.films;

            for(let i = 0; i < search.length; i++) {
                let card = new CardGeneration(search[i].Title, search[i].Year, search[i].Poster);
                $("#imageCard").append(card.movie);  
            }  

            let owl = sliderOn();
            let stageIndex = 6;
            let page = 2;
            owl.on('change.owl.carousel', event => {
               
                if (event.item.index == stageIndex) {
                    let newPage = new MySearch($('#titleFilm').val(), $('#selectMovie').val(), page);
                    setTimeout(() => {
                        let search = newPage.films;

                        for(let i = 0; i < search.length; i++) {
                            let card = new CardGeneration(search[i].Title, search[i].Year, search[i].Poster);            
                            owl.trigger("add.owl.carousel", card.movie).trigger("refresh.owl.carousel");
                        }  
                        stageIndex += 6;
                        ++page;
                    }, 1000);
                    // $(slaider).remove();
                    // loadFilms(++page);                    
                }
            });

        },1000);
    };
   
    $('button').on("click",(e)=>{
        e.preventDefault();

        $("#imageCard").remove();
        loadFilms(1);

              
        
    });

    const sliderOn =()=> {
       return $('#imageCard').owlCarousel({
            loop:false,
            margin:10,
            nav:false,
            responsive:{
                0:{
                    items:3
                },
                600:{
                    items:3
                },
                1000:{
                    items:3
                }
            }
        });      
    }
  


    

});











