Build a React component (class) that shows the files & folders in disk in a hierarchy way

The app should have 
- 2 distinct classes: **Folder** & **File**
- each should implement a render function

Folder has a name, and list of children (Files & Folders)
File has a name & mime type

By default, all folders are collapsed,
User should be able to show/collapse a folder

The application should load fast on the browser and render only what is needed.

Consider the json in google drive as a sample data source.

---

Extra points:

 - Pass a list of path folders that should be expanded by default:
```
<MyBrowser expandedFolders={[‘/Path’, ‘/Path/1st’, ‘/Path/2nd’]} />
```

- Implement a find functionality, that searches for a filename (and only show matching files and the parent folders)

e.g. when searching for ‘hello’, a potential output could be
+ Folder A
   + Folder B
      + Folder C
            Hello_world.js
      hello_Im_in_B.js


As you can see folder B & C has matching filenames, but A doesn’t
But because Folder B is in A, it is visible in the result as well

There are other folders that are in the disk, but are not shown because they (and their descended folders) don’t have any matches
