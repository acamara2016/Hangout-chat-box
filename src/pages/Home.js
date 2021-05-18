import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import GeoLocation from '../components/Geolocation'
import { MessageBox } from 'react-chat-elements'
import GPS from '../components/gps'

export default function Home(){
    return (
        <div>
            <Header/>
            <main style={{marginBottom:'100px'}}>
                {/* <GPS/> */}
                <Main/>
              

            </main>
            <footer>

            </footer>
        </div>
    );
}