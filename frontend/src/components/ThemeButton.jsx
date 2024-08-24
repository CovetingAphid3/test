import React from 'react'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { light, dark } from '../assets/index.js'


const ThemeButton = () => {
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }, [])

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

    }, [theme])

    const handleThemeSwitch = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="mr-20">
            <Button onClick={handleThemeSwitch}>
                {theme === 'light' ? <img src={light} alt="logo" className="w-5 h-5 object-contain" /> : <img src={dark} alt="logo" className="w-5 h-5 object-contain" />}
            </Button>
        </div>
    )
}

export default ThemeButton
