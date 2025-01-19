## DumpErTon - simple REST file dump server
Allows anyone to dump and read files to and from the server, given a private authorization token.  
This project was made to test NestJS and is not intended for production use.  
The server is not secure and should not be used to store sensitive data.  

<br>

## Response format:
By default, the server will respond with a JSON object containing the following fields:
- `error`: A boolean indicating if an error occurred.
- `message`: A string containing the error or success message.

<br>

## Routes:
### POST `/file`
Creates a file on the server with the content of the request body.  
The authorization token must be passed in the `Authorization` header and will uniquely identify the file.  
The token will be hashed before the file is saved.

<br>

### GET `/file`
Reads a file from the server if it exists.  
The authorization token must be passed in the `Authorization` header.  
The file content will be returned in the response body.  

<br>

### DELETE `/file`
Deletes a file from the server if it exists.  
The authorization token must be passed in the `Authorization` header.  
