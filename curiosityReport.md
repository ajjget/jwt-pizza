# Docker

## Introduction

At my internship this summer, our company used Docker for... something. In class, we also used Docker to send an "image" or something to AWS. Clearly I don't know much about Docker, and since it's a popular industry tool, I'd like to do a deep dive into better understanding it..

## Key Terms

- Dockerfile: contains a set of instructions to build a Docker image
- Image: a file that contains everything needed to set up and run an application, like the operating system, software dependencies, applicaiton code, and configurations
- Container: a runnable instance of an image. Shares the host machine's operating system, but keeps everything else separate.

## What is Docker?

At a high-level look, Docker is many platform as a service (PaaS) products that allow users to automate the process of building an app that is usable on many types of systems.

I asked ChatGPT, "explain Docker to me like I'm 14 years old and have some coding experience?" Chat gave me this example that I quite liked: "Docker is like a magical backpack you can carry around that has everything your project needs to run, exactly the same way, anywhere. It includes the program (your code), tools it depends on (like Python or Node.js), and settings/configurations."

What I gathered from that and other research I did on the Docker website is that Docker can be used to access (or spin up) new environments quickly, no matter what computer you're on. This makes it very convenient for teams who may all have different set-ups or, in the case of CS 329, for people trying to upload new website changes to AWS.

In other words, Docker uses containers to package and run applications in isolated environments, so that there is consistency and portability from computer to computer.

## How does Docker work?

1. Create a Dockerfile. This will automate setting up the app's environment, define what dependencies need to be installed, and allow others to build your same image. Thsi will basically be a blueprint to build your image.
2. Build a Docker image using the Dockerfile.
3. Run the image as a container.
4. Use the image or container somewhere else! You can upload it to Docker Hub (or somewhere else) and run it anywhere Docker is installed.

## Docker History

dotCloud Inc, the group that started Docker, launched in 2011 and was renamed to Docker Inc in 2013. It was also first presented to the public in 2013 and released as open-source. The following year, Docker services were announced for Windows, Fedora, Red Hat Enterprise Linux, Openshift, AWS' EC2, Stratoscale, and IBM. It continued growing in popularity throughout the years (its presence on LinkedIn profile metniosn grew by 160% in 2016!). In 2021, Docker Desktop was no longer free for businesses, although personal users can still use the service for free. Last year, Docker acquired AtomicJar to further its testing capabilities. 

In summary, Docker is actually a relatively new company (I suppose 13 years isn't "new", but it's definitely not old) that has had great success and growth. Today, they are focusing on expanding testing capabilities and furthering the usefullness of their application.

## Some interesting facts about Docker

- Docker uses a layered file system to build images. Layers are stacked on top of each other. This prevents duplicating data, because you don't have to save an entirely new image everytime. (It's similar to how GitHub Actions works)
- Docker containers can communicate with each other and the world through built-in networking features
- Docker is written in the Go programming language!
