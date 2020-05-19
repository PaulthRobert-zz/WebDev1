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

    handleTeamClick(){
        alert('You clicked a team');
    }

    componentDidMount(){
       
    }

    getTeams(){
        console.log ('you got the teams')
        let rosterYear = document.getElementById('RosterYear').value
                
        fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27'+rosterYear+'%27')
            .then(prom =>prom.json())
            .then(data => {  
               let teamData=data.team_all_season.queryResults.row;
                //console.log(teamData);
                //console.log(teamData.length);       
                //teamCards.push(<TeamCards name='Paul'/>); 

                //data is the array response from MLB
                //loop through data with a map function and built the team cards
                /*teamCards = teamData.map((data)=>{                                                        
                    console.log(data.name_display_full);
                    return <TeamCards name='paul' />;
                 */                               
                this.setState({
                    drillDown: 'selectTeam',
                    data: data.team_all_season.queryResults.row
                });
            })
            .catch(err => console.log('Error: '+err));
    }

    render(){
        const drillDown= this.state.drillDown;
        const data = this.state.data;
        let ribbon;
        let teamCards = [];

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
                teamCards.push(<TeamCards name='Please Hold'/>)

            break;
            case 'selectTeam':
 
            /*               let rosterYear = document.getElementById('RosterYear').value
                
                fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27'+rosterYear+'%27')
                    .then(prom =>prom.json())
                    .then(data => {  
                       let teamData=data.team_all_season.queryResults.row;
                        //console.log(teamData);
                        //console.log(teamData.length);       
                        //teamCards.push(<TeamCards name='Paul'/>); 

                        //data is the array response from MLB
                        //loop through data with a map function and built the team cards
                        teamCards = teamData.map((data)=>{                                                        
                            console.log(data.name_display_full);
                            return <TeamCards name='paul' />;                            
                    });
                        
                    })
                    .catch(err => console.log('Error: '+err));

 */
                /*
                    // learning lists w/ map in react
                    const numbers = [1,2,3,4,5]
                    const doubled = numbers.map((number)=>number*2);
                    console.log('doubled: '+doubled)
                    
                    //BE CAREFUL USING CURLY BRACES ON THE ARROW FUNCTION *** IF YOU DO YOU MUST RETURN!
                    listitems = doubled.map((number) =>{
                       return <li>{number}</li>
                })
                */
                   teamCards = data.map((teamData)=>{
                       const{name_display_full} = teamData;
                        
                       return(
                           <TeamCards 
                                name={name_display_full}
                                />
                       )

                   }) 
                   //teamCards=<h4>CATS</h4>
            break;
        }

        //console.log(teamCards);

        return(
            <div>
                {ribbon}
                {teamCards}                
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

ReactDOM.render(
   <App />,
    document.getElementById('root')
)