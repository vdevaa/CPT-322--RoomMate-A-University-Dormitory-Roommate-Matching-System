# Sprint 2 Report 
Video Link: 
## What's New (User Facing)
 * US-07 Send Messages to users
 * US-13 Swipe on potential Roomate
 * US-17 Functional Navbar
 * US-28 Homescreen
 
 * Bug 1 Fixed some bugs involving backend implementations for profile, messages, and matching storage
 * Bug 2 Fixed routing issues with all app buttons

## Work Summary (Developer Facing)
Through out this sprint we split up our features and tasks by front end tasks and back end tasks. For the front end tasks we completed and designed the NavBar component, ChatScreen, MessagesScreen, and HomeScreen. One barrier for some of these front end tasks was how the backend was setup at the time of development. Before the backend was implemented we instead stored mock conversations and profiles in objects (memory allocated in application). For the backend development we fixed match logic in the matchesController.js, created conversationa and message models, aswell as configuring a MongoDB to docker connection. One blocker or obstacle we had for the backend implmentation was configuriong a docker to MongoDB connection, and having it communicate properly. 

## Unfinished Work
In this sprint we only had one issue we did not get to fully implement in our application. This was issue #6 (Profile can be customized) Currently we do not have a customize profile section but we do have a placeholder for it in the nav bar. For next sprint we plan to crate this edit profile page and fully link it to our existing profile backend database.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/issues/13
 
 * https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/issues/7
 *   https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/issues/17
 * https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/issues/28
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/issues/6 This issue was not completed becase it was initally assigned to group memebers that have dropped/left the group.
 
## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
 * [Navbar.js](https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/blob/main/roommate-app/src/components/Navbar.js)
 * [ChatScreen.js](https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/blob/main/roommate-app/src/screens/ChatScreen.js)
 * [MessagesScreen.js](https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/blob/main/roommate-app/src/screens/MessagesScreen.js)
 * [roomate-backend](https://github.com/vdevaa/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System/tree/main/roommate-backend)
 
## Retrospective Summary
Here's what went well:
  * Spliting up the tasks between frontend and backend went well this sprint. It was nice to create open ended frontend compoents for the backend team to intergrate with thier skeleton code. 
  * This sprint we had more frequent communication in terms of messaging. We had less tasks left over this sprint than last sprint so that was an imporvement. 
 
Here's what we'd like to improve:
   * Figure out a better way to communciate personal struggles. We had 2 memebers this sprint randomly drop out of no where right before important deadlines. 
  
Here are changes we plan to implement in the next sprint:
   * We plan to implement more frequent meetings during the week to check in between frontend and back end teams. Also are creating a plan to solve the shortage of memebers in our group.
