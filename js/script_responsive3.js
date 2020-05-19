// script file for responsive2.html
// js.react
// babel > jsx

//typically new react apps have a single app component at the very top

class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            drillDown: 'searchYear',
            data: []}
        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
        this.handleTeamClick = this.handleTeamClick.bind(this);
        
        //states to move through the levels of drill down
            //searchYear
            //selectTeam
            //selectPlayer
            //viewPlayerStats
    }
    handleSubmitButtonClick(){
        this.getTeams();
    }

    handleTeamClick(teamID){
        //alert('You clicked on the '+team);
        this.getPlayers(teamID)
    }

    getTeams(){
        let rosterYear = document.getElementById('RosterYear').value                
        fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27'+rosterYear+'%27')
            .then(prom =>prom.json())
            .then(data => {  
                this.setState({
                    drillDown: 'selectTeam',
                    data: data.team_all_season.queryResults.row
                });
            })
            .catch(err => console.log('Error: '+err));
    }

    getPlayers(teamID){
        console.log('team: '+teamID);
        
        fetch('http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=%272016%27&end_season=%272017%27&team_id=%27'+teamID+'%27')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    drillDown: 'selectPlayer',
                    data: data.roster_team_alltime.queryResults.row
                })

            })
            .catch(err => console.log('Error: '+err));
    }

    render(){
        const drillDown= this.state.drillDown;
        const data = this.state.data;
        let ribbon;
        let dataDisplay = [];

        //ribbon here is a React Component
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
            //TODO here you need to reference teamCard as a component
            case 'searchYear':
                //TODO depricate this later
                dataDisplay.push(<TeamCards name='Please Hold'/>)

            break;
            case 'selectTeam':
                dataDisplay = data.map((teamData)=>{
                    //add other parameters from the JSON here!
                    const{
                            name_display_full,
                            mlb_org_brief,
                            venue_name,
                            division_abbrev,
                            mlb_org_id
                        } = teamData;
                    
                    return(
                        //and then here!
                        <TeamCards 
                            name={mlb_org_brief}
                            teamName={name_display_full}
                            venueName={venue_name}
                            league={division_abbrev}
                            onClick={() => this.handleTeamClick(mlb_org_id)}
                            />
                    )
                })
            break;
            case 'selectPlayer':
                dataDisplay = data.map((playerData)=>{
                    const{
                        name_first_last,
                        throws,
                        bats,
                        height_feet,
                        height_inches,
                        player_id,
                        position_desig,
                        primary_position,
                        birth_date,
                        jersey_number
                    }=playerData;

                    return(
                        <PlayerCards
                            playerName={name_first_last}
                            posDes={position_desig}
                            primPos={primary_position}
                            bats={bats}
                            throws={throws}
                            jerseyNumber={jersey_number}
                        />
                    )
                })
        }

        return(
            <div>
                {ribbon}
                {dataDisplay}                
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
                                defaultValue= "2020" 
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

class TeamCards extends React.Component{
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
                        <div className = "col-9">
                            <p className="card-text text-body">{this.props.venueName}</p>
                        </div>
                        <div className = "col-3">
                            <p className="card-text text-body cust-card-text-right">{this.props.league}</p>
                        </div>
                    </div>
            
                </div>
            </div>   
        );
    }
}

class PlayerCards extends React.Component{
    constructor(props){
        super(props);     
    }
    render() {
        return(
            <div className="card bg-dark" onClick={this.props.onClick}>    
                <div className="card-body bg-light team-card`+i+`">    
                    <div className="row">
                        <div className="col-10">
                            <p className="card-text text-body name">{this.props.playerName}</p>
                        </div>
                        <div className="col-2">
                            <p className="text-body">#{this.props.jerseyNumber}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10">
                            <p className="card-text text-body name">{this.props.posDes.toLowerCase()}</p>
                        </div>
                        <div className="col-2">
                            <p className="text-body">{this.props.primPos}</p>
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

ReactDOM.render(
   <App />,
    document.getElementById('root')
)