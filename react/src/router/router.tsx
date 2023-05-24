import React from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Load from '../components/Loader';

const lazy = (component: <T>() => Promise<{ default: React.ComponentType<T> }>) => {
    const LazyComponent = React.lazy(component);
    return (
        <React.Suspense fallback={<Load></Load>} >
            <LazyComponent></LazyComponent>
        </React.Suspense>
    )
}
const routes:RouteObject [] = [
    {
        path:"/",
        element:lazy(() => import('../views/IndexPage'))
    },
    {
        path:"/config",
        element:lazy(() => import('../views/ConfigPage'))
    },
    {
        path:"/game",
        element:lazy(() => import('../views/GamePage'))
    }
]

export default () => useRoutes(routes)