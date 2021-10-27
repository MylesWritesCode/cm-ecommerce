# Overview
The client is what will be served to the browser when a user visits the website.

# Notes
### Public image uploads
Using Oracle Cloud Object Storage has proven a little difficult to implement. I 
can get the images uploaded just fine, with a public URL, but anyone with the 
URL will be able to upload by just creating a POST request with some file.

This can prove problamatic for a production website, so I have a few things
to consider:

- Using Firebase with Firebase Authentication to upload images to a bucket. This
  seems like the easiest choice, with multiple writeups on their API and a
  fairly simple SDK that I can include in the project. Part of me doesn't want 
  to add *yet another* dependency though, so it's something I'll have to think
  about.
- Accepting images to the server, then uploading files from there. This could be
  useful, but I'll have to think about the extra work that the server is going
  to have to do. Essentially, we're going to take up double the image space - 
  even if just temporarily - and we'll definitely have to perform double the
  work (client file -> server -> storage, vs client file -> storage).
  
# ~Changelog?~ Roadmap?
**26 Oct 2021** I've been away from the project for a while, learning Rust
because of shiny object syndrome. I do need to finish this project so I can move
on to another one within the next month. As such, I think I'm just going to 
complete the following in the client:
  - Image uploads
  - Product view page
  - Home page
In addition, there are some things that will be useful for my next scheduled
project, that I'll work on within this application:
  - User profile page
    - edit
    - view