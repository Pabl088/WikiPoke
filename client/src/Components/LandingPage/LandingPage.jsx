import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import s from './LandingPage.module.css';
import { getPokemons, getTypes, getAllPokemons } from '../../Redux/actions.js';


function Landing() {

    const pokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getPokemons());
        dispatch(getTypes());
        dispatch(getAllPokemons());
    }, [pokemons,dispatch]);


    return (
        <div className={s.Main}>
            {
                pokemons.length && types.length ? <Link to="/home"><div className={s.button}></div></Link> :
                    <div className={s.loading}></div>
            }
        </div>
    );
};

export default Landing;