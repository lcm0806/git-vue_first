const production = {
    PORT: 3000,
    DB: {
      host: "",
      user: "",
      database: "",
      password: "",
      port: "",
      connectionLimit: 20,
      connectTimeout: 5000,
    },
  };
  const development = {
    PORT: 4000,
    DB: {
      host: "",
      user: "",
      database: "",
      password: "",
      port: "",
      connectionLimit: 20,
      connectTimeout: 5000,
    },
    SECRET_KEY: "$2a$12$U3fh66EhjEts.vUTOREKIsqKYLdK",
  };
  
  module.exports = { production, development };