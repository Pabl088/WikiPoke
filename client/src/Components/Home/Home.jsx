import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../Card/Card.jsx';
import {NavBar} from '../NavBar/NavBar.jsx';
import Pages from '../Pages/Pages.jsx';
import {orderPokemons, getTypes, getCreates, getAPI, getAllPokemons, updatePage} from '../../Redux/actions.js';
import s from './Home.module.css';
import pokebola from './Images/pokebola.gif';


export default function Home() {

    const currentPage = useSelector(state => state.currentPage);

    const [page, setPage] = useState(currentPage);

    const [forEachPage] = useState(12);

    const dispatch = useDispatch();

    const pokemons = useSelector(state => state.allCurrentPokemons);
    const types = useSelector(state => state.types);

    let max = pokemons.length > 1 ? Math.ceil(pokemons.length / forEachPage) : 1;

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    useEffect(() => {
        setPage(currentPage);
    }, [pokemons, currentPage]);

    const handleOrders = (e) => {
        dispatch(updatePage(1));
        dispatch(orderPokemons(e.target.value), null);
        e.target.value === 'AZ' || e.target.value === 'ZA' ? document.getElementById('orderAttack').selectedIndex = 0
            : document.getElementById('orderName').selectedIndex = 0;
    };

    const handleTypes = (e) => {
        dispatch(updatePage(1));
        dispatch(orderPokemons("filter", e.target.value));
    };

    const handleClickAPI = () => {
        dispatch(updatePage(1));
        dispatch(getAPI());
        resetSelects();
    };

    const handleClickDB = () => {
        dispatch(updatePage(1));
        dispatch(getCreates());
        resetSelects();
    };

    const resetSelects = () => {
        document.getElementById('orderName').selectedIndex = 0;
        document.getElementById('orderAttack').selectedIndex = 0;
        document.getElementById('filter').selectedIndex = 0;
    };

    return (
        <div className={s.Main}>
            <NavBar resetSelects={resetSelects}></NavBar>
            <div>
                {
                    pokemons.length ? <div className={s.ContainerButtons}>
                            <select id="orderName" onChange={handleOrders} className={s.buttons}>
                                <option value='' selected disabled hidden>ORDENAR POR NOMBRE</option>
                                <option value='AZ' className={s.select}>A-Z</option>
                                <option value='ZA' className={s.select}>Z-A</option>
                            </select>
                            <select id="orderAttack" onChange={handleOrders} className={s.buttons}>
                                <option value='' selected disabled hidden>ORDENAR POR ATAQUE</option>
                                <option value="MIN_MAX" className={s.select}>MENOR ATAQUE</option>
                                <option value="MAX_MIN" className={s.select}>MAYOR ATAQUE</option>
                            </select>
                            <select id="filter" name="filter" onChange={handleTypes} className={s.buttons}>
                                <option value='' selected disabled hidden>ORDENAR POR TIPO</option>
                                <option value={'TODOS'} className={s.select}>TODOS</option>
                                {
                                    types && types.length && types.map((t, i) => <option key={i} value={`${t.nombre}`}
                                                                                         className={s.select}>{`${t.nombre.toUpperCase()}`}</option>)
                                }
                            </select>
                            <button onClick={handleClickDB} className={s.buttons}>SOLO CREADOS</button>
                            <button onClick={handleClickAPI} className={s.buttons}>SOLO ORIGINALES</button>
                        </div>
                        : null
                }
                <div className={s.pages}>
                    {pokemons.length ? <Pages page={page} setPage={setPage} max={max}></Pages> : null}
                </div>
            </div>
            <div className={s.containerCard}>
                {
                    pokemons.length ?
                        <> {pokemons.slice((page - 1) * forEachPage, (page - 1) * forEachPage + forEachPage)
                            .map(p => <Card key={parseInt((Math.random * 1000))} {...p} />)}
                        </>
                        : !pokemons.nombre ?
                            <div className={s.contNoPokemons}>
                                <img className={s.NoPokemons} alt="nopokemons" src={pokebola}/>
                                <p className={s.text}>NINGUN POKEMON COINCIDE CON LOS FILTROS ESPICIFICADOS</p>
                            </div>
                            : null
                }
            </div>
        </div>
    );
};
