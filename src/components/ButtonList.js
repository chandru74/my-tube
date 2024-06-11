import React from 'react';
import Button from './Button';

const ButtonList = () => {
    const list = ["All", "Cricket", "Election 2024", "Football", "Movies", "Music"];
    return (
        <div className='flex'>
           {list?.map(item => <Button key={item} name={item}/>)}
           
        </div>
    );
}

export default ButtonList;
