import React from "react"

export const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
    <div className={`group relative flex items-center justify-center`} ref={ref} {...props}>
        {children}
    </div>
))
NavigationMenu.displayName = "NavigationMenu"

export const NavigationMenuList = React.forwardRef(({ className, children, ...props }, ref) => (
    <ul className={`flex space-x-2`} ref={ref} {...props}>
        {children}
    </ul>
))
NavigationMenuList.displayName = "NavigationMenuList"

export const NavigationMenuItem = React.forwardRef(({ className, children, ...props }, ref) => (
    <li ref={ref} {...props}>
        {children}
    </li>
))
NavigationMenuItem.displayName = "NavigationMenuItem"

export const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
    <button
        className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-white/10`}
        ref={ref}
        {...props}
    >
        {children}
    </button>
))
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

export const NavigationMenuContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        className="absolute top-0 left-0 w-full origin-top-center data-[motion=from-start]:animate-in data-[motion=to-end]:animate-out data-[motion=from-start]:fade-in data-[motion=from-start]:zoom-in-sm data-[motion=to-end]:fade-out data-[motion=to-end]:zoom-out-sm md:top-auto md:left-auto md:w-auto"
        ref={ref}
        {...props}
    >
        {children}
    </div>
))
NavigationMenuContent.displayName = "NavigationMenuContent"

export const NavigationMenuLink = React.forwardRef(({ className, children, ...props }, ref) => (
    <a
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        ref={ref}
        {...props}
    >
        {children}
    </a>
))
NavigationMenuLink.displayName = "NavigationMenuLink"

