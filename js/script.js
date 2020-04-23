// file for scripting fun times

//when you click the button the text in div 1 changes
var btn1 = document.getElementById("btn").addEventListener("click",changeText);

function changeText(){
    //set the html contents of index.html dynamically
    var data = document.getElementById("data");
    data.innerHTML="Trains";
    alert("You clicked me!");
}


/*
function getTeams(){

    fetch('http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%272017%27')
    .then(response => response.json())
    .then(json => console.log(json))
    .then(
            document.getElementById("data").innerHTML = "Paragraph Changed!");
    }
*/


function renderList(data){
    var list = "";  
    $.each(data,function(index){

    })
}