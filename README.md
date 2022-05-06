# Welcome to my Reddit clone!
Visit my Reddit clone: https://unrivaled-moonbeam-066202.netlify.app

I got inspired to build a Reddit clone because I thought it would be great way to practice and expand my abilities as a full stack developer. I wanted to build something that I could put on my portfolio to demonstrate some of what I'm capable of regarding full stack development, RESTful APIs, authentication, and more.
## How to use this website
### Anyone visiting this site can perform the following actions regardless of being logged in or not
* Click on a post to view it in its entirety along with any comments
* Click on the close button at the top of a post to return to the previous page
* Click on a community name at the top left of a post to view all posts in that community
* Click on a user's name at the top of any post to view that user's profile page
### Creating an account
To create an account, click the sign up button at the top of the page. You can then enter an email(optional) username(required) and password(required). After clicking the sign up button, your account will be created and you will be logged in.
### Log in
To log in to an existing account, click the log in button at the top of the page. You can then enter your username and password to log into your account.
### Log out
When logged in, click the button in the top right corner of the page, then select the log out option.
### Creating a post
To create a post, click the home button at the top of the page to open a menu. From the menu, select the create post option. Type in a community(required) for this post to belong to, a title(required) and content(optional). Next, click the post button to submit your post. If the submitted community exists, your post will be added to the submitted community. If the submitted community doesn't exist, it will be created and your post will belong to it.
### Editing a post
To edit a post, log in and click on the post you want to edit. Just above the comment form is a button, click this button and click the edit post option. Next, edit the content and click the save button to update the post. You can only edit post text content, you can't edit the community or title.
### Deleting a post
To delete a post, log in and click on the post you want to delete. Click on the button just above the comment form and select the delete option.
### Submitting a comment
To submit a comment, log in and click on the post you want to comment on. Enter your comment in the form under the text "comment as username" and click the comment button.
### Editing a comment
To edit a comment, log in and find the comment you wish to edit. Click the button below your comment and select the edit option. Edit the content and click save to submit the edit.
### Deleting a comment
To delete a comment, log in and find the comment you wish to delete. Click the button below your comment and select the delete option.
## Technologies used
This website was built using React, Node, Express, Sequelize, Material UI, Luxon, Postgres, Sass, Heroku, and Netlify.
## Bugs
* Text opactiy styling is applied on all post items regardless of size
* Create a post form is visible to non logged in users but doesn't actually submit posts unless logged in
## Unfinished functionality
I'd like to implement a feature where when creating a post, you can search for the community you want to post to. Right now the community submission is just a text box so it's difficult to tell if you're submitting to the correct community. I'd like to add the ability to submit a post with images and videos. I'd also like to make the search bar work.