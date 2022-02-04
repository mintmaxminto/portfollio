import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';


const BaseLayout = (props) => {
        const { children, className, isAuthenticated, user, isSiteOwner, cannonical } = props;
        const headerType = props.headerType || 'default';
        const title = props.title || 'Waqas Hassan Portfolio';
        return (
            <React.Fragment>
                <Head>
                    <meta http-equiv="x-ua-compatible" content="ie=edge" />
                    <title>{title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                    <meta name='description' content="My name is Waqas Hassan and I am an experienced software engineer and freelance developer. I have a Master's degree in Artificial Intelligence and several years of experience working on a wide range of technologies and projects from C++ development for ultrasound devices to modern mobile and web applications in React and Angular. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I invite you to take my course, where I have put a lot of effort to explain web and software engineering concepts in a detailed, hands-on and understandable way." />
                    <meta name='keywords' content="waqas portfolio, waqas, waqas hassan, waqas developer, waqas react, waqas mern stack, waqas node js, waqas freelancer, waqas javascript"/>
                    <meta property="og:title" content="Waqas Hassan - developer, programmer, freelancer"/>
                    <meta property="og:locale" content="en_PK"/>
                    <meta property="og:url" content={`${process.env.BASE_URL}`}/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:description" content="My name is Waqas Hassan and I am an experienced software engineer and freelance developer. I have a Master's degree in Artificial Intelligence and several years of experience working on a wide range of technologies and projects from C++ development for ultrasound devices to modern mobile and web applications in React and Angular. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I invite you to take my course, where I have put a lot of effort to explain web and software engineering concepts in a detailed, hands-on and understandable way."/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
                    {cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`}/>}
                    <link rel="icon" type='image/ico' href='/static/images/favicon.ico'/>                    
                </Head>
                <div className="layout-container" >
                    <Header className={`port-nav-${headerType}`} isSiteOwner={isSiteOwner} isAuthenticated={isAuthenticated} user={user}/>
                    <main className={`cover ${className}`}>
                        <div className="wrapper">
                            {children}
                        </div>
                    </main>
                </div>     
            </React.Fragment>     
        )
}

export default BaseLayout;