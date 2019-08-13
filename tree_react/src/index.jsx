import React from "react";
import ReactDOM from "react-dom";
import { MyBrowser } from "./MyBrowser.jsx";

const structure = [
    {
        name: "PathA",
        children: [
            {
                name: "wierd_file.txt",
                mimeType: "applicatin/json"
            },
            {
                name: "PathB",
                children: [
                    {
                        name: "demo.php",
                        mimeType: "applicatin/json"
                    },
                ]
            }
        ]
    },
    {
        name: "PathC",
        children: [
            {
                name: "PathD",
                children: [
                    {
                        name: "PathC",
                        children: [
                            {
                                name: "PathD",
                                children: [
                                    {
                                        name: "FileA",
                                        mimeType: "applicatin/json"
                                    },
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    },
    {
        name: "hello_world.js",
        mimeType: "application/javascript",
    }
];

const el = document.createElement('div');
ReactDOM.render( <MyBrowser structure={structure} expandedFolders={[
    "PathC/PathD/PathC",
    "PathA",
]}/> ,el);
document.body.appendChild(el);