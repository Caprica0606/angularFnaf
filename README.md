# How to run this project via Docker after machine restart"
* Open Docker Quickstart Terminal
* Type:
```
docker ps -a
```
* Find the container ID (only need the first 3 characters or so) for the container named angularFNaF, then type:
```
docker start <container_id>
```
* Navigate to http://192.168.99.100 in your browser


# How to run this project via Docker from scratch:

* Navigate to your project's folder (~ = C:\Users\capri). The folder containing docker projects is located at ~/Workspace/Docker/

```
docker run -dit --name angularFNaF -p 80:80 -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4
```
* Navigate to http://192.168.99.100 in your browser
g
