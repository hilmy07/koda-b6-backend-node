import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Coffee Shop",
      version: "1.0.0",
      description: "Coffee Shop API documentation",
    },
    servers: [
      {
        url: "http://localhost:8888",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/**/*.js"], // lokasi anotasi
};

export const swaggerSpec = swaggerJSDoc(options);
