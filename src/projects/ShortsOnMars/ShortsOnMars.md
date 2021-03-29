---
title: Shorts On Mars
coverImage: shortsonmars-mobile.png
skills: 
    - JS
    - React
    - CSS3
    - Fetch
link: "https://shortsonmars.netlify.app/"
gitLink: "https://github.com/nicolajnnielsen/ShortsOnMars"
hightlight: true
description: React App
images: [
    {
        img: shortsonmars-desktop.jpg,
        alt: 'Shorts On Mars - Mars Weather App',
        description: 'Weather info Desktop',
    },
    {
        img: shortsonmars-mobile.png,
        alt: 'Shorts On Mars - Mars Weather App',
        description: 'Weather info Mobile',
    },
    {
        img: shortsonmars-mobile-week.png,
        alt: 'Mobile version with week week view open',
        description: 'Week view of mobile version',
    },
    {
        img: shortsonmars-desktop-menu.png,
        alt: 'Shorts On Mars - Mars Weather App',
        description: Desktop version with modal and menu open',
    },
]
---

# Short On Mars

Shorts On Mars is a weather app displaying the weather conditions on Mars from the past 7 days. It’s using an API provided by NASA as part of their InSight Mission. The app is built using React, hooks and no third party libraries.

## Goals

My two primary goals in building this app were getting more practical experience with Hooks, especially useState and useEffect, and getting my introduction to working with API’s, fetching and displaying the relevant info. 

From a design standpoint I wanted to try and create something very clean and without much use of colors. I’ve been wanting to create something with the frosted glass effect using backdrop-filters for a while, especially as support is starting to increase, while also providing a fallback. Using awe-inspiring photos from Mars as background images provided a great opportunity for that.

## Challenges and learning opportunities

Considering I had little and no experience with Hooks and Fetch API respectively, it’s no surprise that those were the areas where I learned a lot.

Using the setState hook mostly came easy, it is not too different, so far, to the state object in classes, and I certainly saw the advantages in having separate self-contained pieces of state, though I am still getting the hang of what parts to bundle together, and when to separate.

useEffect on the other hand, had more of a learning curve. Dependencies, clean-up and when the hook would run, especially took some getting used to, but is quite intuitive once I had a better understanding of what’s happening. I’m still getting a better understanding of working with Hooks, and I’m looking forward to learning more about other ones, like useMem, but I’ve quickly seen the advantages of functional components.

As mentioned, a big part of making this app was learning the basics of working with an API in React and how to handle the process of fetching data. I used the Fetch API because I generally prefer learning native solutions before library ones, like Axios, to get a better understanding of the basics.

To guide me, I used a tutorial specific to the Mars weather API in vanilla and more general fetch and React tutorials. In the case of Mars specific one, the fetched data was immediately put in a new object with only the relevant pieces of data, as the API contained a lot of data that is not needed. I followed the same process, but it did cause some challenges, related to when the API data is updated, and some data would be missing. This situation would now need to be handled during the retrieval of data instead of potentially handling it at the render. I initially did this by checking the data with a ternary operator when mapping the new object. Later when implementing proper error handling, I changed it to a try catch, to better communicate what’s happening to the user.

Another interesting discovery was the need to both catch errors, for example from a network issue, and checking if the response is ok. Which differs from my previous work with something like AJAX in jQuery.

Late in the project I got the idea to include a modal with information about the project and NASA’s mission. Due to the limited use of the modal and my wish to keep module use to a minimum, I created one myself. Obviously it is not the hardest thing, but it did provide valuable knowledge about handling entry animations when mounting components, or rather to have an empty React component and then to conditionally render the contents when needed.