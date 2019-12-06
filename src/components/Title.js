import React, { Component } from 'react';

export default function Title({name,title}) {
        return (
            <div className="row">
                <div className= "col-10 mx-auto mx-2 text-center text-title">
                    <h1 className="text-capitalize font-weight">
                        {name}<strong className="text-blue">{title}</strong>  
                    </h1>
                </div>
            </div>
        )
    }