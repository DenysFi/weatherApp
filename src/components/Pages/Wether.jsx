import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const WetherByVidget = () => {
    console.log('welcome');
    const { lon, lan } = useParams();
    const navigate = useNavigate();

    const onBackClickBtn = () => {
        navigate('/')
    }
    return (
        <>
            <button onClick={onBackClickBtn}>Вернуться</button>
            <div>
                {lon + '&&' + lan}
            </div>
        </>
    );
};

export default WetherByVidget;