"use client"

import { Sidebar } from '@/components/dashboard-ui/Sidebar'
import React, { useEffect, useState } from 'react'
import { SparklesText } from '@/components/magicui/sparkles-text'
import { Header } from '@/components/dashboard-ui/Header'

export default function page() {
    const [userid, setUserid] = useState('')

    useEffect(() => {
        setUserid(localStorage.getItem('user_id') || 'sloths')
    }, [])

    return (
        <div className='min-h-screen flex flex-col lg:flex-row text-white'>
            <Sidebar />
            <div className='flex flex-col pb-20 lg:pb-0 w-full'>
                <Header userid={userid} />
                <div className='flex flex-1 justify-center items-center'>
                    <span className='w-36'>
                        <img src='/logo.png' alt='logo' />
                    </span>
                    <SparklesText text="COMMING SOON" />
                </div>
            </div>
        </div>
    )
}
