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

Honestly both seem like a lot of work. On one hand, I have to setup Firebase 
with authentication, and the end result is only like 1GB of storage space. On 
the other hand, I'll have to set up networking on Oracle Cloud, but I'll have 
20GB of space to mess with. Oracle's documentation isn't the greatest with
examples either - it's actually kinda hard for me to read because it's all tech
jargon specific to networking, something that I'm not as adept at. I'm 
half-certain that if I host everything via OCI, I'll be able to create an
internal network, protecting that, but even then that seems like so much work.

### User profiles
Something that'll be more useful to me in one of my upcoming projects is to 
create user profiles, and have a structure to view other profiles, and edit your
own profile. I think I'll end up setting this up first, though I will eventually
run into the same image upload problem I'm running into with product images. 
  
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