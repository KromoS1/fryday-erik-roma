import {Redirect} from "react-router-dom";
import {Login} from "../components/login/Login";
import {ProfileContainer} from "../components/profile/ProfileContainer";
import React from "react";
import {Error404} from "../components/error404/Error404";
import {PacksPageContainer} from "../components/packs/PacksPageContainer";
import {CardsContainer} from "../components/cards/Cards";
import {LearningPage} from "../components/learningPage/LearningPage";
import {NewPasswordComponent} from "../components/newPassword/NewPassword";
import {RecoveryPassword} from "../components/recoveryPassword/RecoveryPassword";
import {ChekEmail} from "../components/chekEmail/ChekEmail";
import {EditProfileContainer} from "../components/editProfile/EditProfileContainer";
import {Registration} from "../components/registration/Registration";

const commonRoutes = [
    {
        path: '/404',
        render: () => Error404,
        name: 'error',
        exact: false,
    },
    {
        render: () => <Redirect from={'*'} to={'/404'}/>,
        name: 'errorRoute',
        exact: false,
    },

]
export const unauthorizedRoutes = [
    {
        path: '/',
        render: () => <Redirect to={'/login'}/>,
        name: 'defaultLoginRedirectRoute',
        exact: true,
    },
    {
        path: '/packs',
        render: () => <Redirect to={'/login'}/>,
        name: 'PacksRedirectRoute',
        exact: false,
    },
    {
        path: '/profile',
        render: () => <Redirect to={'/login'}/>,
        name: 'ProfileRedirectRoute',
        exact: false,
    },
    {
        path: '/edit',
        render: () => <Redirect to={'/login'}/>,
        name: 'EditRedirectRoute',
        exact: false,
    },
    {
        path: '/login',
        render: () => <Login/>,
        name: 'LoginRoute',
        exact: false,
    },
    {
        path: '/registration',
        render:() => <Registration/>,
        name: 'RegistrationRoute',
        exact: false,
    },
    {
        path: '/set-new-password/:token?',
        render: () => <NewPasswordComponent/>,
        name: 'UpdatePasswordRoute',
        exact: false,
    },
    {
        path: '/recovery-password',
        render: () => <RecoveryPassword/>,
        name: 'RecoveryPasswordRoute',
        exact: false,
    },
    {
        path: '/chek-email',
        render: () => <ChekEmail/>,
        name: 'CheckEmailRoute',
        exact: false,
    },
    ...commonRoutes,
]

export const authorizedRoutes = [
    {
        path: '/login',
        render: () => <Redirect to={'/profile'}/>,
        name: 'redirectLoginRoute',
        exact: true,
    },
    {
        path: '/',
        render: () => <Redirect to={'/profile'}/>,
        name: 'defaultProfileRoute',
        exact: true,
    },
    {
        path: '/profile',
        render:() => <ProfileContainer/>,
        name: 'ProfileRoute',
        exact: false,
        routes: [
            {
                path: '/profile/cards/:pack_id',
                render:() => <CardsContainer/>,
            },
        ]
    },
    {
        path: '/packs',
        render:() => <PacksPageContainer/>,
        name: 'PackRoute',
        exact: false,
        routes: [
            {
                path: '/packs/cards/:pack_id',
                render:() => <CardsContainer/>,
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
        path: '/edit',
        render: () => <EditProfileContainer/>,
        name: 'EditProfile',
        exact: false,
    },
    ...commonRoutes,
]