import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, cleanDetails } from '../../Redux/actions.js';
import s from './CardDetail.module.css';
import image from './Images/desconocido.gif';

export default function CardDetail(props) {

    const id = props.match.params.id;

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getById(id));
        return () => {
            dispatch(cleanDetails());
        };
    }, [dispatch, id]);

    const handleBack = () => {
        history.goBack();
    };

    const pokemon = useSelector(state => state.currentPokemon);

    return (
        <div className={s.background}>
            {pokemon.nombre ?
                <div className={s.container}>
                    <div className={s.header}>
                        <h1 className={s.title}>{pokemon.nombre}</h1>
                        <button onClick={handleBack} className={s.BackButton}>X</button>
                    </div>
                    <div className={s.Main}>
                        <div className={s.imageContainer}>
                            <img className={s.image} src={!pokemon.img ? image : pokemon.img} alt="Pokemons" />
                        </div>
                        <div className={s.info}>
                            <span className={s.titleType}>TIPOS:</span>
                            <div className={s.Types}>
                                {pokemon.Tipos.map((t, i) => <span className={s.type} key={i}>{t.nombre} </span>)}
                            </div>
                            <div className={s.Stats}>
                                <div className={s.Stats1}>
                                    <span>VIDA: {pokemon.vida}</span><span>VELOCIDAD: {pokemon.velocidad}</span>
                                </div>
                                <div className={s.Stats2}>
                                    <span>ATAQUE: {pokemon.ataque}</span><span>DEFENSA: {pokemon.defensa}</span>
                                </div>
                                <div className={s.Stats3}>
                                    <span>ALTURA: {pokemon.altura}</span><span>PESO: {pokemon.peso}</span>
                                </div>
                            </div>
                            <span className={s.id}>ID: {pokemon.ID}</span>
                        </div>
                    </div>
                </div> : <div className={s.error}><span>No existe un pokemon con la id seleccionada</span></div>}
        </div>
    );
};