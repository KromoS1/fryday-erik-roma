import {Redirect} from "react-router-dom";
import {Login} from "../components/login/Login";
import {Registration} from "../components/registration/Registration";
import {ProfileContainer} from "../components/profile/ProfileContainer";
import {NewPasswordComponent} from "../components/newPassword/NewPassword";
import React from "react";
import {RecoveryPassword} from "../components/recoveryPassword/RecoveryPassword";
import {ChekEmail} from "../components/chekEmail/ChekEmail";
import {PacksPage} from "../components/packs/PacksPage";
import {Error404} from "../components/error404/Error404";

export type RoutesType = {
    path: string
    component: string
}
const commonRoutes = [
    {
        path: '/login',
        component: Login,
        name: 'LoginRoute',
        exact: false,
    },
    {
        path: '/404',
        component: Error404,
        name: 'error',
        exact: false,
    },
    {
        children: () => {
            return <Redirect from={'*'} to={'/404'}/>
        },
        name: 'errorRoute',
        exact: false,
    },
    {
        path: '/profile',
        component: ProfileContainer,
        name: 'ProfileRoute',
        exact: false,
    },

]
export const unauthorizedRoutes = [
    // {
    //     children: () => {
    //         return <Redirect from={'/'} to={'/login'}/>
    //     },
    //     name: 'login',
    //     exact: true,
    // },
    {
        path: '/',
        component: Login,
        name: 'LoginRoute',
        exact: true,
    },
    {
        path: '/registration',
        component: Registration,
        name: 'RegistrationRoute',
        exact: false,
    },
    {
        path: '/set-new-password/:token?',
        component: NewPasswordComponent,
        name: 'UpdatePasswordRoute',
        exact: false,
    },
    {
        path: '/recovery-password',
        component: RecoveryPassword,
        name: 'RecoveryPasswordRoute',
        exact: false,
    },
    {
        path: '/chek-email',
        component: ChekEmail,
        name: 'CheckEmailRoute',
        exact: false,
    },
]

export const authorizedRoutes = [
    // {
    //     path: '/',
    //     children: () => {
    //         return <Redirect to={'/profile'}/>
    //     },
    //     name: 'initialDefaultRoute',
    //     exact: true,
    // },
    {
        path: '/',
        component: ProfileContainer,
        name: 'ProfileRoute',
        exact: true,
    },
    {
        path: '/packs',
        component: PacksPage,
        name: 'PackRoute',
        exact: false,
    },
]