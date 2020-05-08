// script file for responsive2.html
// js.react
// babel > jsx

//typically new react apps have a single app component at the very top
/*
class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Ribbon />
        )

    }
}
*/

class DrillDownControl extends React.Component{
    constructor(props){
        super(props);
        this.state ={drillDown: 'searchYear'}
        this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
        
        //states to move through the levels of drill down
            //searchYear
            //selectTeam
            //selectPlayer
            //viewPlayerStats
    }
    handleSubmitButtonClick(){
        this.setState({drillDown: 'selectTeam'})
    }

    render(){
        const drillDown = this.state.drillDown;
        let page;
        switch(drillDown){
            case 'searchYear':
                page = 
                    <div>
                        <Ribbon 
                            id ="btn" 
                            type="button"
                            className="btn btn-primary"
                            caption="Go"
                            onClick={this.handleSubmitButtonClick} 
                        />
                    </div>
            break;
            case 'selectTeam':
                page =
                    <div> 
                        <Ribbon 
                            id ="btn" 
                            type="button"
                            className="btn btn-primary"
                            caption="Go"
                            onClick={this.handleSubmitButtonClick} 
                        />
                        <TeamTile 
                            name = 'Fuz Cats'
                            teamName = 'The Fuzzy Caterpillars'
                            venueName = 'Davis Dirt Ranch'
                            league = 'CF'
                        />
                    </div>
            break;
        }

        return(
            <div>
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
    componentDidMount(){       
    }
    componentWillUnmount(){      
    }
    render() {
        return(
            <div className="card bg-dark">    
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
            <label>Roster Year</label>
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
   //<App />,
   <DrillDownControl />,
    document.getElementById('root')
)




