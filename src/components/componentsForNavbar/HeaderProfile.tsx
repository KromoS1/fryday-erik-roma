import React, {FC, memo} from 'react'
import {NavLink} from 'react-router-dom';
import style from "../profile/Profile.module.scss";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {ProfileType} from "../profile/ProfileContainer";
import avatarName from '../../resources/images/avatarNote.png'

export const HeaderProfile: FC = memo(() => {
    const profile = useSelector<AppRootStateType, ProfileType>(state => state.profile);
    return (
        <>
            <div className={style.avatarProfile}>
                {profile.avatar === ''
                    ? <div className={style.boxAvatar}>
                        <img src={avatarName} alt="" className={style.avatar}/>
                    </div>
                    : <div className={style.boxAvatar}>
                        <img src={profile.avatar} alt="" className={style.avatar}/>
                    </div>
                }
            </div>
            <span className={style.name}>{profile.name}</span>
            <div className={style.status}>Front-end developer</div>
            <div className={style.button}>
                <NavLink to={'/edit'} className={style.btnEdit}>Edit profile</NavLink>
            </div>
        </>
    )
})