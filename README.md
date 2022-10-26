# BloodAssist

## Instructions for Docker build

As we are having same root directory for both backend and frontend. We will have two seperate dockerfiles and build the image accordingly.

### To build backend image

``` 
sudo docker build -t image-name -f Dockerfile.Backend .
```

### TO build Frontend image

```
sudo docker build -t image-name -f Dockerfile.Frontend .
```
