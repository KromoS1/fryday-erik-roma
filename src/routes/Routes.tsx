import {Redirect} from "react-router-dom";
import {Login} from "../components/login/Login";
import {Registration} from "../components/registration/Registration";
import {ProfileContainer} from "../components/profile/ProfileContainer";
import {NewPasswordComponent} from "../components/newPassword/NewPassword";
import React from "react";
import {RecoveryPassword} from "../components/recoveryPassword/RecoveryPassword";
import {ChekEmail} from "../components/chekEmail/ChekEmail";
import {Error404} from "../components/error404/Error404";
import {PacksPageContainer} from "../components/packs/PacksPageContainer";
import {CardsContainer} from "../components/cards/Cards";
import {LearningPage} from "../components/learningPage/LearningPage";
import {EditProfileContainer} from "../components/editProfile/EditProfileContainer";

const commonRoutes = [
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

]
export const unauthorizedRoutes = [
    {
        path: '/',
        render:() => {
            return <Redirect to={'/login'}/>
        },
        name: 'defaultLoginRedirectRoute',
        exact: true,
    },
    {
        path: '/packs',
        render:() => {
            return <Redirect to={'/login'}/>
        },
        name: 'PacksRedirectRoute',
        exact: false,
    },
    {
        path: '/profile',
        render:() => {
            return <Redirect to={'/login'}/>
        },
        name: 'ProfileRedirectRoute',
        exact: false,
    },
    {
        path: '/edit',
        render:() => {
            return <Redirect to={'/login'}/>
        },
        name: 'EditRedirectRoute',
        exact: false,
    },
    {
        path: '/login',
        component: Login,
        name: 'LoginRoute',
        exact: false,
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
    ...commonRoutes,
]

export const authorizedRoutes = [
    {
        path:'/login',
        render:() => {
            return <Redirect to={'/profile'}/>
        },
        name: 'redirectLoginRoute',
        exact: true,
    },
    {
        path:'/',
        render:() => {
            return <Redirect to={'/profile'}/>
        },
        name: 'defaultProfileRoute',
        exact: true,
    },
    {
        path: '/profile',
        component: ProfileContainer,
        name: 'ProfileRoute',
        exact: false,
        routes: [
            {
                path: '/profile/cards/:pack_id',
                component: CardsContainer
            },
        ]
    },
    {
        path: '/packs',
        component: PacksPageContainer,
        name: 'PackRoute',
        exact: false,
        routes: [
            {
                path: '/packs/cards/:pack_id',
                component: CardsContainer
            }
        ]
    },
    {
        path: '/learn/:pack_id',
        component: LearningPage,
        name: 'LearnRoute',
        exact: false,
    },
    {
        path:'/edit',
        component: EditProfileContainer,
        name:'EditProfile',
        exact: false,
    },
    ...commonRoutes,
]