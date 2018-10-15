import React from 'react';
import Button from '../../Button/Button';
require('./Gamebottom.styl')

export default function Gamebotton({ name,callback,disable,color}){
    return (
    <div className="Gamebutton">
        <button type="button" className={`_button button${color}${disable?'button_dis':''}`} disabled={disable} onClick={()=>{callback()}}>
            <span>{`${name}`}</span>
        </button>
    </div>
    )
}