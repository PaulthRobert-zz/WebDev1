// script file for responsive2.html
// js.react
// babel > jsx

//const root = document.getElementById('root');

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
            ,cats: 'George'
            ,count: 0
        };
        
    }

    componentDidMount(){
        this.timerID = setInterval(
            ()=> this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick() {
    this.setState({
        date: new Date()
        ,cats: 'Orange'
        ,count: this.state.count+1
    });
    }

    render() {
        return(
            <div>
                <h1>Hello, Paul</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <p>Your cat's name is {this.state.cats}!</p>
                <p>The count = {this.state.count}</p>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

