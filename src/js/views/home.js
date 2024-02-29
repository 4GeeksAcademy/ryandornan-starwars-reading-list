import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import EntityCard from "./entitycard.js";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [isLoading, setIsLoading] = useState(false);

	const handleInitialData = async () => {
		await actions.getPeople();
		await actions.getPlanets();
		await actions.getStarships();
	}

	const handleFetchDetails = async () => {
		actions.getPeopleDetails();
		actions.getPlanetsDetails();
		actions.getStarshipsDetails();
	}

	const handleAsyncCalls = async () => {
		setIsLoading(true);
		await handleInitialData();
		await handleFetchDetails();
		setIsLoading(false);
	}

	useEffect(() => {
		if (!(store.people.length && store.planets.length && store.starships.length)) {
		  handleAsyncCalls();
		}
	  }, []);

	console.log(store);

	return isLoading ? (
		
		<p className="text-center mt-navbar">Loading data from the API, please wait...</p>
	) : (
		<div className="container-full text-center mt-navbar home-body">
			<h1 className="display-5 mb-4">Return Of The API...</h1>

			<div className="m-3 p-3">
				<h2 className="section-header mb-3">Characters:</h2>
				<div className="d-flex overflow-auto ">
					{store.people.map((person) => (
						<EntityCard
							key={person.uid}
							uid={person.uid}
							name={person.name}
							linkPath="people"
							buttonText="Character Info"
						/>
					))}
				</div>
			</div>

			<div className="m-3 p-3">
				<h2 className="section-header mb-3">Planets:</h2>
				<div className="d-flex overflow-auto">
					{store.planets.map((planet) => (
						<EntityCard
							key={planet.uid}
							uid={planet.uid}
							name={planet.name}
							linkPath="planets"
							buttonText="Planet Info"
						/>
					))}
				</div>
			</div>

			<div className="m-3 p-3">
				<h2 className="section-header mb-3">Starships:</h2>
				<div className="d-flex overflow-auto">
					{store.starships.map((starship) => (
						<EntityCard
							key={starship.uid}
							uid={starship.uid}
							name={starship.name}
							linkPath="starships"
							buttonText="Starship Info"
						/>
					))}
				</div>
			</div>
		</div>
	);
};