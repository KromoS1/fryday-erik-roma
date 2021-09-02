import {Login} from "../components/login/Login";
import {Registration} from "../components/registration/Registration";
import {ProfileContainer} from "../components/profile/ProfileContainer";
import {NewPasswordComponent} from "../components/newPassword/NewPassword";
import React from "react";
import {RecoveryPassword} from "../components/recoveryPassword/RecoveryPassword";
import {ChekEmail} from "../components/chekEmail/ChekEmail";
import {PacksPage} from "../components/packs/PacksPage";
import {Redirect} from "react-router-dom";

export type RoutesType = {
    path: string
    component: string
}

export const unauthorizedRoutes = [
    {
        path: '/login',
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
]

export const authorizedRoutes = [
    {
        path: '/profile',
        component: ProfileContainer,
        name: 'ProfileRoute',
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
    {
        path: '/packs',
        component: PacksPage,
        name: 'PackRoute',
        exact: false,
    },
    // {
    //     path: '/',
    //     children: () => {
    //         return <Redirect to={'profile'}/>
    //     },
    //     name: 'PackRoute',
    //     exact: true,
    // },

]