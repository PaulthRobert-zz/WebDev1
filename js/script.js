// file for scripting fun times

//when you click the button the text in div 1 changes
var btn1 = document.getElementById("btn").addEventListener("click",getTeams);

function changeText(){
    
    alert("You clicked me!");
}



function getTeams (){
//set the html contents of index.html dynamically
    var data = document.getElementById("data");
    //data.innerHTML="Trains";

    return fetch('http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%272017%27')
        .then(function(response){            
            return response.json();
        })

        .then(function(resp){
            console.log(resp.team_all_season.queryResults.row[0].name_display_full);

            //get total array size
            let totalSize = resp.team_all_season.queryResults.totalSize;

            //loop through the array to populate your html
            for(let i=0; i < totalSize; i++){
                
                //assign team name to var
                let teamName = resp.team_all_season.queryResults.row[i].name_display_full;
                
                //generate the innerHTML
                data.innerHTML += '<div class="col" id="data">'+teamName+'</div>';
            }
            
            //return response.data

        })

    }
