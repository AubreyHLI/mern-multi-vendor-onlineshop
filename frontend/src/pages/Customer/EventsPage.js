import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const EventsPage = () => {
    const { setActive } = useOutletContext();

	useEffect(() => {
        setActive(4);
		window.scrollTo(0,0);
	}, [])

    return (
        <div>EventsPage</div>
    )
}

export default EventsPage