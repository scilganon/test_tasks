import React from "react";
import {Folder} from "./Folder.jsx";
import set from "lodash/set";
import get from "lodash/get";

function findMatch(children, filter, onChildrenMatch){
    return children.filter && children.filter((node) => {
        const hasFilterMatch = filter(node);
        const foundChildren = node.children && findMatch(node.children, filter, onChildrenMatch);
        const hasChildrenMatch = foundChildren && foundChildren.length > 0;

        if(hasChildrenMatch){
            onChildrenMatch(node);
            node.children = foundChildren;
        }

        return (hasFilterMatch || hasChildrenMatch);
    })
}

function transformStructureToState(structure){
    if(!structure){
        return undefined;
    }

    return structure.reduce((store, current) => ({
        ...store,
        [current.name]: {
            ...current,
            children: transformStructureToState(current.children)
        },
    }), {});
}

export class MyBrowser extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            folders: {}
        };
    }

    componentDidMount() {
        this.setState({
            folders: transformStructureToState(this.props.structure),
        }, () => {
            this.props.expandedFolders.map((path) => this.handleExpandTree(path));
        });
    }

    handleExpandTree(input){
        let path = "";
        for(let part of input.split('/')) {
            path += !path ? part : '/' + part;
            this.handleExpandFolder(path);
        }
    }

    handleExpandFolder(path){
        const formattedPath = path.split("/").join(".children.") + ".isOpened";
        const isOpened = get(this.state.folders, formattedPath, false);
        set(this.state.folders, formattedPath, !isOpened);
        this.setState(this.state);
    }

    handleFilter(fileName){
        let filtered = findMatch(
            this.props.structure,
            ({ children, name }) => !children && name.indexOf(fileName) >= 0,
            (node) => node.isOpened = true
        );
        this.setState({
            folders: transformStructureToState(filtered)
        });
    }

    render(){
        return (
            <React.Fragment>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.handleFilter(e.target.elements[0].value);
                }}>
                    Search: <input type="search" />
                </form>
                <Folder name="/" children={Object.values(this.state.folders)} handleToggle={(path) => this.handleExpandFolder(path)} isOpened />
            </React.Fragment>
        );
    }
}

MyBrowser.defaultProps = {
    expandedFolders: [],
};