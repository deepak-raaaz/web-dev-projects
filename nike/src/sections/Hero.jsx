import React, { useCallback } from 'react'
import Button from '../components/Button';
import { arrowRight } from '../assets/icons';
import { shoes, statistics } from '../constants';
import { bigShoe1 } from '../assets/images';
import ShoeCard from '../components/ShoeCard';
import { useState } from 'react';

const Hero = () => {
        const [bigShoeImage, setbigShoeImage] = useState(bigShoe1)

    return (
        <section
            id="home"
            className='w-full flex xl:flex-row flex-col justify-center min-h-screen
             gap-10 max-container'
        >
            {/* Left or the Brandig Section of The Page */}
            <div className='relative xl:w-2/5
                            flex flex-col justify-center
                            items-start w-full max-xl:padding-x pt-28'>
                <p className='text-coral-red text-xl font-montserrat'
                >
                    Our Summer Collection</p>
                <h1 className='mt-10 font-palanquin
                  text-8xl max-sm:-[72px] max-sm:leading-[82px] font-bold'>
                    <span className='xl:bg-white xl:whitespace-nowrap relative z-10 pr-10'>The New Arrival </span>
                    <br />
                    <span className='text-coral-red mt-3 inline-block'>Nike</span> Shoes
                </h1>
                <p className='font-montserrat
                 text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm'>
                    Discover Stylish arrivals, quality <br />
                    comfort, and innovation for your Active Life</p>

                <Button label="Shop now"
                    iconURL={arrowRight} />

                <div className='flex justify-start items-start flex-wrap w-full mt-20 gap-16'>
                    {statistics.map((stat) =>

                    (<div key={stat.label}>
                        <p
                            className='text-4xl font-palanquin
                            font-bold'
                        >{stat.value}</p>
                        <p
                            className='leading-7
                            font-montserrat text-slate-gray'
                        >{stat.label}</p>
                    </div>))
                    }
                </div>
            </div>

            {/* image section or the right section the page */}
            <div className='relative flex-1
                    flex justify-center items-center
                        xl:min-h-screen
                        max-xl:py-40 bg-primary bg-hero bg-cover bg-center'>
                <img
                    src={bigShoeImage}
                    alt='shoe collection'
                    width={610}
                    height={500}
                    className='object-contain relative z-10'
                />

                <div
                    className='flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm"px-6'
                >
                    {shoes.map((shoes, index) => (
                        <div key={shoes}>
                            <ShoeCard
                                imgURL={shoes}
                                ChangeBigImage={(shoe) => setbigShoeImage(shoe)}
                                bigShoeImage={bigShoeImage}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default Hero;