import React, { useEffect } from 'react'
import { Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { discord, github } from '../../actions/socialActions'
import { socialLogin } from '../../actions/userActions'

function SocialScreen() {

    const { socialParams } = useParams()

    const discordLogin = () => {
        const discordBaseURL = 'https://discord.com/api/oauth2'
        const clientID = process.env.REACT_APP_SOCIAL_AUTH_DISCORD_KEY
        const redirectURI = 'http://localhost:3000/login/discord'
        const getCodeURL = `${discordBaseURL}/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=email%20identify`

        window.location.assign(getCodeURL)
    }

    const githubLogin = () => {
        const githubBaseURL = 'https://github.com/login/oauth'
        const clientID = process.env.REACT_APP_SOCIAL_AUTH_GITHUB_KEY
        const redirectURI = 'http://localhost:3000/login/github'
        const getCodeURL = `${githubBaseURL}/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user`

        window.location.assign(getCodeURL)
    }

    const dispatch = useDispatch()
    
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    useEffect(() => {
        if(socialParams === 'discord'){
            dispatch(discord(code))
        }else if (socialParams === 'github'){
            dispatch(github(code))
        }
    }, [socialParams, dispatch, code])

    const {
        socialReducers: { social }
    } = useSelector((state) => state)

    useEffect(() => {
        if(social && social.access_token){
            dispatch(socialLogin(socialParams, social.access_token))
        }
    }, [dispatch, social, socialParams])

    return (
        <>
            <Row className='mx-2 justify-content-evenly'>
                <Button onClick={discordLogin} className='btn-primary social-button justify-content-center align-items-center d-flex shadow-sm'><i class="fa-brands fa-2xl fa-discord" /></Button>
                <Button onClick={githubLogin} className='btn-dark social-button justify-content-center align-items-center d-flex shadow-sm'><i class="fa-brands fa-github fa-2xl" /></Button>
                <Button className='btn-danger social-button justify-content-center align-items-center d-flex shadow-sm'><i class="fa-brands fa-google fa-2xl" /></Button>
                <Button className='btn-primary social-button justify-content-center align-items-center d-flex shadow-sm'><i class="fa-brands fa-facebook fa-2xl" /></Button>
            </Row>
        </>
    )
}

export default SocialScreen
