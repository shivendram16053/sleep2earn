"use client"

import React from 'react'
import { SparklesText } from '@/components/magicui/sparkles-text'
import Navbar from '@/components/Navbar'
import { Particles } from '@/components/magicui/particles'

export default function page() {


    return (
        <div className='min-h-screen flex flex-col   text-white'>
            <Particles
                className="absolute inset-0 z-0 w-full min-h-screen"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />

            <div className='pt-12 fixed w-full mx-auto'>
                <Navbar />
            </div>
            <div className='flex flex-col pb-20 lg:pb-0 w-full h-screen'>
                <div className='flex flex-1 justify-center h-full  items-center'>
                    <span className='w-36'>
                        <img src='/logo.png' alt='logo' />
                    </span>
                    <SparklesText text="COMMING SOON" />
                </div>
            </div>
        </div>
    )
}
