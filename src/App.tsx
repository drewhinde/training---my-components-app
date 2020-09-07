import React from 'react';
import logo from './logo.svg';
import './App.css';
import Confirm from './Confirm';

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}

class App extends React.Component<{}, IState> { // {} used because no props exist for this component, 2nd generic param is for state type

  constructor(props: {}) {
    super(props);
    this.state = { // only set state directly in the constructor.  elsewhere use setState
      confirmOpen: false,
      confirmMessage: "Please hit the reopen dialog box button",
      confirmVisible: true,
      countDown: 10
    };
  }

  private timer: number = 0;

  public componentDidMount() {
    console.log("COMPONENTDIDMOUNT::component mounting");
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
  }

  public componentWillUnmount() {
    console.log("COMPONENTWILLUNMOUNT::component unmounting");
    clearInterval(this.timer);
  }

  private handleTimerTick = () => {
    console.log("handleTimerTick::We Still Have Time");
    this.setState({ confirmMessage: `Please hit the Reopen Dialog Box Button ${this.state.countDown} secs to go`, 
      countDown: this.state.countDown - 1 },
      () => {
        if(this.state.countDown <= 0) {
          console.log("handlerTimerTick::Time Ran Out");
          clearInterval(this.timer);
          this.setState({ confirmMessage: "Too Late", confirmVisible: false });
        }
      })
  }

  private handleCancelConfirmClick = () => {
      console.log("Cancel Clicked");
      this.setState({ confirmOpen: false });
    };

  private handleOkConfirmClick = () => {
    console.log("OK Clicked");
    this.setState({ confirmMessage: "Cool, carry on reading", confirmOpen: false });
    clearInterval(this.timer);
  };

  private handleReopenClick = () => {
    console.log("ReOpen Clicked");
    this.setState({ confirmMessage: "Take a break, I'm sure you will later...", confirmOpen: true });
    clearInterval(this.timer);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.tsx</code> and save to reload.</p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> Learn React and TypeScript</a>
        </header>

        <p className="confirm-message">{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (<button onClick={this.handleReopenClick}>Reopen Dialog Box</button>)}
       
        <Confirm
          open={this.state.confirmOpen}
          title="React and TypeScript"
          content="Are you sure you want to learn React and Typescript?"
          cancelCaption="Cancelarooney"
          onOkClick={this.handleOkConfirmClick}
          onCancelClick={this.handleCancelConfirmClick}
        />
      </div>
    );
  };
}

export default App;
