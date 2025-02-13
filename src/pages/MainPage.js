import React from 'react';
import Nav from '../components/Nav';
import { ReactComponent as ExampleSVG } from '../svg/section2.svg';
import TestiminiCard from '../components/Testiminicard';

function MainPage() {
    const testimonials = {
        test1: {
            name: ' Sarah J.',
            Image: require('../img/image 2.png'),
            work: '(SDE at Amazon)',
            test:'"I used to drown in a sea of sticky notes and to-do lists. We Remind has been a lifesaver! It s so easy to use, and I love how it keeps me organized and focused. I am actually getting more done now!"'
        },
        test2: {
            name: 'Ravi Chandra',
            Image: require('../img/image.png'),
            work: '(Business Analyst)',
            test:'"I was skeptical at first, but We Remind has completely changed how I approach my daily tasks. The analytics are especially helpful in identifying areas where I can improve my workflow."'
        },
        test3: {
            name: 'Radhika',
            Image: require('../img/image-1.png'),
            work: '(Senior Dev ai google)',
            test:'"As a busy mom of two, I needed a simple and effective way to manage my household and work tasks. We Remind is perfect! I can easily share lists with my husband, and the app sends me reminders so I never forget a thing."'
        }
    }
    return (
        <div className="MainPage">
            <Nav />
            <div className='Section1'>
                <div className='LandingTitle'>
                    <h1 className='O'>0</h1>
                    <h1 className='subLandingtitle'>rganize your world, ne task at a time.</h1>
                </div>
                <h2>The only task manager you'll ever need.</h2>
            </div>
            <div className='Section2'>
                <ExampleSVG />
            </div>
            <div className='Section3'>
                <h2 className='testimoni'>Testimonials</h2>
                <div className='test-container'>
                    {Object.values(testimonials).map((testimonial, index) => (
                        <TestiminiCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;