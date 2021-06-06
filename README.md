# EHI-Project-Assignment
Designed and implemented application for maintaining contact information. It has angular 12.0.3 and .Net core 3.1 project

Please follow below steps -

**I) Create databse in sql server**

 I have shared the database script.

**II) Guidelines for .Net core 3.1 project -**

To run the .net core project, follow the below steps-

1) Add your connection string in appsetting.json in .net core project
2) Run the .net core project
3) Test the project using swagger, use url - http://localhost:39993/swagger/index.html

Below is the .net core project structure-

![image](https://user-images.githubusercontent.com/58030402/120902201-8d9b7b00-c65c-11eb-85b7-11c3dfcbfd34.png)



**Guidelines for Angular 12.0.3 project -**

To run the Angular 12.0.3 project, follow the below steps-

1) run the cmd => npm install
2) run cmd => npm install @angular/cli@latest, also install the dependent package for application
3) Add .net core project port in contact-details.service file, update the apiUrl property in service file
4) run the project using command => ng serve -o --port 8200

Below is the project structure for angular 12.0.3 project

![image](https://user-images.githubusercontent.com/58030402/120902020-a192ad00-c65b-11eb-9499-311dc7b63140.png)


