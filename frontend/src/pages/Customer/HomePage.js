import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import Banner from '../../components/Home/Banner';
import Categories from '../../components/Home/Categories';
import BestDeals from '../../components/Home/BestDeals';


const HomePage = () => {
    const { setActive } = useOutletContext();

    useEffect(() => {
        window.scrollTo(0,0);
        setActive(1);
	}, [])

    return (
        <div className=''>
            <Banner />
            <Categories />
            <BestDeals />
        </div>
    )
}

export default HomePage