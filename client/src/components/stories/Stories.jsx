import React from 'react'
import "./stories.scss"

const storiesArray = [
    {
        id:1,
        name:"Add Story ",
        img:"https://ik.imagekit.io/ksaehdhru/WhatsApp_Image_2022-09-13_at_8.44.26_PM_HZpytV1wB.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1663082140730"
    },
    {
        id:2,
        name:"Sid",
        img:"https://ik.imagekit.io/ksaehdhru/262158460_4859072780823822_7042938704953495798_n_N2ZFNza9K.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668793172003"
    },
    {
        id:3,
        name:"Yatin",
        img:"https://ik.imagekit.io/ksaehdhru/309594439_632476871577852_2681738414495284883_n_Tp7Vhbw-q.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668793257914"
    },
    {
        id:4,
        name:"Gauarv",
        img:"https://ik.imagekit.io/ksaehdhru/275012567_927907511225301_8989356567048776969_n_4DssfGJKz.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668793374726"
    },

    
]

function Stories() {
  return (
    <div className='stories'>
        {
            storiesArray.map(story=>(
                <div className="story" key={story.id}>
                    <img src={story.img} alt={story.name} />
                    <span>{story.name}</span>
                </div>
            ))
        }
    </div>
  )
}

export default Stories