A simple blog app that users can create, edit and delete post and add comments on blogs. 

node.js 
express
mongodb 

note: 

when show images in post, cannot use 'uploads/..'
change the upload route to save images in public/images, then use images in show post.jade

to parse html, use !=post.body