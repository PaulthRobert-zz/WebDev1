// script file for responsive2.html
// js.react
// babel > jsx

//typically new react apps have a single app component at the very top

class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={drillDown: 'searchYear'}
        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
        this.handleTeamClick = this.handleTeamClick.bind(this);
        
        //states to move through the levels of drill down
            //searchYear
            //selectTeam
            //selectPlayer
            //viewPlayerStats
    }
    handleSubmitButtonClick(){
        this.setState({drillDown: 'selectTeam'})
    }

    handleTeamClick(){
        alert('You clicked a team');
    }

    render(){
        const drillDown = this.state.drillDown;
        let ribbon;
        let page;

        ribbon=
            <div>
                <Ribbon 
                    id ="btn" 
                    type="button"
                    className="btn btn-primary"
                    caption="Go"
                    onClick={this.handleSubmitButtonClick} 
                />
            </div>

        switch(drillDown){
            case 'searchYear':
                page = 
                <div></div> 

            break;
            case 'selectTeam':
                
                let rawData = getTeams(document.getElementById('RosterYear').value); //send the input year to the getTeams function
               // console.log(rawData);
                console.log(Promise.resolve(rawData));

                //let numbers = [1,2,3,4,5];
                /*const listItems = datas.map((data)=>
                    <li>{data.mlb_org_brief}</li>
                */
                
                    page =
                        <div>
                            <ul>Please Hold</ul>
                        </div>
                    
                    /*    <div> 
                            <TeamTile
                                onClick={this.handleTeamClick} 
                                name = "Fuz Cats"
                                teamName = 'The Fuzzy Caterpillars'
                                venueName = 'Davis Dirt Ranch'
                                league = 'CF'
                            />
                        </div>
                    */
                
            break;
        }

        return(
            <div>
                {ribbon}
                {page}
            </div>
           )
    }

}

class Ribbon extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
                <form className="bg-dark">            
                    <div className="form-row">  
                        <div className="col">
                            <SearchBar
                                label= 'MLB Season'
                                type="year" 
                                className= "form-control"
                                id="RosterYear"
                                placeholder= "Enter a Year" 
                                //defaultValue= "2020" 
                            />                                                                          
                        </div>              
                        <div className="col">
                            <div className = "position-absolute mid-center">
                                <SubmitButton
                                    id ={this.props.id} //"btn" 
                                    type={this.props.type} //"button"
                                    className={this.props.className} //"btn btn-primary"
                                    caption={this.props.caption} //"Go"
                                    onClick={this.props.onClick} //DrillDownControl.handleSubmitButtonClick}    
                                />
                            </div>
                            
                        </div>                
                    </div>
                </form>
        )
    }
}

class TeamTile extends React.Component{
    constructor(props){
        super(props);     
    }
    render() {
        return(
            <div className="card bg-dark" onClick={this.props.onClick}>    
                <div className="card-body bg-light team-card`+i+`">    
                    <div className="row">
                        <div className="col-4">
                            <p className="card-text text-body name">{this.props.name}</p>
                        </div>
                        <div className="col-8">
                            <p className="text-body cust-card-text-right">{this.props.teamName}</p>
                        </div>
                    </div>
                    <div className="row">                                
                        <div className = "col-10">
                            <p className="card-text text-body">{this.props.venueName}</p>
                        </div>
                        <div className = "col-2">
                            <p className="card-text text-body cust-card-text-right">{this.props.league}</p>
                        </div>
                    </div>
            
                </div>
            </div>   
        );
    }
}


function SearchBar(props){
    return(
        <div className="form-group">
            <label>{props.label}</label>
            <input 
                type={props.type} //"year" 
                className= {props.className} //"form-control" 
                id= {props.id} //"RosterYear" 
                placeholder= {props.placeholder} //"Enter a Year" 
                defaultValue= {props.defaultValue}         //"2020" 
            /> 
        </div>
    )
}

function SubmitButton(props){
    return(
        <button 
            id ={props.id} //"btn" 
            type={props.type} //"button"
            className={props.className} //"btn btn-primary"
            onClick={props.onClick}
        > 
            {props.caption} 
        </button>

    )
}

function teamGo(){
    alert("Go!");
}

function getTeams (rosterYear){
//get mlb team data api
    return fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27'+rosterYear+'%27')
    .then(function(response){            
        return response.json();
    })
    .then(function(resp){
        return resp.team_all_season.queryResults.row
    })
}
    /*
    .then(function(resp){          

        //get total array size
        let totalSize = resp.team_all_season.queryResults.totalSize;

        //loop through the array to populate your html
        for(let i=0; i < totalSize; i++){
            //mlb_org_brief
            let Name=resp.team_all_season.queryResults.row[i].mlb_org_brief;                
            //assign team name to var
            let teamName = resp.team_all_season.queryResults.row[i].name_display_full;
            //venue_name:
            let venueName=resp.team_all_season.queryResults.row[i].venue_name;                
            //league
            let league = resp.team_all_season.queryResults.row[i].league;
            //team_id
            let teamId = resp.team_all_season.queryResults.row[i].team_id;
            //generate the innerHTML 
            teamCard(Name, teamName, venueName, league, i);
            //add click event handler to team card
            clickTeam(i, teamId, rosterYear);                             
        }
    })
}
*/

ReactDOM.render(
   <App />,
    document.getElementById('root')
)