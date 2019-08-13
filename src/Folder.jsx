import React from "react";
import { File } from "./File.jsx";

export class Folder extends React.Component {
    getCurrentPath(){
        const {parent, name} = this.props;

        return (name === '/' || parent === '/')
            ? name
            : `${parent}/${name}`;
    }

    handleToggle(e) {
        e.stopPropagation();
        this.props.handleToggle(this.getCurrentPath());
    }

    render() {
        const { name, children, isOpened } = this.props;

        return (
            <div style={{fontFamily: "monospace"}} data-path={this.getCurrentPath()}>
                <span onClick={(e) => this.handleToggle(e)} style={{cursor: "pointer"}}>
                    ({isOpened ? "-" : "+"}) {name}
                </span>

                {isOpened && children && (
                    <div style={{paddingLeft: 20}}>
                        {Object.values(children).map(({ name, mimeType, children, isOpened }) => (
                            children
                                ? (
                                    <Folder
                                        key={name} name={name} children={children} parent={this.getCurrentPath()}
                                        handleToggle={this.props.handleToggle}
                                        isOpened={isOpened}
                                    />
                                ) : (
                                    <File key={name} name={name} mimeType={mimeType} />
                                )
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

Folder.defaultProps = {
    parent: ""
};