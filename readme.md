# Marvel Hero Generator! 
## Purpose 
The Marvel Hero Generator is a fun product that demonstrates the fun (and power) of chaining together multiple API calls as part of a "promise" chain in JavaScript. 

The app can be a fun way to generate an Avatar that is personalized to your image for various online services

# Technology 
## App Process Flow 
The Marvel Hero Generator leverages the following APIs/interfaces/functions: 
* The JavaScript built-in file API to access a file from the user's local system 
* A connection to Firebase Storage facility stores a copy of the user's image, and returns and stores a long-lived URL to use later
* The FacePlusPlus facial detection API to detect a face in an image, if present. Image is passed using the FormData object in POST request. FacePlusPlus only accepts JPEG formatted image files
* The FacePlusPlus facial detect API passes back an image token when a face is detected. The "analyze" API service from FacePlusPlus is then called based on this token. It returns a JSON object than includes a variety of demographic and facial analysis data points
* Data points are passed into an alogorithm to produce a unique ID given the input characteristics. The ID is a controlled range that will (potentially) be accepted by the Marvel API 
* The Marvel API is then called with that character ID, returning an object including a thumbnail image of the found Marvel Comic hero
## App technologies 
* File API 
* Firebase Storage Service 
* FacePlusPlus Detect & FacePlusPlus Face Analysis API 
* Marvel API 
* CSS for loader and styles 
* JavaScript to override default "File" input element type 
# Issues 
## Future Epics 
- Add social media sharing of the end result (FaceBook, Instagram) 
## Future Stories 
- Prevent the user from selecting a non-JPEG image file (fixed Nov 18 2018 on kmajor1.github.io fork 
- Give use option to see certain Facial Characteristics passed back from the FacePlusPlus API 
- Create fallback for when algorithm produces a character ID that does not exist on Marvel API 
- Create fallback for when Marvel does not supply a thumbnail image for the particular Marvel Character returned 
## Bugs 
- User has to refresh the page after a result is returned to reuse the app 
- The loader icon appears uncentered - need to center it on whole page 
- The alogorithm 
