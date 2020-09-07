import * as React from 'react';
import './Confirm.css'; 

//TypeScript type for Props
interface IProps {
    open: boolean; // for state of overlay / popup
    title: string;
    content: string;
    cancelCaption?: string; //optional
    okCaption?: string; //optional
    onOkClick: () => void; // function prop passed down from parent component
    onCancelClick: () => void; //function prop passed down from parent component
}

class Confirm extends React.Component<IProps> { //reference typescript type
    public static defaultProps = {
        cancelCaption: "Cancel",
        okCaption: "Okay",
    }

    private handleOkClick = () => {
        this.props.onOkClick();
    }

    private handleCancelClick = () => {
        this.props.onCancelClick();
    }

    public render() {
        return (
            <div className={
                this.props.open ? "confirm-wrapper confirm-visible" : "confirm-wrapper"}
                >
                <div className="confirm-container">
                    <div className="confirm-title-container">
                        <span>{this.props.title}</span>
                    </div>
                    <div className="confirm-content-container">
                        <p>{this.props.content}</p>
                    </div>
                    <div className="confirm-buttons-container">
                        <button className="confirm-cancel" onClick={this.handleCancelClick}>{this.props.cancelCaption}</button>
                        <button className="confirm-ok" onClick={this.handleOkClick}>{this.props.okCaption}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Confirm;